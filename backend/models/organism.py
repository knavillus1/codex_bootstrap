from abc import ABC
from typing import Optional, Tuple


class Organism(ABC):
    """Base organism with core properties and simple behaviors."""

    def __init__(
        self,
        position: Tuple[int, int],
        size: float,
        energy: float,
        nutrients: float,
    ) -> None:
        self.position = position
        self.size = size
        self.energy = energy
        self.nutrients = nutrients

    def move(self) -> None:
        """Move the organism within the environment.

        The base implementation does not move but can be overridden
        by subclasses for specific behavior.
        """
        # Default organisms remain stationary
        pass

    def grow(self) -> None:
        """Grow the organism using available nutrients."""
        if self.nutrients > 0:
            consumed = min(self.nutrients, 1.0)
            self.consume_nutrients(consumed)
            # Apply an energy cost for growth
            self.energy -= consumed * 0.1
            self.size += consumed

    def reproduce(self) -> Optional["Organism"]:
        """Create a new organism if energy and size allow.

        Offspring inherits half the parent's size, energy, and nutrients.
        Returns ``None`` if thresholds are not met.
        """
        if self.energy >= 2.0 and self.size >= 2.0:
            self.energy /= 2
            self.size /= 2
            offspring = self.__class__(
                position=self.position,
                size=self.size,
                energy=self.energy,
                nutrients=self.nutrients / 2,
            )
            self.nutrients /= 2
            return offspring
        return None

    def die(self) -> bool:
        """Return True if the organism should be removed from simulation."""
        return self.energy <= 0 or self.size <= 0

    def consume_nutrients(self, amount: float) -> None:
        """Consume nutrients and increase energy."""
        self.nutrients -= amount
        self.energy += amount
