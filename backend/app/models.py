from sqlalchemy import Column, Integer, String

from .db import Base


class HighScore(Base):
    __tablename__ = "high_scores"

    id = Column(Integer, primary_key=True, index=True)
    initials = Column(String(3), nullable=False)
    score = Column(Integer, nullable=False)
