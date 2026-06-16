from fastapi import FastAPI

from app.core.database import Base, engine
from app.models import User
from app.api.auth import router as auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MailMind API",
    version="1.0.0"
)

app.include_router(
    auth_router,
    prefix="/api/auth",
    tags=["Authentication"]
)


@app.get("/")
def home():
    return {
        "message": "Welcome to MailMind API"
    }