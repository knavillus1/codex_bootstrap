from backend.models import Algae, Herbivore, Carnivore


def test_algae_growth():
    algae = Algae((0, 0), size=1.0, energy=0.0, nutrients=2.0)
    algae.grow()
    assert algae.size > 1.0
    assert algae.nutrients < 2.0


def test_herbivore_move_and_eat():
    algae = Algae((0, 0), size=1.0, energy=1.0, nutrients=0.0)
    herbivore = Herbivore((0, 0), size=1.0, energy=0.0, nutrients=0.0)
    herbivore.move()
    assert herbivore.position == (1, 0)
    herbivore.eat(algae)
    assert herbivore.energy > 0.0
    assert algae.energy == 0


def test_carnivore_move_and_hunt():
    herbivore = Herbivore((0, 0), size=1.0, energy=1.0, nutrients=0.0)
    carnivore = Carnivore((0, 0), size=1.0, energy=0.0, nutrients=0.0)
    carnivore.move()
    assert carnivore.position == (1, 0)
    carnivore.hunt(herbivore)
    assert carnivore.energy > 0.0
    assert herbivore.energy == 0
