import json
from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.models.roadmap import Roadmap


def save_roadmap(
    db: Session,
    user_id: str,
    career_summary: str,
    skill_gap: list[str],
    six_month_roadmap: dict,
    recommended_projects: list[str],
    interview_preparation_tips: list[str],
) -> Roadmap:
    roadmap = Roadmap(
        user_id=user_id,
        career_summary=career_summary,
        skill_gap=json.dumps(skill_gap),
        six_month_roadmap=json.dumps(six_month_roadmap),
        recommended_projects=json.dumps(recommended_projects),
        interview_preparation_tips=json.dumps(interview_preparation_tips),
    )
    db.add(roadmap)
    db.commit()
    db.refresh(roadmap)
    return roadmap


def get_latest_roadmap(db: Session, user_id: str) -> Roadmap | None:
    return (
        db.query(Roadmap)
        .filter(Roadmap.user_id == user_id)
        .order_by(Roadmap.created_at.desc())
        .first()
    )


def roadmap_to_dict(roadmap: Roadmap) -> dict:
    return {
        "id": roadmap.id,
        "user_id": roadmap.user_id,
        "career_summary": roadmap.career_summary,
        "skill_gap": json.loads(roadmap.skill_gap),
        "six_month_roadmap": json.loads(roadmap.six_month_roadmap),
        "recommended_projects": json.loads(roadmap.recommended_projects),
        "interview_preparation_tips": json.loads(roadmap.interview_preparation_tips),
        "created_at": roadmap.created_at.isoformat() if roadmap.created_at else None,
        "updated_at": roadmap.updated_at.isoformat() if roadmap.updated_at else None,
    }
