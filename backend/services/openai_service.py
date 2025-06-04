import logging
import time
from typing import Any, List

try:
    import openai
except ImportError:  # pragma: no cover - openai optional for tests
    openai = None  # type: ignore

logger = logging.getLogger(__name__)


class OpenAIService:
    """Wrapper around OpenAI ChatCompletion with retry logic."""

    def __init__(self, api_key: str) -> None:
        if openai is None:
            raise RuntimeError("openai package is required")
        openai.api_key = api_key
        self._client = openai.ChatCompletion

    def chat_completion(
        self,
        messages: List[dict],
        model: str = "gpt-3.5-turbo",
        retries: int = 3,
        backoff: float = 1.0,
    ) -> Any:
        """Request a chat completion with retries on rate limit errors."""
        last_error: Exception | None = None
        for attempt in range(retries):
            try:
                return self._client.create(model=model, messages=messages)
            except (openai.error.RateLimitError,) as exc:  # type: ignore[attr-defined]
                last_error = exc
                delay = backoff * (2 ** attempt)
                logger.warning("Rate limited, retrying in %.1fs", delay)
                time.sleep(delay)
            except openai.error.OpenAIError as exc:  # type: ignore[attr-defined]
                logger.error("OpenAI error: %s", exc)
                raise
        raise RuntimeError("OpenAI request failed") from last_error
