from __future__ import annotations

from typing import List

from backend.models import Organism, Algae, Herbivore, Carnivore
from .environment import Environment


class SimulationEngine:
    """Manage organisms and advance simulation time steps."""

    def __init__(self, environment: Environment | None = None) -> None:
        self.environment = environment or Environment()
        self.organisms: List[Organism] = []
        self.step_count = 0

    def add_organism(self, organism: Organism) -> None:
        self.organisms.append(organism)

    def step(self) -> None:
        """Advance the simulation by one step."""
        new_organisms: List[Organism] = []

        # Move and grow all organisms first
        for organism in list(self.organisms):
            organism.move()
            organism.grow()

        # Handle collisions for eating interactions
        for herbivore in [o for o in self.organisms if isinstance(o, Herbivore)]:
            for algae in [a for a in self.organisms if isinstance(a, Algae)]:
                if herbivore.position == algae.position:
                    herbivore.eat(algae)

        for carnivore in [o for o in self.organisms if isinstance(o, Carnivore)]:
            for herbivore in [h for h in self.organisms if isinstance(h, Herbivore)]:
                if carnivore.position == herbivore.position:
                    carnivore.hunt(herbivore)

        # Handle reproduction and death
        for organism in list(self.organisms):
            offspring = organism.reproduce()
            if offspring is not None:
                new_organisms.append(offspring)
            if organism.die():
                self.organisms.remove(organism)

        self.organisms.extend(new_organisms)
        self.step_count += 1
