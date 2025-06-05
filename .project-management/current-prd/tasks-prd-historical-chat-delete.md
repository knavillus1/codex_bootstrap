## Pre-Feature Development Project Tree
```
/Users/kevinsullivan/code/codex_bootstrap
├── .codex
│   └── install.sh
├── .project-management
│   ├── archive-prd
│   ├── closed-prd
│   ├── current-prd
│   └── tasks
├── backend
│   ├── api
│   │   ├── chat.py
│   │   ├── files.py
│   │   ├── messages.py
│   │   └── stream.py
│   ├── data
│   ├── models
│   │   ├── chat.py
│   │   └── message.py
│   ├── services
│   │   ├── chat_storage.py
│   │   ├── file_service.py
│   │   └── openai_service.py
│   ├── tests
│   ├── config.py
│   ├── main.py
│   └── requirements.txt
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── ChatArea.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── hooks
│   │   │   ├── useChat.ts
│   │   │   └── useMessages.ts
│   │   ├── services
│   │   │   └── api.ts
│   │   ├── types
│   │   │   ├── chat.ts
│   │   │   └── message.ts
│   │   └── App.tsx
│   └── package.json
└── dev_init.sh
```

## Relevant Files

### Proposed New Files
- `frontend/src/components/ChatManagementMenu.tsx` - Three-dot dropdown menu component for individual chat items with Delete and Rename options.
- `frontend/src/components/ChatManagementMenu.test.tsx` - Unit tests for ChatManagementMenu component.
- `frontend/src/components/ChatListItem.tsx` - Individual chat item component with hover effects and menu integration.
- `frontend/src/components/ChatListItem.test.tsx` - Unit tests for ChatListItem component.
- `backend/tests/test_chat_delete_integration.py` - Integration test covering chat deletion end-to-end.

### Existing Files Modified
- `frontend/src/components/Sidebar.tsx` - Update to use new ChatListItem components and handle chat list rendering with management capabilities.
- `frontend/src/App.tsx` - Pass delete handler prop to Sidebar.
- `frontend/src/hooks/useChat.ts` - Add delete chat functionality and state management.
- `frontend/src/services/api.ts` - Add API call for deleting chats.
- `backend/api/chat.py` - Add DELETE endpoint with active chat validation and proper error handling.
- `backend/services/chat_storage.py` - Add delete_chat method to handle chat removal from storage.
- `backend/tests/test_chat_api.py` - Add tests for delete chat endpoint including active chat restriction.
- `frontend/src/__tests__/hooks/useChat.test.ts` - Add tests for delete chat functionality.
- `backend/api/__init__.py` - Fix unused import lint error.
- `backend/tests/test_stream_endpoint.py` - Adjust assertion for streaming output.
- `api/chat.py` - Ensure newline at end of file for linting.

### Notes

- Unit tests should be placed alongside the code files they are testing.
- The feature requires full-stack implementation covering both frontend UI interactions and backend data persistence.
- Active chat protection must be implemented to prevent deletion of currently open conversations.
- Hover effects and visual feedback are crucial for user experience according to the PRD.
- The "Rename" functionality is a placeholder and should be visually present but non-functional.

## Tasks

- [x] 1.0 Implement Backend Chat Deletion API
  - [x] 1.1 Add delete_chat method to ChatStorage service in `backend/services/chat_storage.py` to remove chat files from data directory
  - [x] 1.2 Create DELETE `/api/chats/{chat_id}` endpoint in `backend/api/chat.py` with validation to prevent active chat deletion
  - [x] 1.3 Add error handling for non-existent chat IDs and proper HTTP status codes (404, 403, 200)
  - [x] 1.4 Update FastAPI route registration in `backend/main.py` to include the new DELETE endpoint

- [x] 2.0 Create Frontend Chat Management UI Components
  - [x] 2.1 Create `ChatManagementMenu.tsx` component with three-dot icon trigger and dropdown menu containing Delete and Rename options
  - [x] 2.2 Implement proper menu positioning, styling, and click-outside-to-close functionality in ChatManagementMenu
  - [x] 2.3 Create `ChatListItem.tsx` component with hover effects (background color change) and integration with ChatManagementMenu
  - [x] 2.4 Add appropriate icons for Delete (trash can) and Rename (pencil/edit) options using existing icon library or create SVG components
  - [x] 2.5 Implement visual state management for hover effects and menu visibility in ChatListItem

 - [x] 3.0 Integrate Chat List with Management Capabilities
  - [x] 3.1 Refactor `Sidebar.tsx` to use new ChatListItem components instead of direct chat rendering
  - [x] 3.2 Pass necessary props (chat data, active chat ID, delete handler) to ChatListItem components
  - [x] 3.3 Implement active chat detection logic to disable/hide delete option for currently open chat
  - [x] 3.4 Add empty state handling when all chats are deleted (display "No chats available" message)

 - [x] 4.0 Implement Frontend Delete Functionality and State Management
  - [x] 4.1 Add deleteChat function to `useChat.ts` hook that calls API and updates local state
  - [x] 4.2 Implement optimistic UI updates that immediately remove chat from list before API confirmation
  - [x] 4.3 Add error handling and rollback mechanism if delete API call fails
  - [x] 4.4 Create deleteChat API function in `frontend/src/services/api.ts` for DELETE requests
  - [x] 4.5 Ensure chat list re-renders correctly after deletion and active chat remains unchanged (if not deleted)

- [x] 5.0 Add Comprehensive Testing Coverage
  - [x] 5.1 Write unit tests for ChatManagementMenu component covering menu open/close, option clicks, and prop handling
  - [x] 5.2 Write unit tests for ChatListItem component covering hover states, menu integration, and active chat detection
  - [x] 5.3 Add tests to existing `useChat.test.ts` for deleteChat functionality, error handling, and state updates
  - [x] 5.4 Write backend API tests in `test_chat_api.py` for DELETE endpoint including success, failure, and validation scenarios
  - [x] 5.5 Add integration tests verifying end-to-end chat deletion flow from UI interaction to backend storage removal

*End of document*
