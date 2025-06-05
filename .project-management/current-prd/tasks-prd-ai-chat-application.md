# Tasks: AI Chat Application

## Pre-Feature Development Project Tree
```
/Users/kevinsullivan/code/codex_bootstrap
├── AGENTS.md
├── CHANGELOG.md
├── DEVELOPMENT.md
├── LICENSE
├── README.md
├── backend
│   └── requirements.txt
├── dev_init.sh
├── frontend
│   ├── eslint.config.js
│   └── package.json
└── run_tests.sh
```

## Relevant Files

### Proposed New Files
- `backend/main.py` - FastAPI application entry point and server configuration
- `backend/config.py` - Environment configuration and settings
- `backend/api/__init__.py` - Package initialization for API module
- `backend/models/__init__.py` - Package initialization for models module
- `backend/services/__init__.py` - Package initialization for services module
- `backend/tests/__init__.py` - Package initialization for tests module
- `backend/tests/test_health.py` - Unit test for health check endpoint
- `.env.template` - Example environment configuration file
- `backend/models/chat.py` - Pydantic models for chat data structures
- `backend/models/message.py` - Pydantic models for message and file data structures  
- `backend/api/chat.py` - API endpoints for chat operations (create, get, list)
- `backend/api/messages.py` - API endpoints for message operations and AI responses
- `backend/api/files.py` - API endpoints for file upload and processing
- `backend/services/openai_service.py` - OpenAI API integration and response handling
- `backend/services/file_service.py` - File processing and validation service
- `backend/services/chat_storage.py` - JSON-based chat persistence service
- `backend/tests/test_chat_api.py` - Unit tests for chat API endpoints
- `backend/tests/test_openai_service.py` - Unit tests for OpenAI service
 - `backend/tests/test_chat_storage.py` - Unit tests for chat storage and metadata
- `backend/tests/test_file_service.py` - Unit tests for file service
- `backend/tests/test_status.py` - Unit test for status endpoint
- `backend/tests/test_files_api.py` - Unit test for file API endpoint
- `backend/tests/test_file_integration.py` - Integration test for file upload and message attachment
- `frontend/src/main.tsx` - React application entry point
- `frontend/src/App.tsx` - Main application component with layout
- `frontend/src/components/Sidebar.tsx` - Chat history sidebar component
- `frontend/src/components/ChatArea.tsx` - Main chat interface component
- `frontend/src/components/MessageBubble.tsx` - Individual message display component
- `frontend/src/components/FileUpload.tsx` - File upload interface component
- `frontend/src/components/ChatInput.tsx` - Message input with file attachment
- `frontend/src/hooks/useChat.ts` - Custom hook for chat state management
- `frontend/src/hooks/useMessages.ts` - Custom hook for message operations
- `frontend/src/services/api.ts` - API client for backend communication
- `frontend/src/types/chat.ts` - TypeScript interfaces for chat data with metadata
- `frontend/src/types/message.ts` - TypeScript interfaces for message data
- `frontend/src/utils/fileUtils.ts` - File handling utility functions
- `frontend/src/styles/globals.css` - Global styles, color variables, and custom scrollbar
- `frontend/src/utils/dateUtils.ts` - Timestamp formatting utilities
- `frontend/index.html` - HTML entry point
- `frontend/vite.config.ts` - Vite build configuration
- `frontend/tailwind.config.js` - Tailwind CSS configuration
 - `frontend/tsconfig.json` - TypeScript configuration
- `frontend/src/placeholder.js` - Placeholder file to satisfy ESLint
- `frontend/src/__tests__/components/ChatArea.test.tsx` - Unit tests for chat area
- `frontend/src/__tests__/hooks/useChat.test.ts` - Unit tests for chat hook
- `frontend/src/__tests__/hooks/useMessages.test.ts` - Unit tests for messages hook
- `frontend/src/__tests__/utils/dateUtils.test.ts` - Unit tests for timestamp formatting utility

### Existing Files Modified
- `frontend/package.json` - Add React, Vite, Tailwind CSS, and testing dependencies
- `backend/requirements.txt` - Add FastAPI, OpenAI, file processing dependencies
- `dev_init.sh` - Add setup commands for both frontend and backend development
- `.codex/install.sh` - Add environment setup for Codex agent (if needed)
- `CHANGELOG.md` - Record of repository changes
- `DEVELOPMENT.md` - Local development instructions
- `backend/main.py` - Add status endpoint
- `backend/models/__init__.py` - Export chat and message models
 - `run_tests.sh` - Run backend and frontend tests with default OPENAI_API_KEY
- `frontend/src/styles/globals.css` - Global styles, color variables, and custom scrollbar
- `frontend/tailwind.config.js` - Tailwind CSS configuration
- `backend/api/chat.py` - Add CRUD chat endpoints
- `backend/services/chat_storage.py` - Add create, delete, sorted list, and metadata updates
- `backend/tests/test_chat_api.py` - Tests for chat API endpoints
- `backend/api/messages.py` - Message creation and list endpoints, add file URL handling
- `backend/tests/test_messages_api.py` - Tests for message API endpoints
- `backend/tests/test_file_integration.py` - Integration tests for file uploads and messages, and file URLs
- `backend/models/chat.py` - Chat data model with metadata fields
- `.project-management/current-prd/tasks-prd-ai-chat-application.md` - Task list for the AI chat feature
- `backend/services/openai_service.py` - OpenAI model configuration and error handling
- `backend/config.py` - Add OPENAI_MODEL setting
- `.env.template` - Example environment configuration with model variable
- `backend/tests/test_openai_service.py` - Unit tests for OpenAI service
- `backend/api/files.py` - API endpoints for file upload and processing
- `frontend/src/components/Sidebar.tsx` - Chat history sidebar component
- `frontend/src/components/ChatInput.tsx` - Message input with file attachment
- `frontend/src/components/FileUpload.tsx` - File upload interface component
- `frontend/src/components/ChatArea.tsx` - Main chat interface component
- `frontend/src/App.tsx` - Responsive layout for mobile/desktop
- `frontend/src/types/message.ts` - Message interface with timestamps in snake_case
- `frontend/src/types/chat.ts` - Chat interface with timestamps in snake_case
- `frontend/src/components/MessageBubble.tsx` - Display message timestamps correctly
- `frontend/src/utils/dateUtils.ts` - Handle invalid timestamps gracefully
- `frontend/src/__tests__/components/ChatArea.test.tsx` - Updated for new Chat fields
- `frontend/src/__tests__/hooks/useChat.test.ts` - Updated for new Chat fields

### Notes

- The design mockup at `/Users/kevinsullivan/code/codex_bootstrap/.project-management/current-prd/prd-background/design-mock.html` provides the complete visual reference
- Color palette must strictly follow: #A4CCD9, #C4E1E6, #EBFFD8, rgb(141, 188, 199)
- OpenAI API integration requires streaming responses for real-time chat experience
- File storage uses JSON format on backend filesystem for chat persistence
- Vision capabilities needed for image analysis using OpenAI vision models
- Responsive design must work across desktop and mobile devices

## Tasks

- [x] 1.0 Project Setup and Environment Configuration
  - [x] 1.1 Create backend directory structure (api/, models/, services/, tests/)
  - [x] 1.2 Initialize FastAPI project with main.py and basic configuration
  - [x] 1.3 Set up frontend Vite + React + TypeScript project structure
  - [x] 1.4 Configure Tailwind CSS with custom color palette variables
  - [x] 1.5 Create environment configuration files (.env.example, config.py)
  - [x] 1.6 Update dev_init.sh script for full project initialization
  - [x] 1.7 Set up OpenAI API key configuration and validation
  - [x] 1.8 Create basic CORS configuration for frontend-backend communication

- [x] 2.0 Backend API Foundation and Core Services
  - [x] 2.1 Create Pydantic models for Chat, Message, and File data structures
  - [x] 2.2 Implement chat storage service using JSON file persistence
  - [x] 2.3 Create OpenAI service wrapper with error handling and retry logic
  - [x] 2.4 Set up file service for upload validation and processing
  - [x] 2.5 Create base API router structure and exception handlers
  - [x] 2.6 Implement health check and API status endpoints
  - [x] 2.7 Add logging configuration and request/response middleware
  - [x] 2.8 Configure uvicorn server settings and hot reload

- [x] 3.0 Frontend React Application Foundation
- [x] 3.1 Set up React 18 with TypeScript and strict mode configuration
  - [x] 3.2 Create TypeScript interfaces for Chat, Message, and File types
  - [x] 3.3 Implement API service client with fetch wrapper and error handling
  - [x] 3.4 Set up React Router for future navigation (if needed)
  - [x] 3.5 Create custom hooks for chat state management (useChat, useMessages)
  - [x] 3.6 Implement file utility functions for validation and preview
  - [x] 3.7 Set up global CSS with design system color variables
  - [x] 3.8 Configure ESLint and TypeScript for code quality

- [x] 4.0 Chat Management System Implementation
  - [x] 4.1 Implement backend API endpoints for chat CRUD operations
  - [x] 4.2 Create chat list retrieval with proper sorting (newest first)
  - [x] 4.3 Implement new chat creation with auto-generated titles
  - [x] 4.4 Add chat loading and switching functionality
  - [x] 4.5 Create chat deletion endpoint and confirmation flow
  - [x] 4.6 Implement chat title generation based on first message
  - [x] 4.7 Add chat metadata (creation date, message count, last activity)
  - [x] 4.8 Create frontend chat history sidebar with active chat highlighting
  - [x] 4.9 Fix duplicate exception handling in delete chat endpoint

- [ ] 5.0 Message System with AI Integration
  - [x] 5.1 Create message API endpoints for sending and retrieving messages
  - [x] 5.2 Implement OpenAI GPT integration with proper model selection
  - [ ] 5.3 Add streaming response support for real-time AI responses
  - [x] 5.4 Create message persistence in chat JSON files
  - [x] 5.5 Implement message display with user/AI distinction
  - [x] 5.6 Add "AI is thinking" indicators and loading states
  - [x] 5.7 Handle OpenAI API errors and rate limiting gracefully
  - [x] 5.8 Implement message timestamp and formatting
  - [x] 5.9 Fix Invalid Date display by ensuring all messages and chats have valid timestamp fields and are correctly formatted in the frontend.  Protect from regression with unit tests.
  - [x] 5.10 Integrate OpenAI response generation in message creation endpoint - modify create_message to call OpenAI service after storing user message, generate AI response, and store assistant message with proper error handling and conversation context
  - [x] 5.11 Fix file upload integration with messages - modify message creation to accept file attachments, store file references in message JSON, and ensure uploaded files are properly linked to messages instead of being orphaned uploads

- [x] 6.0 File Upload and Processing System
  - [x] 6.1 Create file upload API endpoint with size and type validation
  - [x] 6.4 Create file storage system with organized directory structure
  - [x] 6.6 Add file attachment UI with drag-and-drop support

- [x] 7.0 User Interface Implementation with Design System
  - [x] 7.1 Create main App component with sidebar + chat area layout
  - [x] 7.2 Implement Sidebar component with chat history and new chat button
  - [x] 7.3 Build ChatArea component with message display and input
  - [x] 7.4 Create MessageBubble component with user/AI styling distinction
  - [x] 7.5 Implement ChatInput component with auto-resizing textarea
  - [x] 7.6 Add FileUpload component with paperclip button integration
  - [x] 7.7 Apply exact color palette from design mockup (#A4CCD9, #C4E1E6, #EBFFD8)
  - [x] 7.8 Implement responsive design for mobile and desktop views
  - [x] 7.9 Add hover effects and interactive states for all buttons
  - [x] 7.10 Create custom scrollbar styling to match design mockup
```
5 Real-time streaming

5.1 Python streaming loop
from openai import OpenAI
client = OpenAI()

stream = client.responses.create(
    model="gpt-4o",
    input=[{"role": "user", "content": "Write a haiku about winter mountains."}],
    stream=True,
)
tokens = []
for event in stream:                     # event is a dataclass
    if event.type == "text.delta":       # text fragment
        tokens.append(event.delta)
        print(event.delta, end="", flush=True)

full_text = "".join(tokens)
Each event comes with a type field (text.delta, tool.call, done, …).
The generator closes automatically when a done event is emitted.
Python’s iterator consumes SSE frames under the hood, keeping your code synchronous and back-pressure-friendly
community.openai.com
.

5.2 TypeScript streaming with for await
import OpenAI from "openai";
const client = new OpenAI();

const stream = await client.responses.create({
  model: "gpt-4o",
  input: [{ role: "user", content: "Generate a limerick about llamas." }],
  stream: true,
});

let final = "";
for await (const event of stream) {
  if (event.type === "text.delta") {
    process.stdout.write(event.delta);
    final += event.delta;
  }
}
The Node SDK exposes the response body as an async iterator over parsed events, sparing you from manual SSE parsing
github.com
. For browsers, use fetch with ReadableStream and parse data: lines yourself if you cannot rely on the SDK (see cookbook pattern)
github.com
stackoverflow.com
.

6 Event anatomy

type	What you get	Typical use
text.delta	Single token / phrase	Real-time UI updates
text.completed	Final assembled text	Post-process / log
tool.call	Arguments for a tool	Trigger external function
done	Stream ended (checksum, usage stats)	Cleanup
Full JSON schemas are in the reference docs
platform.openai.com
.

7 Error handling & retries

Network timeouts – wrap the iterator in a try/except (AbortController in JS) and reconnect quietly; the thread history remains server-side
platform.openai.com
.
Rate limits / 429 – exponential back-off plus jitter; respect Retry-After header.
Context overflow – send shorter inputs or resume using the prior response_id instead of resending the entire chat.
8 Best-practice checklist for smooth UX

Flush early – write partial tokens to STDOUT / WebSocket so the user sees first text in < 300 ms.
Debounce re-renders on the client by 16–32 ms to avoid layout thrash.
Keep-alive pings every 20 s if you tunnel through Nginx or API-gateways that cut idle SSE.
Chunk aggregation – build tokens[] and join once at done to avoid string-concat O(n²).
Server-sent compression – enable gzip but disable chunked encoding at proxy layer.
These patterns mirror recommendations in community deep dives and guides
thenewstack.io
january.sh
.

9 Appendix: TypeScript helper typings

type ResponseStreamEvent =
  | { type: "text.delta"; delta: string }
  | { type: "text.completed"; text: string }
  | { type: "tool.call"; name: string; arguments: unknown }
  | { type: "done" };

declare module "openai" {
  interface Stream<T = ResponseStreamEvent> extends AsyncIterable<T> {}
}
Using these discriminated unions lets the compiler narrow each branch inside your for await loop for safer code.
```
- [ ] 8.0 Real-time Features and Streaming
  - [ ] 8.1 Implement Server-Sent Events (SSE) for streaming AI responses
  - [ ] 8.2 Create frontend streaming response handler and display
  - [ ] 8.3 Add real-time typing indicators during AI response generation
  - [x] 8.4 Implement auto-scroll to newest messages functionality
  - [ ] 8.5 Add WebSocket support for future real-time features (optional)
  - [ ] 8.6 Handle streaming interruption and reconnection scenarios
  - [ ] 8.7 Optimize streaming performance for large responses
  - [ ] 8.8 Add streaming progress indicators and cancel functionality

- [ ] 9.0 Testing and Quality Assurance
  - [x] 9.1 Write unit tests for all backend API endpoints
  - [x] 9.2 Create tests for OpenAI service integration with mocking
  - [x] 9.3 Add frontend component tests using React Testing Library
  - [x] 9.4 Test custom hooks (useChat, useMessages) with proper mocking
  - [x] 9.5 Implement integration tests for file upload and processing
  - [ ] 9.6 Add end-to-end tests for complete chat flow
  - [x] 9.7 Test error handling scenarios and edge cases
  - [ ] 9.8 Perform cross-browser compatibility testing
  - [ ] 9.9 Test responsive design on various screen sizes
  - [ ] 9.10 Validate API rate limiting and error recovery

- [ ] 10.0 Final Integration and Deployment Preparation
  - [ ] 10.1 Complete frontend-backend integration testing
  - [ ] 10.2 Optimize build process and bundle size for production
  - [ ] 10.3 Add environment-specific configuration management
  - [ ] 10.4 Create production Docker configurations (optional)
  - [ ] 10.5 Implement proper error logging and monitoring setup
  - [ ] 10.6 Add API documentation with OpenAPI/Swagger
  - [ ] 10.7 Perform security audit and vulnerability assessment
  - [ ] 10.8 Create deployment scripts and documentation
  - [ ] 10.9 Set up CI/CD pipeline configuration (optional)
  - [ ] 10.10 Final user acceptance testing and performance optimization

*End of document*
