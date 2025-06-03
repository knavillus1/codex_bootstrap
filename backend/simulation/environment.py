from typing import Dict, Tuple


class Environment:
    """Manage the 2D world and nutrients."""

    def __init__(self, width: int = 500, height: int = 500) -> None:
        self.width = width
        self.height = height
        self._nutrients: Dict[Tuple[int, int], float] = {}

    def add_nutrients(self, position: Tuple[int, int], amount: float) -> None:
        """Add nutrients at the given position."""
        self._nutrients[position] = self._nutrients.get(position, 0.0) + amount

    def get_nutrients(self, position: Tuple[int, int]) -> float:
        """Return available nutrients at a position."""
        return self._nutrients.get(position, 0.0)

    def consume_nutrients(self, position: Tuple[int, int], amount: float) -> float:
        """Consume nutrients from a position and return the amount taken."""
        available = self._nutrients.get(position, 0.0)
        consumed = min(available, amount)
        if consumed:
            self._nutrients[position] = available - consumed
        return consumed
