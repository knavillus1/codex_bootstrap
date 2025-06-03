from __future__ import annotations

from typing import List

from backend.models import Organism
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
        for organism in list(self.organisms):
            organism.move()
            organism.grow()
            offspring = organism.reproduce()
            if offspring is not None:
                new_organisms.append(offspring)
            if organism.die():
                self.organisms.remove(organism)
        self.organisms.extend(new_organisms)
        self.step_count += 1
