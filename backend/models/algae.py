from .organism import Organism


class Algae(Organism):
    """Stationary organism that only grows."""

    def move(self) -> None:  # pragma: no cover - intentionally does nothing
        pass
