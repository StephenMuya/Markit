"""Unit tests for MarkitAudioProcessor."""

import json
import os
import tempfile
from unittest.mock import MagicMock, patch, mock_open

import pytest

from audio_processing.models import AudioAnalysisResult
from audio_processing.processor import MarkitAudioProcessor, SUPPORTED_FORMATS


# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------

@pytest.fixture
def processor():
    """Create a MarkitAudioProcessor with a dummy API key."""
    with patch.dict(os.environ, {"OPENAI_API_KEY": ""}, clear=False):
        return MarkitAudioProcessor(api_key="test-key-123")


@pytest.fixture
def sample_llm_response():
    """Sample LLM JSON response for entity extraction."""
    return {
        "property_condition": "Fair",
        "price_mentions": [450000, 425000.50],
        "key_defects": ["roof leak", "cracked foundation"],
        "negotiation_points": "Seller willing to credit $10k for roof repair.",
    }


# ---------------------------------------------------------------------------
# Initialization tests
# ---------------------------------------------------------------------------

class TestInitialization:
    def test_init_with_explicit_key(self):
        proc = MarkitAudioProcessor(api_key="explicit-key")
        assert proc._whisper_model == "whisper-1"
        assert proc._extraction_model == "gpt-4o"

    def test_init_with_env_key(self):
        with patch.dict(os.environ, {"OPENAI_API_KEY": "env-key"}):
            proc = MarkitAudioProcessor()
            assert proc._client is not None

    def test_init_missing_key_raises(self):
        with patch.dict(os.environ, {"OPENAI_API_KEY": ""}, clear=False):
            with pytest.raises(ValueError, match="OpenAI API key is required"):
                MarkitAudioProcessor(api_key=None)

    def test_init_custom_models(self):
        proc = MarkitAudioProcessor(
            api_key="key", whisper_model="whisper-2", extraction_model="gpt-5"
        )
        assert proc._whisper_model == "whisper-2"
        assert proc._extraction_model == "gpt-5"


# ---------------------------------------------------------------------------
# Transcription tests
# ---------------------------------------------------------------------------

class TestTranscribe:
    def test_file_not_found(self, processor):
        with pytest.raises(FileNotFoundError, match="Audio file not found"):
            processor.transcribe("/nonexistent/audio.wav")

    def test_unsupported_format(self, processor):
        with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as f:
            f.write(b"fake audio data")
            f.flush()
            try:
                with pytest.raises(ValueError, match="Unsupported audio format"):
                    processor.transcribe(f.name)
            finally:
                os.unlink(f.name)

    def test_empty_file(self, processor):
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
            # write nothing — file is 0 bytes
            try:
                with pytest.raises(ValueError, match="Audio file is empty"):
                    processor.transcribe(f.name)
            finally:
                os.unlink(f.name)

    def test_successful_transcription(self, processor):
        mock_response = MagicMock()
        mock_response.text = "The roof has a small leak near the chimney."

        processor._client.audio.transcriptions.create = MagicMock(
            return_value=mock_response
        )

        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
            f.write(b"fake audio bytes")
            f.flush()
            try:
                result = processor.transcribe(f.name)
                assert result == "The roof has a small leak near the chimney."
                processor._client.audio.transcriptions.create.assert_called_once()
            finally:
                os.unlink(f.name)

    def test_m4a_format_accepted(self, processor):
        mock_response = MagicMock()
        mock_response.text = "Price is around 450 thousand."

        processor._client.audio.transcriptions.create = MagicMock(
            return_value=mock_response
        )

        with tempfile.NamedTemporaryFile(suffix=".m4a", delete=False) as f:
            f.write(b"fake audio bytes")
            f.flush()
            try:
                result = processor.transcribe(f.name)
                assert "450" in result
            finally:
                os.unlink(f.name)

    def test_transcription_api_error(self, processor):
        processor._client.audio.transcriptions.create = MagicMock(
            side_effect=Exception("API connection error")
        )

        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
            f.write(b"fake audio bytes")
            f.flush()
            try:
                with pytest.raises(RuntimeError, match="Transcription failed"):
                    processor.transcribe(f.name)
            finally:
                os.unlink(f.name)

    def test_empty_transcription_result(self, processor):
        mock_response = MagicMock()
        mock_response.text = "   "

        processor._client.audio.transcriptions.create = MagicMock(
            return_value=mock_response
        )

        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
            f.write(b"fake audio bytes")
            f.flush()
            try:
                with pytest.raises(ValueError, match="empty result"):
                    processor.transcribe(f.name)
            finally:
                os.unlink(f.name)


# ---------------------------------------------------------------------------
# Entity extraction tests
# ---------------------------------------------------------------------------

class TestExtractEntities:
    def test_empty_transcript_raises(self, processor):
        with pytest.raises(ValueError, match="cannot be empty"):
            processor.extract_entities("")

    def test_whitespace_transcript_raises(self, processor):
        with pytest.raises(ValueError, match="cannot be empty"):
            processor.extract_entities("   ")

    def test_successful_extraction(self, processor, sample_llm_response):
        mock_message = MagicMock()
        mock_message.content = json.dumps(sample_llm_response)

        mock_choice = MagicMock()
        mock_choice.message = mock_message

        mock_response = MagicMock()
        mock_response.choices = [mock_choice]

        processor._client.chat.completions.create = MagicMock(
            return_value=mock_response
        )

        result = processor.extract_entities("The roof leaks and price is 450k.")

        assert isinstance(result, AudioAnalysisResult)
        assert result.property_condition == "Fair"
        assert 450000 in result.price_mentions
        assert "roof leak" in result.key_defects
        assert "roof repair" in result.negotiation_points

    def test_extraction_api_error(self, processor):
        processor._client.chat.completions.create = MagicMock(
            side_effect=Exception("LLM service unavailable")
        )

        with pytest.raises(RuntimeError, match="Entity extraction failed"):
            processor.extract_entities("Some transcript text.")

    def test_extraction_invalid_json(self, processor):
        mock_message = MagicMock()
        mock_message.content = "not valid json {{"

        mock_choice = MagicMock()
        mock_choice.message = mock_message

        mock_response = MagicMock()
        mock_response.choices = [mock_choice]

        processor._client.chat.completions.create = MagicMock(
            return_value=mock_response
        )

        with pytest.raises(RuntimeError, match="Failed to parse"):
            processor.extract_entities("Some transcript text.")


# ---------------------------------------------------------------------------
# Full pipeline tests
# ---------------------------------------------------------------------------

class TestProcess:
    def test_full_pipeline(self, processor, sample_llm_response):
        # Mock transcription
        mock_transcription = MagicMock()
        mock_transcription.text = "The property is in fair condition with a leaky roof."

        processor._client.audio.transcriptions.create = MagicMock(
            return_value=mock_transcription
        )

        # Mock extraction
        mock_message = MagicMock()
        mock_message.content = json.dumps(sample_llm_response)

        mock_choice = MagicMock()
        mock_choice.message = mock_message

        mock_extraction = MagicMock()
        mock_extraction.choices = [mock_choice]

        processor._client.chat.completions.create = MagicMock(
            return_value=mock_extraction
        )

        with tempfile.NamedTemporaryFile(suffix=".m4a", delete=False) as f:
            f.write(b"fake audio bytes")
            f.flush()
            try:
                result = processor.process(f.name)
                assert isinstance(result, AudioAnalysisResult)
                assert result.property_condition == "Fair"
                assert len(result.price_mentions) == 2
                assert len(result.key_defects) == 2
            finally:
                os.unlink(f.name)


# ---------------------------------------------------------------------------
# Pydantic model tests
# ---------------------------------------------------------------------------

class TestAudioAnalysisResult:
    def test_defaults(self):
        result = AudioAnalysisResult()
        assert result.property_condition == "Unknown"
        assert result.price_mentions == []
        assert result.key_defects == []
        assert result.negotiation_points == ""

    def test_full_construction(self):
        result = AudioAnalysisResult(
            property_condition="Good",
            price_mentions=[500000, 475000],
            key_defects=["minor paint chips"],
            negotiation_points="Buyer requests closing cost credit.",
        )
        assert result.property_condition == "Good"
        assert len(result.price_mentions) == 2

    def test_json_serialization(self):
        result = AudioAnalysisResult(
            property_condition="Poor",
            price_mentions=[100000],
            key_defects=["structural damage"],
            negotiation_points="Major repairs needed.",
        )
        data = result.model_dump()
        assert isinstance(data, dict)
        assert data["property_condition"] == "Poor"

    def test_json_round_trip(self):
        original = AudioAnalysisResult(
            property_condition="Fair",
            price_mentions=[250000.50],
            key_defects=["old HVAC"],
            negotiation_points="HVAC replacement cost negotiation.",
        )
        json_str = original.model_dump_json()
        restored = AudioAnalysisResult.model_validate_json(json_str)
        assert original == restored


# ---------------------------------------------------------------------------
# Supported formats constant test
# ---------------------------------------------------------------------------

class TestSupportedFormats:
    def test_supported_formats_contains_m4a_and_wav(self):
        assert ".m4a" in SUPPORTED_FORMATS
        assert ".wav" in SUPPORTED_FORMATS
