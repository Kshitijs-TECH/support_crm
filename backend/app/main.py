from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routes.tickets import router as tickets_router


# Import models so SQLAlchemy knows about our tables
from . import models


# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Support CRM API",
    description="Customer Support Ticketing CRM API",
    version="1.0.0"
)


# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register ticket routes
app.include_router(tickets_router)


@app.get("/")
def root():
    return {
        "message": "Support CRM API is running"
    }