from backend.simulation.engine import SimulationEngine
from backend.models import Algae, Herbivore, Carnivore


def test_eating_and_hunting_collisions():
    engine = SimulationEngine()
    algae = Algae((1, 0), size=1.0, energy=1.0, nutrients=0.0)
    herbivore = Herbivore((0, 0), size=1.0, energy=0.0, nutrients=0.0)
    carnivore = Carnivore((0, 0), size=1.0, energy=0.0, nutrients=0.0)

    engine.add_organism(algae)
    engine.add_organism(herbivore)
    engine.add_organism(carnivore)

    engine.step()

    assert len(engine.organisms) == 1
    remaining = engine.organisms[0]
    assert isinstance(remaining, Carnivore)
    assert remaining.energy > 0
