from backend.services.openai_service import OpenAIService


class FakeOpenAI:
    class OpenAIError(Exception):
        pass

    class RateLimitError(OpenAIError):
        pass

    class error:
        pass

    error.OpenAIError = OpenAIError
    error.RateLimitError = RateLimitError

    class Responses:
        def __init__(self, responses):
            self._responses = iter(responses)
            self.calls = []

        def create(self, **kwargs):
            self.calls.append(kwargs)
            resp = next(self._responses)
            if isinstance(resp, Exception):
                raise resp
            return resp

    class Client:
        def __init__(self, parent):
            parent.responses_obj = FakeOpenAI.Responses(parent._responses)
            self.responses = parent.responses_obj

    def __init__(self):
        self._responses = []
        self.responses_obj = None

    responses_obj: "FakeOpenAI.Responses"

    def OpenAI(self, api_key=None):
        return FakeOpenAI.Client(self)

    def set_responses(self, responses):
        self._responses = responses


def test_chat_completion_success(monkeypatch):
    fake = FakeOpenAI()
    fake_response = {"output_text": "hello"}
    fake.set_responses([fake_response])
    monkeypatch.setattr(
        "backend.services.openai_service.openai", fake, raising=False
    )

    service = OpenAIService(api_key="key")
    result = service.chat_completion([{"role": "user", "content": "hi"}])
    assert result == fake_response
    assert fake.responses_obj.calls[0]["model"] == "gpt-3.5-turbo"


def test_chat_completion_retries(monkeypatch):
    fake = FakeOpenAI()
    responses = [
        FakeOpenAI.error.RateLimitError(),
        FakeOpenAI.error.RateLimitError(),
        {"output_text": "ok"},
    ]
    fake.set_responses(responses)
    monkeypatch.setattr(
        "backend.services.openai_service.openai", fake, raising=False
    )

    service = OpenAIService(api_key="key")
    result = service.chat_completion(
        [{"role": "user", "content": "hi"}], retries=3, backoff=0
    )
    assert result["output_text"] == "ok"
    assert len(fake.responses_obj.calls) == 3


def test_default_model_from_settings(monkeypatch):
    fake = FakeOpenAI()
    fake_response = {"output_text": "hello"}
    fake.set_responses([fake_response])
    monkeypatch.setattr(
        "backend.services.openai_service.openai", fake, raising=False
    )
    monkeypatch.setattr(
        "backend.services.openai_service.settings.OPENAI_MODEL",
        "gpt-test",
        raising=False,
    )

    service = OpenAIService(api_key="key")
    service.chat_completion([{"role": "user", "content": "hi"}])
    assert fake.responses_obj.calls[0]["model"] == "gpt-test"
