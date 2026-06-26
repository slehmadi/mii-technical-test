from fastapi import FastAPI

from app.db.database import engine
from app.db.models import Base

app = FastAPI(title="Auth Service")

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

@app.get("/health")
def health_check():
    return {"status": "healthy"}