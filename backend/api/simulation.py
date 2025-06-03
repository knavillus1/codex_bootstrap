from fastapi import APIRouter

from backend.simulation.engine import SimulationEngine

router = APIRouter()

# Global engine instance used by API endpoints
engine = SimulationEngine()


@router.post("/reset")
def reset_simulation(algae: int = 10, herbivores: int = 5, carnivores: int = 2):
    """Reset simulation with default populations."""
    engine.reset(algae, herbivores, carnivores)
    return {"status": "reset", "organisms": len(engine.organisms)}


@router.post("/step")
def step_simulation():
    """Advance the simulation by one step."""
    engine.step()
    return {"step": engine.step_count}


@router.get("/state")
def state_simulation():
    """Return current simulation state."""
    organisms = [
        {
            "type": o.__class__.__name__.lower(),
            "position": o.position,
            "size": o.size,
            "energy": o.energy,
        }
        for o in engine.organisms
    ]
    return {"step": engine.step_count, "organisms": organisms}


@router.get("/stats")
def simulation_stats():
    """Return population counts and current step."""
    from collections import Counter

    counts = Counter(o.__class__.__name__.lower() for o in engine.organisms)
    return {"step": engine.step_count, "counts": counts}
