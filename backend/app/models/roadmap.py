import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from app.database import Base


class Roadmap(Base):
    __tablename__ = "roadmaps"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    career_summary = Column(Text, nullable=False)
    skill_gap = Column(Text, nullable=False)
    six_month_roadmap = Column(Text, nullable=False)
    recommended_projects = Column(Text, nullable=False)
    interview_preparation_tips = Column(Text, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
