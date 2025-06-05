## Pre-Feature Development Project Tree
- backend/
  - api/stream.py
  - services/openai_service.py
- frontend/
  - hooks/useMessages.ts
  - components/ChatArea.tsx
  - package.json
- .project-management/current-prd/prd-real-time-streaming.md

## Relevant Files
- backend/api/stream.py - SSE endpoint for streaming responses
- backend/services/openai_service.py - OpenAI service for chat completions
- backend/tests/test_stream_endpoint.py - tests for streaming endpoint
- backend/tests/test_openai_service_stream.py - tests for OpenAI streaming
- backend/config.py - application configuration with feature flag
- backend/api/__init__.py - includes stream router when enabled
- frontend/hooks/useMessages.ts - existing hook for sending messages
- frontend/components/ChatArea.tsx - chat UI component
- frontend/package.json - frontend dependencies

### Proposed New Files
- frontend/src/hooks/useStream.ts - React hook for consuming SSE streams
- frontend/src/hooks/useStream.test.ts - Unit tests for the `useStream` hook
- backend/tests/test_stream_endpoint.py - backend tests for streaming route
- backend/tests/test_openai_service_stream.py - backend tests for OpenAI stream

### Existing Files Modified
- backend/api/stream.py - add `/stream/` SSE route implementation
- backend/services/openai_service.py - implement `chat_completion_stream` generator
- frontend/components/ChatArea.tsx - integrate streaming via `useStream`
- frontend/package.json - add `eventsource-parser` dependency
- run_tests.sh - ensure dependencies installed for tests
- frontend/src/services/api.ts - expose API base URL for streaming hook

### Notes
- Update `dev_init.sh` to install new frontend and backend dependencies
- Add unit tests in `tests/` or `__tests__` for backend and frontend changes
- Ensure CORS/middleware support for `text/event-stream`

## Tasks
- [x] 1.0 Implement Backend Streaming Endpoint
  - [x] 1.1 Define `format_sse` helper in `backend/api/stream.py`.
  - [x] 1.2 Add POST `/stream/` route in `backend/api/stream.py` returning `StreamingResponse` with `text/event-stream`.
  - [x] 1.3 Create unit tests for `/stream/` endpoint in `tests/test_stream_endpoint.py`.

- [x] 2.0 Enhance OpenAIService with Streaming Method
  - [x] 2.1 Implement `async def chat_completion_stream` in `backend/services/openai_service.py`.
  - [x] 2.2 Add unit tests for `chat_completion_stream` in `tests/test_openai_service_stream.py`.

- [x] 3.0 Add Feature Flag and Fallback Logic
  - [x] 3.1 Introduce `FEATURE_STREAMING` env var in `config.py`.
  - [x] 3.2 Guard `/stream/` route activation in `backend/api/stream.py` with the feature flag.
  - [x] 3.3 Implement client-side fallback to `/messages/` in `frontend/src/hooks/useStream.ts` when `response.body` is undefined.

- [x] 4.0 Create Frontend `useStream` Hook
  - [x] 4.1 Create `frontend/src/hooks/useStream.ts` with SSE parsing logic using `eventsource-parser`.
  - [x] 4.2 Install `eventsource-parser` and update `frontend/package.json`.
  - [x] 4.3 Write unit tests in `frontend/src/hooks/useStream.test.ts` using Vitest.

- [x] 5.0 Integrate Streaming into `ChatArea` Component
  - [x] 5.1 Import and use `useStream` in `frontend/src/components/ChatArea.tsx`.
  - [x] 5.2 Replace `sendMessage` with `sendStream` invocation.
  - [x] 5.3 Render `partial` token stream in a new or existing `<MessageBubble>` component.
  - [x] 5.4 Add "AI is typing…" indicator before first token and auto-scroll behavior.
