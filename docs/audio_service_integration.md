# Audio Processing Service - Integration Guide

## Overview

The `MarkitAudioProcessor` is a Python service that handles the full lifecycle of a
voice note: from receiving a raw audio file (`.m4a` or `.wav`) to outputting structured
JSON data with real-estate property insights.

## Architecture

```
┌──────────────┐    HTTP/REST     ┌─────────────────────┐
│  Spring Boot │ ───────────────> │  Python Audio        │
│  Backend     │                  │  Processing Service  │
│  (Java)      │ <─────────────── │  (MarkitAudioProcessor) │
└──────────────┘    JSON Response └─────────────────────┘
                                        │
                                        ├── OpenAI Whisper API (transcription)
                                        └── OpenAI GPT-4o API (entity extraction)
```

## Python Service Usage

### Direct Python Usage

```python
from audio_processing import MarkitAudioProcessor

processor = MarkitAudioProcessor(api_key="sk-...")

# Full pipeline: transcribe + extract entities
result = processor.process("meeting_recording.m4a")

print(result.model_dump_json(indent=2))
# {
#   "property_condition": "Fair",
#   "price_mentions": [450000, 425000],
#   "key_defects": ["roof leak", "outdated HVAC"],
#   "negotiation_points": "Seller willing to credit $10k for roof repair."
# }
```

### Individual Steps

```python
# Step 1: Transcribe only
transcript = processor.transcribe("tour_notes.wav")

# Step 2: Extract entities from any transcript text
result = processor.extract_entities(transcript)
```

## Exposing as a REST Service

To allow the Spring Boot backend to call the processor, wrap it in a lightweight
HTTP server (e.g., Flask or FastAPI):

### FastAPI Example

```python
# audio_service_api.py
import os
import tempfile
from fastapi import FastAPI, UploadFile, HTTPException
from audio_processing import MarkitAudioProcessor

app = FastAPI()
processor = MarkitAudioProcessor()

@app.post("/api/audio/process")
async def process_audio(file: UploadFile):
    if not file.filename.endswith((".m4a", ".wav")):
        raise HTTPException(400, "Unsupported format. Use .m4a or .wav")

    with tempfile.NamedTemporaryFile(
        suffix=os.path.splitext(file.filename)[1], delete=False
    ) as tmp:
        tmp.write(await file.read())
        tmp.flush()
        try:
            result = processor.process(tmp.name)
            return result.model_dump()
        finally:
            os.unlink(tmp.name)
```

Run with: `uvicorn audio_service_api:app --host 0.0.0.0 --port 8001`

## Java Spring Boot Integration

The Java backend should call the Python audio service over HTTP. Below is the
recommended approach using Spring's `RestTemplate` or `WebClient`.

### 1. Add Configuration

In `application.properties`:

```properties
# Audio Processing Service
audio.service.url=http://localhost:8001
audio.service.timeout=120000
```

### 2. Create a Service Class

```java
package com.notionflow.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.util.Map;

@Service
public class AudioProcessingService {

    @Value("${audio.service.url}")
    private String audioServiceUrl;

    private final RestTemplate restTemplate;

    public AudioProcessingService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /**
     * Sends an audio file to the Python processing service and returns
     * the structured analysis result.
     *
     * @param audioFile the .m4a or .wav file to process
     * @return parsed JSON response as a Map
     */
    public Map<String, Object> processAudioFile(File audioFile) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new FileSystemResource(audioFile));

        HttpEntity<MultiValueMap<String, Object>> request =
                new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                audioServiceUrl + "/api/audio/process",
                HttpMethod.POST,
                request,
                Map.class
        );

        return response.getBody();
    }
}
```

### 3. Security Best Practices

| Concern | Recommendation |
|---------|---------------|
| **API Key Protection** | Store `OPENAI_API_KEY` only on the Python service host. The Java backend never handles this key. |
| **Network Isolation** | Run both services on the same Docker network. Do not expose the Python service port externally. |
| **Authentication** | Add a shared secret or JWT between Java and Python services for internal auth. |
| **File Validation** | Validate file type and size on the Java side before forwarding. |
| **TLS** | Use HTTPS in production for the inter-service communication. |
| **Rate Limiting** | Implement rate limiting on the Python service to prevent abuse. |

### 4. Docker Compose Addition

Add the audio service to `docker-compose.yml`:

```yaml
  audio-service:
    build:
      context: .
      dockerfile: Dockerfile.audio
    container_name: notionflow-audio
    environment:
      OPENAI_API_KEY: ${OPENAI_API_KEY}
    ports:
      - "8001:8001"
    restart: unless-stopped
```

## Output Schema

The service always returns a validated JSON object:

```json
{
  "property_condition": "Good | Fair | Poor | Unknown",
  "price_mentions": [450000, 425000.50],
  "key_defects": ["roof leak", "cracked foundation"],
  "negotiation_points": "Summary of negotiation-relevant topics."
}
```

All fields have safe defaults (empty lists/strings, "Unknown" condition) so
downstream consumers never receive null values.
