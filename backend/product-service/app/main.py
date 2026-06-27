import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router
from app.core.config import settings
from app.db.database import Base, engine

app = FastAPI(title="Auth Service")

@app.on_event('startup')
def startup():
    if os.getenv('TESTING') != "1":
        Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(router)

@app.get("/health")
def health():
    return {"status": "healthy"}