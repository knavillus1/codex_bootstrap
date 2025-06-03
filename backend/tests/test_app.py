import asyncio
from httpx import AsyncClient
from backend.main import app


async def test_health_check():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        resp = await ac.get("/health")
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok"}


if __name__ == "__main__":
    asyncio.run(test_health_check())
