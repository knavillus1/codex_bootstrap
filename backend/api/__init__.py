"""Aggregate API routers for the application."""

from fastapi import APIRouter

from api.chat import router as chat_router
from api.messages import router as message_router
from api.files import router as file_router


api_router = APIRouter()
api_router.include_router(chat_router)
api_router.include_router(message_router)
api_router.include_router(file_router)

__all__ = ["api_router"]
