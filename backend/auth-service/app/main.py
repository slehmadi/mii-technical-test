import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator

from app.api.routes import router
from app.core.config import settings
from app.db.database import Base, engine
from app.observability.tracing import setup_tracing

app = FastAPI(title="Auth Service")

setup_tracing(app=app, engine=engine, service_name="auth-service")

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
def health_check():
    return {"status": "healthy"}

Instrumentator().instrument(app).expose(app)