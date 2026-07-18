import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.settings import settings
from app.api.v1.endpoints.roadmap import router as roadmap_router
from app.api.v1.endpoints.auth import router as auth_router
from app.api.v1.endpoints.progress import router as progress_router
from app.database import engine, Base
import app.models

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("skillbridge")

# settings already logged Gemini key status on import

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SkillBridge AI",
    description="AI-powered career mentor API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_origin_regex=r"https?://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(roadmap_router, prefix="/api", tags=["roadmap"])
app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(progress_router, prefix="/api", tags=["progress"])


@app.get("/")
async def root():
    return {"message": "SkillBridge AI Backend Running"}
