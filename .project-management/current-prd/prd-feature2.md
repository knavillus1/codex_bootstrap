*PLACEHOLDER FILE*Okay, here's a Product Requirements Document (PRD) for the chat application, outlining its features, technical specifications, and goals.

---

## Product Requirements Document: "Contextual AI Chat"

**Document Version:** 1.0
**Last Updated:** October 26, 2023
**Owner:** AI Initiatives Team

**1. Introduction**

Contextual AI Chat is a web-based application designed to provide users with an interactive chat experience, similar to ChatGPT. Users can engage in conversations, start new chat sessions, and upload files (photos or documents) to provide context or receive information about them. The application will leverage a React+Vite frontend, a FastAPI backend, and the OpenAI API for generating intelligent responses. Chat history will be persisted for each user session or identified user (if authentication is added later).

**2. Goals & Objectives**

*   **Primary Goal:** Develop a functional and intuitive chat application that allows users to interact with an AI model (via OpenAI API).
*   **User Experience:** Provide a clean, responsive, and user-friendly interface based on the provided color palette.
*   **Functionality:**
    *   Enable users to send text messages and receive AI-generated responses.
    *   Allow users to upload images and files, which can be referenced or analyzed in the chat.
    *   Persist chat history, allowing users to revisit previous conversations.
    *   Allow users to start new, distinct chat sessions.
*   **Technical:**
    *   Implement a robust backend using FastAPI.
    *   Utilize React+Vite for a modern and efficient frontend.
    *   Integrate seamlessly with the OpenAI Chat Completions API.
    *   Store chat history in a simple, file-based JSON database on the backend.

**3. Target Audience**

*   General users looking for quick information or AI-powered assistance.
*   Developers or content creators needing a tool for brainstorming or drafting.
*   Users who need to discuss or get information related to specific uploaded documents or images.

**4. User Stories**

*   **US-001:** As a user, I want to see a clean and inviting chat interface so I can easily start interacting.
*   **US-002:** As a user, I want to be able to type a message in an input field and send it to the AI.
*   **US-003:** As a user, I want to see my sent messages and the AI's responses displayed clearly in a chronological chat log.
*   **US-004:** As a user, I want to be able to start a new chat session to discuss a different topic, keeping my previous chats separate.
*   **US-005:** As a user, I want to see a list of my previous chat sessions in a sidebar so I can easily access them.
*   **US-006:** As a user, I want to be able to click on a historical chat to load and continue that conversation.
*   **US-007:** As a user, I want to be able to upload an image (e.g., JPG, PNG) to the chat.
*   **US-008:** As a user, I want to be able to upload a document file (e.g., PDF, TXT, DOCX) to the chat.
*   **US-009:** As a user, I want the AI to acknowledge my file upload and potentially use its content in the conversation (if supported by the AI model).
*   **US-010:** As a user, I want to see a preview of an uploaded image within the chat message.
*   **US-011:** As a user, I want to see the filename of an uploaded document within the chat message.
*   **US-012:** As a user, I want the interface to use the specified color palette: `#A4CCD9`, `#C4E1E6`, `#EBFFD8`, `rgb(141, 188, 199)`, `rgb(164, 204, 217)`, `rgb(196, 225, 230)`, `rgb(235, 255, 216)`.

**5. Functional Requirements**

**5.1. Frontend (React + Vite)**

*   **FR-001: Main Layout**
    *   A two-column layout:
        *   Left Sidebar: For "New Chat" button and list of historical chats.
        *   Main Chat Area: For displaying chat messages and the message input bar.
*   **FR-002: New Chat Initiation**
    *   A "New Chat" button in the sidebar.
    *   Clicking "New Chat" will:
        *   Clear the current chat message display.
        *   Signal the backend to prepare for a new chat session (potentially generating a new chat ID).
        *   Optionally display a default greeting from the AI in the new chat.
*   **FR-003: Message Input & Sending**
    *   A textarea for users to type messages.
    *   A "Send" button.
    *   Pressing "Enter" (without Shift) in the textarea should also send the message.
    *   Sent messages are immediately displayed in the chat area with a "user" designation.
    *   The message content (and any file info) is sent to the backend API.
*   **FR-004: Message Display**
    *   User messages and AI responses are displayed as distinct bubbles.
    *   Messages appear chronologically, with the newest at the bottom.
    *   The chat area should be scrollable.
    *   Visual distinction between user messages and AI messages (e.g., alignment, background color).
*   **FR-005: File Upload**
    *   A "Upload File/Photo" button (e.g., paperclip icon) near the message input.
    *   Clicking it opens a system file dialog.
    *   Supported image types: PNG, JPG, JPEG, GIF.
    *   Supported document types: PDF, TXT, DOC, DOCX, CSV.
    *   Upon selection:
        *   For images: Display a small thumbnail preview in the message composition area or as part of the sent message.
        *   For documents: Display the filename.
        *   The file (or its reference/content) is sent to the backend along with the text message.
*   **FR-006: Chat History Display**
    *   The left sidebar lists titles of historical chats.
    *   The title could be the first few words of the user's first message or a timestamp.
    *   The currently active chat should be visually highlighted in the list.
*   **FR-007: Loading Historical Chats**
    *   Clicking on a chat title in the history list will:
        *   Fetch the full conversation for that chat ID from the backend.
        *   Display the fetched messages in the main chat area.
*   **FR-008: Styling**
    *   The UI must adhere to the specified color palette:
        *   Primary Dark: `#A4CCD9` (rgb(164, 204, 217))
        *   Primary Medium: `#C4E1E6` (rgb(196, 225, 230))
        *   Accent: `#EBFFD8` (rgb(235, 255, 216))
        *   Secondary Dark: `rgb(141, 188, 199)`
*   **FR-009: Loading/Thinking Indicator**
    *   Display a visual indicator (e.g., "AI is thinking...") while waiting for a response from the backend.
*   **FR-010: Error Handling**
    *   Display user-friendly error messages if API calls fail or other issues occur (e.g., "Failed to send message," "Could not load chat history").

**5.2. Backend (FastAPI)**

*   **FR-B001: API Endpoint for Chat Interaction (`/api/v1/chat`)**
    *   Method: `POST`
    *   Request Payload:
        *   `message`: (string) User's text message.
        *   `chat_id`: (string, optional) ID of an existing chat to continue. If null/absent, a new chat is initiated.
        *   `file_data`: (object, optional) Information about an uploaded file.
            *   `filename`: (string) Original name of the file.
            *   `file_type`: (string) MIME type of the file.
            *   `content`: (string, base64 encoded for images/small files, or a reference for larger files) File content or URL.
    *   Processing:
        1.  If `chat_id` is provided, load the existing chat history.
        2.  If `file_data` is present, process it (e.g., save temporarily, prepare for OpenAI).
        3.  Construct the appropriate prompt/message list for the OpenAI API, including history and new message/file context.
        4.  Call the OpenAI Chat Completions API.
        5.  Receive the AI's response.
        6.  Append the user message and AI response (and file info) to the chat's JSON history.
        7.  Save the updated chat JSON file.
    *   Response Payload:
        *   `chat_id`: (string) ID of the current (new or existing) chat.
        *   `response_message`: (object) AI's response message (structure similar to user messages).
        *   `full_chat_history` (array, optional): The complete updated list of messages for the chat.
*   **FR-B002: API Endpoint for Listing Chat Histories (`/api/v1/chats`)**
    *   Method: `GET`
    *   Processing:
        1.  Scan the chat storage directory.
        2.  For each chat JSON file, extract metadata (chat ID, title, last updated timestamp).
    *   Response Payload:
        *   Array of chat metadata objects: `[ { "chat_id": "...", "title": "...", "last_updated": "..." }, ... ]`
*   **FR-B003: API Endpoint for Retrieving a Specific Chat (`/api/v1/chats/{chat_id}`)**
    *   Method: `GET`
    *   Path Parameter: `chat_id`
    *   Processing:
        1.  Locate and read the JSON file corresponding to `chat_id`.
    *   Response Payload:
        *   The full chat object (as stored in the JSON file).
*   **FR-B004: OpenAI API Integration**
    *   Securely manage and use the OpenAI API key.
    *   Utilize the `gpt-3.5-turbo` or `gpt-4` (if available/budgeted) models via the Chat Completions endpoint.
    *   Format messages according to OpenAI's required structure (`role`: "user" / "assistant" / "system", `content`).
    *   Handle potential file inputs (e.g., for vision-capable models, pass image URLs/base64; for text files, include content in the prompt).
*   **FR-B005: Chat History Storage**
    *   Each chat conversation will be stored as a single monolithic JSON file.
    *   Filename convention: `<chat_id>.json` (e.g., `chat_1678886400000.json`).
    *   Files will be stored in a designated directory on the server (e.g., `./chat_store/`).
    *   The JSON structure will be defined in Section 7 (Data Model).
*   **FR-B006: File Handling**
    *   Receive uploaded files from the frontend.
    *   Small files/images might be passed as base64 to OpenAI directly if supported.
    *   Larger files might be stored temporarily on the server. The backend could then:
        *   Extract text content (for documents) to include in the OpenAI prompt.
        *   For images with vision models: provide a URL or base64 encoded data.
        *   Simply acknowledge the file if direct processing by OpenAI isn't feasible for its type, and store a reference in the chat JSON.
    *   Implement a mechanism for cleaning up temporary files.
*   **FR-B007: Error Handling & Logging**
    *   Implement robust error handling for API calls, file operations, and OpenAI interactions.
    *   Return appropriate HTTP status codes and error messages to the frontend.
    *   Basic logging for debugging and monitoring.

**6. Non-Functional Requirements**

*   **NFR-001: Performance:**
    *   Frontend should load quickly.
    *   AI response times are dependent on OpenAI, but the application should feel responsive otherwise. Aim for backend processing (excluding OpenAI call) < 500ms.
*   **NFR-002: Scalability:**
    *   The file-based JSON DB is suitable for single-user or very low-concurrency. For wider use, a proper database would be needed. (Out of scope for this version, but good to note).
*   **NFR-003: Usability:**
    *   The interface must be intuitive and easy to navigate.
    *   Clear visual cues for actions and states.
*   **NFR-004: Security:**
    *   OpenAI API key must be stored securely on the backend and not exposed to the frontend.
    *   Basic input sanitization on the backend to prevent common injection attacks (though primary risk is with OpenAI prompt injection).
    *   If temporary file storage is used, ensure proper access controls and cleanup.
*   **NFR-005: Maintainability:**
    *   Well-structured, commented code in both frontend and backend.
    *   Use of environment variables for configuration (e.g., API keys, storage paths).
*   **NFR-006: Browser Compatibility:**
    *   Support latest versions of major browsers (Chrome, Firefox, Safari, Edge).

**7. Data Model (Chat JSON File Structure)**

Each `chat_<id>.json` file will contain an object with the following structure:

```json
{
  "chat_id": "string_unique_identifier", // e.g., "chat_20231026103000_randomstr"
  "title": "string", // e.g., "Discussion about project X", or first few words of user's message
  "created_at": "ISO8601_timestamp_string",
  "last_updated_at": "ISO8601_timestamp_string",
  "messages": [
    {
      "id": "string_unique_message_id", // e.g., "msg_20231026103005_randomstr"
      "role": "user" | "assistant" | "system", // 'assistant' for AI responses
      "content": "string_text_of_the_message",
      "timestamp": "ISO8601_timestamp_string",
      "attachment": { // Optional
        "filename": "string_original_filename",
        "file_type": "string_mime_type",
        "size_bytes": "number",
        // For images sent to OpenAI vision models, this might include:
        // "url": "string_url_to_image_if_temp_stored_or_base64_data_url"
        // For other files, this is primarily for record-keeping.
      }
    }
    // ... more messages
  ]
}
```

**8. Technical Stack Summary**

*   **Frontend:** React (with Vite), JavaScript/TypeScript, HTML, CSS
*   **Backend:** FastAPI (Python)
*   **AI Integration:** OpenAI API (Chat Completions)
*   **Database:** File system (JSON files) for chat history.
*   **Deployment (Conceptual):** Could be containerized (Docker) for easier deployment.

**9. API Design (High-Level Summary)**

*   `POST /api/v1/chat`: Send message, get AI response, update/create chat.
*   `GET /api/v1/chats`: List all available chat histories (metadata).
*   `GET /api/v1/chats/{chat_id}`: Retrieve the full message history for a specific chat.
    *   (Optional: `POST /api/v1/upload`: Separate endpoint for file uploads if pre-processing is complex before sending to `/chat` endpoint. For simplicity, initial implementation might bundle file data with the `/chat` request.)

**10. Future Considerations / Out of Scope (for V1)**

*   User authentication and per-user chat history.
*   Real-time collaboration / multi-user chats.
*   Streaming AI responses for better perceived performance.
*   Advanced file processing (e.g., OCR for images, semantic search within documents).
*   More robust database solution (e.g., PostgreSQL, MongoDB).
*   Admin interface for managing chats or users.
*   In-app editing/deletion of messages or chats.
*   Rate limiting and advanced security measures.
*   Support for different AI models or providers.

**11. Success Metrics (for V1)**

*   Successful completion of core user stories (sending messages, viewing history, uploading files).
*   Stability: Minimal crashes or unhandled errors.
*   User Feedback: Positive initial feedback on usability and functionality.
*   Number of chat sessions created.
*   Average messages per session.

---

This PRD provides a solid foundation for developing the "Contextual AI Chat" application. It can be further iterated upon as development progresses and new insights are gained.