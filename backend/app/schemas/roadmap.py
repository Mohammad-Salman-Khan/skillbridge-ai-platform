from datetime import datetime
from typing import Any, Optional

from pydantic import BaseModel


class RoadmapRequest(BaseModel):
    career_goal: str
    current_skills: list[str]
    time_commitment: Optional[str] = "16 hours/week"


class MilestoneResponse(BaseModel):
    title: str
    description: str
    duration: str
    resources: list[str]


class RoadmapResponse(BaseModel):
    id: str
    title: str
    milestones: list[MilestoneResponse]


class GenerateRoadmapRequest(BaseModel):
    name: str
    degree: str
    year: str
    skills: list[str]
    careerGoal: str


class GenerateRoadmapResponse(BaseModel):
    career_summary: str
    skill_gap: list[str]
    six_month_roadmap: dict[str, Any]
    recommended_projects: list[str]
    interview_preparation_tips: list[str]


class RoadmapSaveRequest(BaseModel):
    career_summary: str
    skill_gap: list[str]
    six_month_roadmap: dict[str, Any]
    recommended_projects: list[str]
    interview_preparation_tips: list[str]


class RoadmapMeResponse(BaseModel):
    id: str
    user_id: str
    career_summary: str
    skill_gap: list[str]
    six_month_roadmap: dict[str, Any]
    recommended_projects: list[str]
    interview_preparation_tips: list[str]
    created_at: datetime
    updated_at: datetime
