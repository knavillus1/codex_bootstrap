"""Aggregate API routers for the application."""

from fastapi import APIRouter

from .chat import router as chat_router
from .messages import router as message_router
from .files import router as file_router
from .stream import router as stream_router
from ..config import settings  # imported to initialize config if needed


api_router = APIRouter()
api_router.include_router(chat_router)
api_router.include_router(message_router)
api_router.include_router(file_router)
# Always include stream router; endpoint checks FEATURE_STREAMING internally
api_router.include_router(stream_router)

__all__ = ["api_router"]
