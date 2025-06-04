from backend.services.openai_service import OpenAIService


class FakeOpenAI:
    class error:
        class OpenAIError(Exception):
            pass

        class RateLimitError(OpenAIError):
            pass

    class ChatCompletion:
        def __init__(self, responses):
            self._responses = iter(responses)
            self.calls = []

        def create(self, **kwargs):
            self.calls.append(kwargs)
            resp = next(self._responses)
            if isinstance(resp, Exception):
                raise resp
            return resp


def test_chat_completion_success(monkeypatch):
    fake = FakeOpenAI()
    fake_response = {"choices": [{"message": {"content": "hello"}}]}
    fake.ChatCompletion = FakeOpenAI.ChatCompletion([fake_response])
    monkeypatch.setattr(
        "backend.services.openai_service.openai", fake, raising=False
    )

    service = OpenAIService(api_key="key")
    result = service.chat_completion([{"role": "user", "content": "hi"}])
    assert result == fake_response
    assert fake.ChatCompletion.calls[0]["model"] == "gpt-3.5-turbo"


def test_chat_completion_retries(monkeypatch):
    fake = FakeOpenAI()
    responses = [
        FakeOpenAI.error.RateLimitError(),
        FakeOpenAI.error.RateLimitError(),
        {"choices": [{"message": {"content": "ok"}}]},
    ]
    fake.ChatCompletion = FakeOpenAI.ChatCompletion(responses)
    monkeypatch.setattr(
        "backend.services.openai_service.openai", fake, raising=False
    )

    service = OpenAIService(api_key="key")
    result = service.chat_completion(
        [{"role": "user", "content": "hi"}], retries=3, backoff=0
    )
    assert result["choices"][0]["message"]["content"] == "ok"
    assert len(fake.ChatCompletion.calls) == 3
