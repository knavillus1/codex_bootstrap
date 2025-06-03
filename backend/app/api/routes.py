from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..db import SessionLocal, Base, engine
from ..models import HighScore

router = APIRouter()

# Create tables on import for simplicity
Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/scores")
async def read_scores(db: Session = Depends(get_db)):
    scores = db.query(HighScore).order_by(HighScore.score.desc()).limit(10).all()
    return [
        {"initials": hs.initials, "score": hs.score}
        for hs in scores
    ]


@router.post("/scores")
async def add_score(initials: str, score: int, db: Session = Depends(get_db)):
    if len(initials) != 3:
        raise HTTPException(status_code=400, detail="Initials must be 3 characters")
    hs = HighScore(initials=initials.upper(), score=score)
    db.add(hs)
    db.commit()
    db.refresh(hs)
    return {"id": hs.id, "initials": hs.initials, "score": hs.score}
