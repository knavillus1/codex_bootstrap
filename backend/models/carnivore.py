from .herbivore import Herbivore
from .organism import Organism


class Carnivore(Organism):
    """Organism that hunts herbivores."""

    def move(self) -> None:
        x, y = self.position
        self.position = (x + 1, y)
        self.energy -= 0.2

    def hunt(self, herbivore: Herbivore) -> None:
        self.consume_nutrients(herbivore.energy)
        herbivore.energy = 0
