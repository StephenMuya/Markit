from __future__ import annotations

import os
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BASE_DIR / ".env")


def _split_origins(value: str | None) -> list[str]:
    if not value:
        return ["http://localhost:5173"]

    return [origin.strip() for origin in value.split(",") if origin.strip()]


@dataclass(frozen=True)
class Settings:
    app_name: str
    api_prefix: str
    cors_origins: list[str]


@lru_cache
def get_settings() -> Settings:
    return Settings(
        app_name=os.getenv("APP_NAME", "Markit API"),
        api_prefix=os.getenv("API_PREFIX", "/api"),
        cors_origins=_split_origins(os.getenv("FRONTEND_ORIGINS")),
    )
