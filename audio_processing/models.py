"""Pydantic models for structured audio analysis output."""

from pydantic import BaseModel, Field
from typing import List


class AudioAnalysisResult(BaseModel):
    """Validated output model for real estate audio analysis.

    Fields:
        property_condition: Overall property condition rating.
        price_mentions: Numeric price values mentioned in the audio.
        key_defects: List of property defects or issues identified.
        negotiation_points: Summary of negotiation-relevant topics.
    """

    property_condition: str = Field(
        default="Unknown",
        description="Overall property condition: Good, Fair, or Poor",
    )
    price_mentions: List[float] = Field(
        default_factory=list,
        description="Numeric price values mentioned in the audio",
    )
    key_defects: List[str] = Field(
        default_factory=list,
        description="List of property defects or issues identified",
    )
    negotiation_points: str = Field(
        default="",
        description="Summary of negotiation-relevant topics discussed",
    )
