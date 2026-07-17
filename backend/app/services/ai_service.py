import json
import logging

import google.generativeai as genai
from google.api_core import exceptions as google_exceptions

from app.config.settings import settings

logger = logging.getLogger("skillbridge")

_FALLBACK_MODELS = [
    settings.GEMINI_MODEL,
    "gemini-2.0-flash",
    "gemini-1.5-flash",
]

_genai_configured = False
_model = None


def _ensure_configured():
    global _genai_configured, _model
    if _genai_configured:
        return

    if not settings.gemini_configured:
        raise RuntimeError(
            "Gemini API key is not configured. "
            "Set a valid GEMINI_API_KEY in backend/.env"
        )

    genai.configure(api_key=settings.GEMINI_API_KEY)

    last_error = None
    for model_name in _FALLBACK_MODELS:
        try:
            _model = genai.GenerativeModel(model_name)
            _model.generate_content("test", generation_config={"max_output_tokens": 1})
            logger.info("Using Gemini model: %s", model_name)
            break
        except google_exceptions.InvalidArgument as e:
            if "API_KEY_INVALID" in str(e):
                raise RuntimeError(
                    "Gemini API key is invalid. "
                    "Get a valid key at https://aistudio.google.com/apikey "
                    "and enable the Gemini API at "
                    "https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com"
                ) from e
            logger.warning("Gemini model '%s' not available, trying next...", model_name)
            last_error = e
            _model = None
            continue
        except google_exceptions.NotFound as e:
            logger.warning("Gemini model '%s' not found, trying next...", model_name)
            last_error = e
            _model = None
            continue

    if _model is None:
        raise RuntimeError(
            "No available Gemini model found. "
            "Check GEMINI_MODEL in backend/.env or your API key permissions. "
            f"Last error: {last_error}"
        )

    _genai_configured = True


def generate_structured_content(prompt: str) -> str:
    _ensure_configured()
    generation_config = {
        "temperature": 0.7,
        "top_p": 0.95,
        "top_k": 40,
    }
    response = _model.generate_content(
        prompt,
        generation_config=generation_config,
    )
    return response.text


def generate_career_roadmap(
    name: str,
    degree: str,
    year: str,
    skills: list[str],
    career_goal: str,
) -> dict:
    skills_str = ", ".join(skills)

    prompt = f"""You are a senior AI career mentor. Generate a detailed career roadmap for the following student:

Name: {name}
Degree: {degree}
Year: {year}
Current Skills: {skills_str}
Career Goal: {career_goal}

Return ONLY a valid JSON object with exactly this structure (no markdown, no code fences, no extra text):

{{
  "career_summary": "A 3-4 line career summary based on their profile.",
  "skill_gap": ["Skill 1", "Skill 2", "Skill 3"],
  "six_month_roadmap": {{
    "Month 1": {{"goal": "Specific goal for this month", "learning_focus": "What to focus on learning", "resources": "Recommended resources"}},
    "Month 2": {{"goal": "Specific goal for this month", "learning_focus": "What to focus on learning", "resources": "Recommended resources"}},
    "Month 3": {{"goal": "Specific goal for this month", "learning_focus": "What to focus on learning", "resources": "Recommended resources"}},
    "Month 4": {{"goal": "Specific goal for this month", "learning_focus": "What to focus on learning", "resources": "Recommended resources"}},
    "Month 5": {{"goal": "Specific goal for this month", "learning_focus": "What to focus on learning", "resources": "Recommended resources"}},
    "Month 6": {{"goal": "Specific goal for this month", "learning_focus": "What to focus on learning", "resources": "Recommended resources"}}
  }},
  "recommended_projects": ["Project idea 1", "Project idea 2", "Project idea 3"],
  "interview_preparation_tips": ["Tip 1", "Tip 2", "Tip 3", "Tip 4"]
}}"""

    raw = generate_structured_content(prompt)
    cleaned = raw.strip()
    if cleaned.startswith("```"):
        cleaned = cleaned.split("\n", 1)[-1]
        cleaned = cleaned.rsplit("```", 1)[0]
    cleaned = cleaned.strip()
    return json.loads(cleaned)
