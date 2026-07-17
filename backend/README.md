# SkillBridge AI — Backend

AI-powered career mentor API built with **FastAPI** and **Google Generative AI**.

## Tech Stack

| Layer       | Tool                          |
|-------------|-------------------------------|
| Framework   | FastAPI                       |
| Server      | Uvicorn                       |
| AI          | Google Generative AI (Gemini) |
| Config      | Pydantic Settings + python-dotenv |
| CORS        | Enabled (configurable origins)|

## Project Structure

```
backend/
├── app/
│   ├── api/          # Route definitions
│   ├── services/     # Business logic (AI, roadmap, etc.)
│   ├── models/       # Database models
│   ├── schemas/      # Pydantic request/response schemas
│   ├── config/       # Application settings
│   └── main.py       # FastAPI entry point
├── .env.example
├── requirements.txt
└── README.md
```

## Setup

### 1. Clone and enter the backend directory

```bash
cd backend
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

| OS      | Activate command                |
|---------|---------------------------------|
| Windows | `venv\Scripts\activate`         |
| macOS/Linux | `source venv/bin/activate` |

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in your values:

| Variable          | Description                                    |
|-------------------|------------------------------------------------|
| `SUPABASE_URL`    | Your Supabase project URL                      |
| `SUPABASE_KEY`    | Your Supabase anon / service key               |
| `GEMINI_API_KEY`  | API key from [Google AI Studio](https://aistudio.google.com/) |
| `CORS_ORIGINS`    | Allowed origins (JSON array of URLs)           |
| `DEBUG`           | Set to `true` for verbose logging              |

### 5. Run the server

```bash
uvicorn app.main:app --reload
```

The API is now available at **http://localhost:8000**.

Interactive docs: **http://localhost:8000/docs**

## Test the endpoint

```bash
curl http://localhost:8000/
```

Expected response:

```json
{
  "message": "SkillBridge AI Backend Running"
}
```
