"""Enterprise-grade audio processing service for Markit.

Handles the full lifecycle of a voice note: from receiving a raw audio file
to outputting structured JSON data with property analysis insights.
"""

import json
import logging
import os
from pathlib import Path

from dotenv import load_dotenv
from openai import OpenAI

from .models import AudioAnalysisResult

load_dotenv()

logger = logging.getLogger(__name__)

SUPPORTED_FORMATS = {".m4a", ".wav"}

EXTRACTION_PROMPT = """You are a real estate data extraction assistant.
Analyze the following transcript from a property meeting or house tour recording.
Extract the following fields and return ONLY valid JSON:

{
  "property_condition": "Good" | "Fair" | "Poor",
  "price_mentions": [list of numeric price values mentioned, as floats],
  "key_defects": ["list of property defects or issues mentioned"],
  "negotiation_points": "brief summary of negotiation-relevant topics"
}

Rules:
- property_condition must be exactly one of: "Good", "Fair", or "Poor". \
If unclear, use "Unknown".
- price_mentions should contain only numeric values (e.g. 450000, 1200.50). \
Return an empty list if none found.
- key_defects should list specific issues (e.g. "roof leak", "cracked foundation"). \
Return an empty list if none found.
- negotiation_points should summarize any bargaining topics, concessions, or \
counteroffers discussed. Return an empty string if none found.
- Return ONLY the JSON object, no additional text.

Transcript:
"""


class MarkitAudioProcessor:
    """Enterprise audio processor for real estate voice notes.

    Handles transcription via OpenAI Whisper API and entity extraction
    via GPT-4o to produce structured property analysis data.

    Args:
        api_key: OpenAI API key. Falls back to OPENAI_API_KEY env var.
        whisper_model: Whisper model name for transcription.
        extraction_model: LLM model name for entity extraction.
    """

    def __init__(
        self,
        api_key: str = None,
        whisper_model: str = "whisper-1",
        extraction_model: str = "gpt-4o",
    ):
        resolved_key = api_key or os.getenv("OPENAI_API_KEY")
        if not resolved_key:
            raise ValueError(
                "OpenAI API key is required. Provide via 'api_key' parameter "
                "or set the OPENAI_API_KEY environment variable."
            )
        self._client = OpenAI(api_key=resolved_key)
        self._whisper_model = whisper_model
        self._extraction_model = extraction_model
        logger.info(
            "MarkitAudioProcessor initialized (whisper=%s, extraction=%s)",
            whisper_model,
            extraction_model,
        )

    def transcribe(self, file_path: str) -> str:
        """Transcribe an audio file to text using OpenAI Whisper API.

        Args:
            file_path: Path to the audio file (.m4a or .wav).

        Returns:
            The transcribed text.

        Raises:
            FileNotFoundError: If the file does not exist.
            ValueError: If the file format is unsupported or the file is empty.
            RuntimeError: If transcription fails.
        """
        path = Path(file_path)

        if not path.exists():
            raise FileNotFoundError(f"Audio file not found: {file_path}")

        if path.suffix.lower() not in SUPPORTED_FORMATS:
            raise ValueError(
                f"Unsupported audio format '{path.suffix}'. "
                f"Supported formats: {', '.join(sorted(SUPPORTED_FORMATS))}"
            )

        if path.stat().st_size == 0:
            raise ValueError(f"Audio file is empty: {file_path}")

        logger.info("Starting transcription for: %s", path.name)

        try:
            with open(path, "rb") as audio_file:
                response = self._client.audio.transcriptions.create(
                    model=self._whisper_model,
                    file=audio_file,
                )
        except Exception as e:
            logger.error("Transcription failed for %s: %s", path.name, e)
            raise RuntimeError(
                f"Transcription failed for '{path.name}': {e}"
            ) from e

        transcript = response.text.strip()
        if not transcript:
            raise ValueError(
                f"Transcription returned empty result for: {path.name}"
            )

        logger.info(
            "Transcription complete for %s (%d characters)",
            path.name,
            len(transcript),
        )
        return transcript

    def extract_entities(self, transcript: str) -> AudioAnalysisResult:
        """Extract structured real estate entities from a transcript.

        Args:
            transcript: Raw transcript text to analyze.

        Returns:
            An AudioAnalysisResult with extracted fields.

        Raises:
            ValueError: If the transcript is empty.
            RuntimeError: If the LLM call or parsing fails.
        """
        if not transcript or not transcript.strip():
            raise ValueError("Transcript text cannot be empty.")

        logger.info(
            "Extracting entities from transcript (%d characters)",
            len(transcript),
        )

        try:
            response = self._client.chat.completions.create(
                model=self._extraction_model,
                messages=[
                    {
                        "role": "system",
                        "content": "You extract structured data from real "
                        "estate transcripts. Respond with JSON only.",
                    },
                    {
                        "role": "user",
                        "content": EXTRACTION_PROMPT + transcript,
                    },
                ],
                response_format={"type": "json_object"},
                temperature=0.1,
            )
        except Exception as e:
            logger.error("Entity extraction LLM call failed: %s", e)
            raise RuntimeError(
                f"Entity extraction failed: {e}"
            ) from e

        raw_content = response.choices[0].message.content
        logger.debug("Raw LLM response: %s", raw_content)

        try:
            data = json.loads(raw_content)
        except json.JSONDecodeError as e:
            logger.error("Failed to parse LLM JSON response: %s", e)
            raise RuntimeError(
                f"Failed to parse entity extraction response: {e}"
            ) from e

        try:
            result = AudioAnalysisResult(**data)
        except Exception as e:
            logger.error("Pydantic validation failed: %s", e)
            raise RuntimeError(
                f"Entity extraction output validation failed: {e}"
            ) from e

        logger.info(
            "Entity extraction complete: condition=%s, prices=%d, defects=%d",
            result.property_condition,
            len(result.price_mentions),
            len(result.key_defects),
        )
        return result

    def process(self, file_path: str) -> AudioAnalysisResult:
        """Full pipeline: transcribe audio then extract structured entities.

        Args:
            file_path: Path to the audio file (.m4a or .wav).

        Returns:
            An AudioAnalysisResult with all extracted fields.
        """
        logger.info("Starting full audio processing pipeline for: %s", file_path)
        transcript = self.transcribe(file_path)
        result = self.extract_entities(transcript)
        logger.info("Pipeline complete for: %s", file_path)
        return result
