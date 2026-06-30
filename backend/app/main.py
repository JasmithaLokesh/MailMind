from fastapi import FastAPI
from fastapi import Request
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine
from app.models import User
from app.api.auth import router as auth_router

from app.routes.google_auth import router as google_router
from app.routes.outlook_auth import router as outlook_router
from app.routes.yahoo_auth import router as yahoo_router
from app.core.migration import run_db_migrations
from app.routes.ai import router as ai_router

from app.models import *
from app.routes.analytics import router as analytics_router
from app.routes.gmail import router as gmail_router

from app.ai.model_manager import (
    get_classifier,
    get_summarizer,
    get_sentiment,
    get_spam,
    get_ner
)

Base.metadata.create_all(bind=engine)
run_db_migrations()

app = FastAPI(
    title="MailMind API",
    version="1.0.0"
)

# @app.on_event("startup")
# def load_ai_models():

#     print("=" * 60)
#     print("Loading AI models...")

#     get_classifier()
#     get_summarizer()
#     get_sentiment()
#     get_spam()
#     get_ner()

#     print("All AI models loaded.")
#     print("=" * 60)

# CORS CONFIGURATION

@app.middleware("http")
async def security_headers(
    request: Request,
    call_next
):

    response = await call_next(
        request
    )

    response.headers[
        "X-Content-Type-Options"
    ] = "nosniff"

    response.headers[
        "X-Frame-Options"
    ] = "DENY"

    response.headers[
        "X-XSS-Protection"
    ] = "1; mode=block"

    return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    auth_router,
    prefix="/api/auth",
    tags=["Authentication"]
)

app.include_router(
    google_router,
    prefix="/api/auth",
    tags=["Google Authentication"]
)

app.include_router(
    outlook_router,
    prefix="/api/auth",
    tags=["Outlook Authentication"]
)

app.include_router(
    yahoo_router,
    prefix="/api/auth",
    tags=["Yahoo Authentication"]
)

app.include_router(
    ai_router,
    prefix="/api/ai",
    tags=["AI"]
)

app.include_router(
    analytics_router,
    prefix="/api/analytics",
    tags=["Analytics"]
)

app.include_router(
    gmail_router,
    prefix="/api/gmail",
    tags=["Gmail"]
)

@app.get("/")
def home():
    return {
        "message": "Welcome to MailMind API"
    }