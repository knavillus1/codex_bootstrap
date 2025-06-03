import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api.simulation import router as simulation_router

app = FastAPI(
    title="Ecosystem Simulation API",
    description="API for controlling and inspecting the ecosystem simulation",
)

origins = os.getenv("ALLOW_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(simulation_router, prefix="/simulation")


@app.get("/", summary="Health check")
def read_root():
    """Health check endpoint."""
    return {"status": "ok"}
