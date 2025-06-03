from backend.models.organism import Organism


class DummyOrganism(Organism):
    def move(self) -> None:
        pass

    def grow(self) -> None:
        self.size += 1

    def reproduce(self) -> "Organism":
        return DummyOrganism(self.position, self.size, self.energy, self.nutrients)

    def die(self) -> bool:
        return False


def test_consume_nutrients():
    organism = DummyOrganism((0, 0), size=1.0, energy=0.0, nutrients=10.0)
    organism.consume_nutrients(2.0)
    assert organism.energy == 2.0
    assert organism.nutrients == 8.0
