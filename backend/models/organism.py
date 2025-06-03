from abc import ABC, abstractmethod
from typing import Tuple


class Organism(ABC):
    """Base organism with core properties."""

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

    @abstractmethod
    def move(self) -> None:
        """Move the organism within the environment."""

    @abstractmethod
    def grow(self) -> None:
        """Grow the organism using available nutrients."""

    @abstractmethod
    def reproduce(self) -> "Organism":
        """Create a new organism if conditions allow."""

    @abstractmethod
    def die(self) -> bool:
        """Return True if the organism should be removed from simulation."""

    def consume_nutrients(self, amount: float) -> None:
        """Consume nutrients and increase energy."""
        self.nutrients -= amount
        self.energy += amount
