from backend.simulation.engine import SimulationEngine
from backend.models.organism import Organism


class DummyOrganism(Organism):
    def move(self) -> None:
        pass

    def grow(self) -> None:
        pass

    def reproduce(self) -> "Organism | None":
        return None

    def die(self) -> bool:
        return False


def test_engine_step_increments_counter():
    engine = SimulationEngine()
    organism = DummyOrganism((0, 0), size=1.0, energy=0.0, nutrients=0.0)
    engine.add_organism(organism)
    engine.step()
    assert engine.step_count == 1
    assert len(engine.organisms) == 1
