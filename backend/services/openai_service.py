import logging
import time
from typing import Any, List

from config import settings

try:
    import openai
except ImportError:  # pragma: no cover - openai optional for tests
    openai = None  # type: ignore

logger = logging.getLogger(__name__)


class OpenAIService:
    """Wrapper around OpenAI ChatCompletion with retry logic."""

    def __init__(self, api_key: str, model: str | None = None) -> None:
        if openai is None:
            raise RuntimeError("openai package is required")
        # openai>=1.0 uses a client instance for API access
        # fall back to the legacy global api_key if OpenAI class is missing
        if hasattr(openai, "OpenAI"):
            self._client = openai.OpenAI(api_key=api_key)
        else:  # pragma: no cover - legacy openai versions
            openai.api_key = api_key
            self._client = openai.ChatCompletion
        self.default_model = model or settings.OPENAI_MODEL

    def _to_dict(self, resp: Any) -> dict:
        """Convert OpenAI response object to dict for compatibility."""
        if hasattr(resp, "model_dump"):
            return resp.model_dump()
        if hasattr(resp, "to_dict"):
            return resp.to_dict()
        if isinstance(resp, dict):
            return resp
        return dict(resp)

    def chat_completion(
        self,
        messages: List[dict],
        model: str | None = None,
        retries: int = 3,
        backoff: float = 1.0,
    ) -> Any:
        """Request a chat completion with retries on rate limit errors."""
        last_error: Exception | None = None
        model = model or self.default_model
        if hasattr(openai, "error"):
            RateLimitErr = openai.error.RateLimitError  # type: ignore[attr-defined]
            OpenAIErr = openai.error.OpenAIError  # type: ignore[attr-defined]
        else:
            RateLimitErr = openai.RateLimitError  # type: ignore[attr-defined]
            OpenAIErr = openai.OpenAIError  # type: ignore[attr-defined]

        for attempt in range(retries):
            try:
                if hasattr(self._client, "chat"):
                    # openai>=1.0 client
                    resp = self._client.chat.completions.create(
                        model=model, messages=messages
                    )
                    resp_dict = self._to_dict(resp)
                    logger.debug(f"OpenAI response: {resp_dict}")
                    return resp_dict
                resp = self._client.create(model=model, messages=messages)
                resp_dict = self._to_dict(resp)
                logger.debug(f"OpenAI response: {resp_dict}")
                return resp_dict
            except RateLimitErr as exc:  # type: ignore[misc]
                last_error = exc
                delay = backoff * (2 ** attempt)
                logger.warning("Rate limited, retrying in %.1fs", delay)
                time.sleep(delay)
            except OpenAIErr as exc:  # type: ignore[misc]
                last_error = exc
                logger.error("OpenAI error: %s", exc)
                break
        if last_error:
            raise RuntimeError("OpenAI request failed") from last_error
