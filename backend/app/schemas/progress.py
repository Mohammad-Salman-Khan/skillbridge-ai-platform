from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class ProgressEntry(BaseModel):
    month_name: str
    completed: bool
    completed_at: Optional[datetime] = None


class ProgressUpdateRequest(BaseModel):
    roadmap_id: str
    month_name: str
    completed: bool


class ProgressUpdateResponse(BaseModel):
    id: str
    user_id: str
    roadmap_id: str
    month_name: str
    completed: bool
    completed_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime


class ProgressListResponse(BaseModel):
    entries: list[ProgressEntry]
    total_months: int
    completed_months: int
    percentage: int
