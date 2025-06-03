from fastapi import FastAPI

app = FastAPI(title="Ecosystem Simulation API")


@app.get("/")
def read_root():
    """Health check endpoint."""
    return {"status": "ok"}
