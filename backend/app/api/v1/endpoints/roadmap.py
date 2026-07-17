import json
import logging

from fastapi import APIRouter, Depends, HTTPException, status
from google.api_core import exceptions as google_exceptions
from sqlalchemy.orm import Session

from app.database import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.schemas.roadmap import (
    GenerateRoadmapRequest,
    GenerateRoadmapResponse,
    RoadmapSaveRequest,
)
from app.services.ai_service import generate_career_roadmap
from app.services.roadmap_service import save_roadmap, get_latest_roadmap, roadmap_to_dict

logger = logging.getLogger("skillbridge")

router = APIRouter()


@router.post("/generate-roadmap", response_model=GenerateRoadmapResponse)
async def generate_roadmap(body: GenerateRoadmapRequest):
    try:
        result = generate_career_roadmap(
            name=body.name,
            degree=body.degree,
            year=body.year,
            skills=body.skills,
            career_goal=body.careerGoal,
        )
        return GenerateRoadmapResponse(
            career_summary=result["career_summary"],
            skill_gap=result["skill_gap"],
            six_month_roadmap=result["six_month_roadmap"],
            recommended_projects=result["recommended_projects"],
            interview_preparation_tips=result["interview_preparation_tips"],
        )
    except RuntimeError as e:
        logger.error("Gemini configuration error: %s", e)
        raise HTTPException(status_code=500, detail=str(e))
    except google_exceptions.InvalidArgument as e:
        logger.error("Gemini API key error: %s", e)
        raise HTTPException(
            status_code=500,
            detail="Invalid Gemini API key. Check that GEMINI_API_KEY in backend/.env is correct and has Gemini API enabled.",
        )
    except google_exceptions.PermissionDenied as e:
        logger.error("Gemini permission denied: %s", e)
        raise HTTPException(
            status_code=500,
            detail="Gemini API permission denied. Check that your API key has the Gemini API enabled in Google Cloud Console.",
        )
    except google_exceptions.ResourceExhausted as e:
        logger.error("Gemini quota exceeded: %s", e)
        raise HTTPException(
            status_code=429,
            detail="Gemini API quota exceeded. Try again later or check your billing status.",
        )
    except json.JSONDecodeError as e:
        logger.error("Failed to parse Gemini response as JSON: %s", e)
        raise HTTPException(
            status_code=500,
            detail="AI returned an invalid response. Please try again.",
        )
    except Exception as e:
        logger.exception("Failed to generate roadmap")
        raise HTTPException(status_code=500, detail="Failed to generate roadmap. Please try again.")


@router.post("/roadmaps/save", status_code=201)
async def save_user_roadmap(
    body: RoadmapSaveRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        roadmap = save_roadmap(
            db=db,
            user_id=current_user.id,
            career_summary=body.career_summary,
            skill_gap=body.skill_gap,
            six_month_roadmap=body.six_month_roadmap,
            recommended_projects=body.recommended_projects,
            interview_preparation_tips=body.interview_preparation_tips,
        )
        return roadmap_to_dict(roadmap)
    except Exception as e:
        logger.exception("Failed to save roadmap")
        raise HTTPException(status_code=500, detail="Failed to save roadmap.")


@router.get("/roadmaps/me")
async def get_my_roadmap(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    roadmap = get_latest_roadmap(db, current_user.id)
    if not roadmap:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No roadmap found. Generate one from your profile.",
        )
    return roadmap_to_dict(roadmap)
