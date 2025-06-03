from fastapi import FastAPI
from .api.routes import router


app = FastAPI()


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}


app.include_router(router, prefix="/api")
