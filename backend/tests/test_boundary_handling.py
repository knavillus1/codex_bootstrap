from backend.simulation.engine import SimulationEngine
from backend.models import Herbivore
from backend.simulation.environment import Environment


def test_wrap_around_movement():
    env = Environment(width=2, height=2)
    engine = SimulationEngine(environment=env)
    herb = Herbivore(position=(1, 1), size=1.0, energy=1.0, nutrients=0.0)
    engine.add_organism(herb)
    engine.step()
    assert herb.position == (0, 1)
