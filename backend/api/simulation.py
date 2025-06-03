from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel

from backend.simulation.engine import SimulationEngine


class OrganismState(BaseModel):
    type: str
    position: tuple[int, int]
    size: float
    energy: float


class ResetResponse(BaseModel):
    status: str
    organisms: int


class StepResponse(BaseModel):
    step: int


class StateResponse(BaseModel):
    step: int
    organisms: list[OrganismState]


class StatsResponse(BaseModel):
    step: int
    counts: dict[str, int]


router = APIRouter()

# Global engine instance used by API endpoints
engine = SimulationEngine()


@router.post("/reset", response_model=ResetResponse)
def reset_simulation(
    algae: int = Query(10),
    herbivores: int = Query(5),
    carnivores: int = Query(2),
):
    """Reset simulation with default populations."""
    if algae < 0 or herbivores < 0 or carnivores < 0:
        raise HTTPException(
            status_code=400,
            detail="Population counts must be non-negative",
        )
    engine.reset(algae, herbivores, carnivores)
    return {"status": "reset", "organisms": len(engine.organisms)}


@router.post("/step", response_model=StepResponse)
def step_simulation():
    """Advance the simulation by one step."""
    engine.step()
    return {"step": engine.step_count}


@router.get("/state", response_model=StateResponse)
def state_simulation():
    """Return current simulation state."""
    organisms = [
        OrganismState(
            type=o.__class__.__name__.lower(),
            position=o.position,
            size=o.size,
            energy=o.energy,
        )
        for o in engine.organisms
    ]
    return {"step": engine.step_count, "organisms": organisms}


@router.get("/stats", response_model=StatsResponse)
def simulation_stats():
    """Return population counts and current step."""
    from collections import Counter

    counts = Counter(o.__class__.__name__.lower() for o in engine.organisms)
    return {"step": engine.step_count, "counts": counts}
