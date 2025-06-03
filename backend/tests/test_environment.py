from backend.simulation.environment import Environment


def test_add_and_consume_nutrients():
    env = Environment(width=10, height=10)
    env.add_nutrients((1, 2), 5.0)
    assert env.get_nutrients((1, 2)) == 5.0

    consumed = env.consume_nutrients((1, 2), 2.0)
    assert consumed == 2.0
    assert env.get_nutrients((1, 2)) == 3.0
