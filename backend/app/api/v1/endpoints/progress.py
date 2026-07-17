import logging

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.models.roadmap import Roadmap
from app.schemas.progress import ProgressUpdateRequest, ProgressUpdateResponse
from app.services.progress_service import upsert_progress, get_progress_summary

logger = logging.getLogger("skillbridge")

router = APIRouter()


@router.get("/progress")
async def get_progress(
    roadmap_id: str = Query(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    roadmap = db.query(Roadmap).filter(Roadmap.id == roadmap_id).first()
    if not roadmap:
        raise HTTPException(status_code=404, detail="Roadmap not found")

    total_months = len(roadmap.six_month_roadmap)
    summary = get_progress_summary(db, current_user.id, roadmap_id, total_months)
    return summary


@router.post("/progress/update", response_model=ProgressUpdateResponse)
async def update_progress(
    body: ProgressUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    roadmap = db.query(Roadmap).filter(Roadmap.id == body.roadmap_id).first()
    if not roadmap:
        raise HTTPException(status_code=404, detail="Roadmap not found")

    try:
        progress = upsert_progress(
            db=db,
            user_id=current_user.id,
            roadmap_id=body.roadmap_id,
            month_name=body.month_name,
            completed=body.completed,
        )
        return ProgressUpdateResponse(
            id=progress.id,
            user_id=progress.user_id,
            roadmap_id=progress.roadmap_id,
            month_name=progress.month_name,
            completed=progress.completed,
            completed_at=progress.completed_at,
            created_at=progress.created_at,
            updated_at=progress.updated_at,
        )
    except Exception as e:
        logger.exception("Failed to update progress")
        raise HTTPException(status_code=500, detail="Failed to update progress.")
