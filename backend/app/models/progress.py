import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, UniqueConstraint
from app.database import Base


class Progress(Base):
    __tablename__ = "progress"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    roadmap_id = Column(String, ForeignKey("roadmaps.id"), nullable=False)
    month_name = Column(String, nullable=False)
    completed = Column(Boolean, default=False, nullable=False)
    completed_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    __table_args__ = (
        UniqueConstraint("user_id", "roadmap_id", "month_name", name="uq_user_roadmap_month"),
    )
