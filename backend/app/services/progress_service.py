from datetime import datetime, timezone
from typing import Optional

from sqlalchemy.orm import Session

from app.models.progress import Progress


def upsert_progress(
    db: Session,
    user_id: str,
    roadmap_id: str,
    month_name: str,
    completed: bool,
) -> Progress:
    existing = (
        db.query(Progress)
        .filter(
            Progress.user_id == user_id,
            Progress.roadmap_id == roadmap_id,
            Progress.month_name == month_name,
        )
        .first()
    )

    if existing:
        existing.completed = completed
        existing.completed_at = datetime.now(timezone.utc) if completed else None
        existing.updated_at = datetime.now(timezone.utc)
    else:
        existing = Progress(
            user_id=user_id,
            roadmap_id=roadmap_id,
            month_name=month_name,
            completed=completed,
            completed_at=datetime.now(timezone.utc) if completed else None,
        )
        db.add(existing)

    db.commit()
    db.refresh(existing)
    return existing


def get_progress_entries(
    db: Session,
    user_id: str,
    roadmap_id: str,
) -> list[Progress]:
    return (
        db.query(Progress)
        .filter(
            Progress.user_id == user_id,
            Progress.roadmap_id == roadmap_id,
        )
        .all()
    )


def get_progress_summary(
    db: Session,
    user_id: str,
    roadmap_id: str,
    total_months: int,
) -> dict:
    entries = get_progress_entries(db, user_id, roadmap_id)
    completed_entries = [e for e in entries if e.completed]
    completed_count = len(completed_entries)
    percentage = round((completed_count / total_months) * 100) if total_months > 0 else 0

    return {
        "entries": [
            {
                "month_name": e.month_name,
                "completed": e.completed,
                "completed_at": e.completed_at.isoformat() if e.completed_at else None,
            }
            for e in entries
        ],
        "total_months": total_months,
        "completed_months": completed_count,
        "remaining_months": total_months - completed_count,
        "percentage": percentage,
    }
