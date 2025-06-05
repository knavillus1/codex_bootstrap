import asyncio
from backend.services.openai_service import OpenAIService


class FakeStream:
    def __init__(self, responses):
        self._responses = iter(responses)
        self.calls = []

    def __iter__(self):
        return self

    def __next__(self):
        return next(self._responses)


class FakeOpenAI:
    class StreamClient:
        def __init__(self, parent):
            self.parent = parent
            self.chat = self
            self.completions = self

        def create(self, **kwargs):
            self.parent.calls.append(kwargs)
            return FakeStream(self.parent._responses)

    def OpenAI(self, api_key=None):
        return FakeOpenAI.StreamClient(self)

    def __init__(self):
        self._responses = []
        self.calls = []

    def set_responses(self, responses):
        self._responses = responses


async def collect(gen):
    data = []
    async for chunk in gen:
        data.append(chunk)
    return data


def test_chat_completion_stream(monkeypatch):
    fake = FakeOpenAI()
    fake.set_responses([{"delta": "a"}, {"delta": "b"}])
    monkeypatch.setattr("backend.services.openai_service.openai", fake, raising=False)

    service = OpenAIService(api_key="key")
    gen = service.chat_completion_stream([{"role": "user", "content": "hi"}])
    chunks = asyncio.get_event_loop().run_until_complete(collect(gen))
    assert chunks == [{"delta": "a"}, {"delta": "b"}]
    assert fake.calls[0]["model"] == "gpt-3.5-turbo"
