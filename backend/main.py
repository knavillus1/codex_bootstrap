from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from .database import engine, get_db
from .models import Base
from .auth import router as auth_router
from .decks import router as deck_router

app = FastAPI()
app.include_router(auth_router)
app.include_router(deck_router)


@app.on_event("startup")
async def on_startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


@app.get("/health")
async def health_check():
    return {"status": "ok"}


@app.get("/users")
async def list_users(db: AsyncSession = Depends(get_db)):
    await db.execute("SELECT 1")
    return {"ok": True}
