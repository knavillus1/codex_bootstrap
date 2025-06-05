# PRD: Real-Time Chat Streaming

## 1. Introduction/Overview
- This feature transforms the chat UI from a request/response pattern into a real-time streaming experience. Instead of waiting for the entire assistant response, users see tokens appear as soon as they are generated.
- Goal: reduce perceived latency, improve user engagement, and lay groundwork for future multimodal streaming (voice, image).

## 2. Goals
- Display the first assistant token within 200 ms of generation.
- Stream subsequent tokens progressively in the chat bubble.
- Minimize duplicate data transmission by sending only new token deltas.
- Provide a feature-flagged rollout to control exposure.

## 3. User Stories
1. As a chat user, I want to see AI-generated text appear token-by-token so that I can follow the response in real time.  
2. As a user on a slow network, I want to see partial responses early so I feel the app is responsive.  
3. As a developer, I want to keep the existing message history intact and append streamed content seamlessly.

## 4. Functional Requirements
1. The backend must expose a POST `/stream/` SSE endpoint using FastAPI’s `StreamingResponse` with `Content-Type: text/event-stream`.
2. `OpenAIService` must include an `async def chat_completion_stream(messages, **kwargs)` that yields OpenAI’s stream chunks as JSON deltas.
3. The SSE generator must prefix with the user’s message and end with a `[DONE]` event.
4. Introduce a feature flag (e.g., `FEATURE_STREAMING`) to enable/disable the `/stream/` route while preserving `/messages/` for legacy clients.
5. On the frontend, install `eventsource-parser` and implement a new React hook `useStream()` that:
   - Sends POST to `/stream/` with chat ID and content.
   - Parses SSE frames via the browser Streams API and `TextDecoder`.
   - Calls `setPartial` to append token deltas.
6. Update `ChatArea.tsx` to use `sendStream` instead of `sendMessage`, render `partial` tokens in a new `MessageBubble` until `[DONE]` arrives, then reload full history if needed.
7. Detect lack of `response.body` support; fall back to legacy `/messages/` request automatically.
8. Emit `event: error` SSE frames for exceptions; display a toast notification client-side on errors.

## 5. Non-Goals (Out of Scope)
- Voice- or image-streaming implementations (will be addressed in separate PRDs).
- WebSocket duplex routes beyond an optional note for future audio hooks.
- Overhauling the existing message UI beyond minimal styling hooks.

## 6. Design Considerations
- Show a “AI is typing…” indicator until the first token arrives.
- Append tokens progressively within the existing `MessageBubble` component using current Tailwind CSS styles.
- Ensure the partial message bubble scrolls into view as new tokens arrive.

## 7. Technical Considerations
- Add `eventsource-parser` as a dependency in `package.json` (`npm install eventsource-parser`).
- Middleware/CORS: allow `text/event-stream` on `/stream/`.
- Gate the new route with an environment flag.
- Write unit tests for `chat_completion_stream` and mock the ReadableStream in Vitest/Jest for the hook.
- Monitor for back-pressure and stream interruptions.

## 8. Success Metrics
- Average time to first token displayed is under 200 ms across 90% of chat sessions.
- At least 80% of users experience streaming endpoint without fallback.
- Positive user feedback on perceived responsiveness in post-release survey.

## 9. Open Questions
- Should we expose a `/stream/ws` WebSocket variant now, or defer to a separate PRD?
- What exact fallback UI should appear if `ReadableStream` is unavailable on a client?

## 10. Referenced PRD-background files
- None. This PRD is based on the provided feature specification and developer guidelines.



```
Below is a step-by-step guide to upgrading your chat app from **request/response** to **fully streamed text**, with pointers for voice- and image-streaming hooks you can layer on later.  In brief, you will  (1) expose a *streaming endpoint* in FastAPI that proxies OpenAI’s `stream=True` output, (2) consume that endpoint in React with the browser Streams API (or EventSource/WebSocket), and (3) progressively render partial tokens in the UI while keeping your existing data model intact.

---

## 1  Why Stream?

* **Lower latency & better UX** – users see words appear as soon as they are generated rather than waiting for the whole paragraph. ([cookbook.openai.com][1])
* **Bandwidth savings** – you stop sending duplicate prefixes for long answers; only new deltas are transmitted. ([community.openai.com][2])
* **Foundation for multimodal** – the exact same transport (SSE or WebSocket) can later push audio or image chunks. ([openai.com][3])

---

## 2  Backend: StreamingResponse or WebSocket

### 2.1  Choose a transport

| Transport                    | Pros                                                       | Cons                              | When to use                      |
| ---------------------------- | ---------------------------------------------------------- | --------------------------------- | -------------------------------- |
| **Server-Sent Events (SSE)** | Simple; works over HTTP/2; native `EventSource` in browser | Text-only; single direction       | Text token streams               |
| **WebSocket**                | Binary + duplex; good for audio                            | Requires extra infra (ping, auth) | Voice, image, or chat + presence |

FastAPI supports both via Starlette：`StreamingResponse` for SSE and `WebSocket` routes for duplex pushes. ([medium.com][4], [fastapi.tiangolo.com][5])

### 2.2  Minimal SSE endpoint

```python
# backend/api/stream.py
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from services.openai_service import OpenAIService
import json, asyncio

router = APIRouter(prefix="/stream", tags=["stream"])
ai = OpenAIService(...)

def format_sse(data: str) -> bytes:
    return f"data:{data}\n\n".encode()

@router.post("/")
async def stream_chat(payload: MessageCreate):
    async def gen():
        # include the new user message first
        yield format_sse(json.dumps({"role": "user", "delta": payload.content}))
        # ask OpenAI with streaming
        for chunk in ai.chat_completion_stream(
                [{"role": "user", "content": payload.content}],
                stream=True):
            delta = chunk["choices"][0]["delta"].get("content", "")
            if delta:
                yield format_sse(json.dumps({"role": "assistant", "delta": delta}))
            await asyncio.sleep(0)          # let event loop breathe
        yield format_sse("[DONE]")
    return StreamingResponse(gen(), media_type="text/event-stream")
```

> **Tip:** each SSE event ends with `\n\n` and the `Content-Type` must be `text/event-stream`. ([medium.com][4])

#### Forwarding OpenAI’s native stream

Your `OpenAIService` already wraps `chat_completion`. Add an async generator:

```python
def chat_completion_stream(self, messages, **kw):
    resp = self._client.chat.completions.create(
        model=self.default_model, messages=messages, stream=True, **kw)
    for chunk in resp:
        yield self._to_dict(chunk)          # preserves .choices[].delta
```

This pattern comes straight from OpenAI’s cookbook. ([cookbook.openai.com][1])

### 2.3  WebSocket variant (for audio later)

```python
@router.websocket("/ws")
async def ws_chat(ws: WebSocket):
    await ws.accept()
    while True:
        user_msg = await ws.receive_text()
        async for delta in ai.chat_completion_stream(
                [{"role":"user","content":user_msg}], stream=True):
            await ws.send_text(delta["choices"][0]["delta"].get("content",""))
```

WebSockets give you duplex channels for voice or cursor-presence. ([fastapi.tiangolo.com][5])

---

## 3  Frontend: React streaming hook

### 3.1  Install helpers

```bash
npm i eventsource-parser
```

The parser splits SSE frames coming from `fetch` so you don’t need the legacy `EventSource` object (handy when you must send a POST body). ([npmjs.com][6])

### 3.2  New hook `useStream`

```ts
import { createParser } from "eventsource-parser";

export function useStream() {
  const [partial, setPartial] = useState("");

  const sendStream = async (chatId: string, content: string) => {
    const resp = await fetch("/stream/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, content })
    });

    const reader = resp.body!.getReader();
    const decoder = new TextDecoder();
    const parser = createParser(event => {
      if (event.type === "event") {
        if (event.data === "[DONE]") return;
        const { role, delta } = JSON.parse(event.data);
        setPartial(prev => prev + delta);   // progressive render
      }
    });

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      parser.feed(decoder.decode(value));
    }
  };

  return { partial, sendStream };
}
```

Technique follows MDN’s `ReadableStream` usage pattern. ([developer.mozilla.org][7])

### 3.3  Integrate into your components

**ChatArea.tsx**

```diff
- const { messages, loadMessages, sendMessage } = useMessages();
+ const { messages, loadMessages, sendMessage } = useMessages();
+ const { partial, sendStream } = useStream();
...
- await sendMessage(activeChat.id, content);
- await loadMessages(activeChat.id);
+ await sendStream(activeChat.id, content);
...
<div className="flex-1 ...">
  {messages.map(m => <MessageBubble ... />)}
+ {partial && <MessageBubble message={{
+     id: "streaming",
+     chat_id: activeChat.id,
+     role: "assistant",
+     content: partial,
+     created_at: new Date().toISOString()
+ }} />}
</div>
```

Because you append the final assistant message only when `[DONE]` arrives, your existing `MessageBubble` stays unchanged.

### 3.4  Handling binary audio later

When you swap SSE for WebSocket you can pipe `Uint8Array` payloads into a `MediaSource` buffer or `AudioContext` for instantaneous speech playback. ([community.openai.com][8], [community.openai.com][9])

---

## 4  Hooks for Voice & Image Streaming

### 4.1  Voice (Text-to-Speech)

OpenAI’s TTS and the new real-time API deliver *chunk-encoded* MP3/PCM that you can feed incrementally to an `<audio>` element or Web Audio API. ([community.openai.com][10], [axios.com][11])

* Create a `/tts` SSE or WebSocket endpoint that streams base64-encoded chunks.
* On the client, convert base64 → ArrayBuffer → `audioCtx.decodeAudioData` and append to a `SourceBuffer`.

### 4.2  Image (Vision or progressive generation)

Current GPT-4o “vision” requests return a single blob, but OpenAI’s docs show future support for multi-part image deltas. You can prepare a placeholder SSE route that yields partial base64 PNGs and render them with `<img src="data:image/png;base64,..." />`. ([platform.openai.com][12])

---

## 5  Backward compatibility & rollout strategy

* **Feature flag** – keep `/messages/` for legacy clients; gate `/stream/` behind an env var.
* **Graceful fallback** – if `response.body` is undefined (React Native, some older browsers), fall back to non-stream POST. ([stackoverflow.com][13])
* **Error handling** – wrap your generator with `try/except` and send an `event: error` frame to client, letting the hook surface a toast.
* **Testing** – jest-mock `ReadableStream` and simulate `onChunk` events. There are React hooks published exactly for this use-case. ([github.com][14])

---

## 6  Putting It All Together

1. **Backend**: add `chat_completion_stream`, `/stream/` SSE route, optional `/ws` for duplex.
2. **Frontend**: create `useStream`, patch `ChatArea` to display `partial`, keep existing `useMessages` for history reload.
3. **UI/UX**: show “AI is typing…” until `[DONE]`, or animate the cursor.
4. **Extend**: reuse the same pattern for audio or image chunks.

By adopting StreamingResponse/SSE now, you cut perceived latency to near-token time, pave the way for multimodal features, and barely touch your domain models. Happy streaming! 🎧🖼️

---
ß