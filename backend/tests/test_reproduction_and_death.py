from backend.models.organism import Organism
from backend.simulation.engine import SimulationEngine
from backend.models import Algae, Herbivore


def test_reproduction_thresholds():
    org = Organism((0, 0), size=2.0, energy=2.0, nutrients=0.0)
    child = org.reproduce()
    assert child is not None
    assert org.size == 1.0
    assert child.size == 1.0
    assert org.energy == 1.0
    assert child.energy == 1.0


def test_nutrient_release_on_death():
    engine = SimulationEngine()
    algae = Algae((1, 1), size=1.0, energy=1.0, nutrients=2.0)
    herbivore = Herbivore((0, 1), size=1.0, energy=0.0, nutrients=0.0)
    engine.add_organism(algae)
    engine.add_organism(herbivore)
    engine.step()
    assert all(not isinstance(o, Algae) for o in engine.organisms)
    assert engine.environment.get_nutrients((1, 1)) == 1.0
