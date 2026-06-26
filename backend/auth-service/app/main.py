from fastapi import FastAPI

from app.db.database import engine
from app.db.models import Base

from app.api.routes import router

app = FastAPI(title="Auth Service")

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

app.include_router(router)

@app.get("/health")
def health_check():
    return {"status": "healthy"}