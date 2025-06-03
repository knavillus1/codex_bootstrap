from .algae import Algae
from .organism import Organism


class Herbivore(Organism):
    """Organism that moves and consumes algae."""

    def move(self) -> None:
        x, y = self.position
        self.position = (x + 1, y)
        self.energy -= 0.1

    def eat(self, algae: Algae) -> None:
        self.consume_nutrients(algae.energy)
        algae.energy = 0
