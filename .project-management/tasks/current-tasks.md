## Relevant Files

- `frontend/src/components/Calculator.tsx` - Main React component for the calculator UI and logic.
- `frontend/src/components/Calculator.test.tsx` - Unit tests for the Calculator component.
- `backend/calculator.py` - Backend logic for performing calculations (if backend calculation is required).
- `backend/calculator.test.py` - Unit tests for backend calculation logic.
- `.gitignore` - Git configuration to exclude local dependencies from version control.
- `frontend/src/index.js` - Placeholder file to satisfy the lint configuration.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `Calculator.tsx` and `Calculator.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [ ] 1.0 Set up project structure for the calculator demo
  - [x] 1.1 Create `frontend/src/components/Calculator.tsx` for the calculator UI
  - [ ] 1.2 Create `backend/calculator.py` for backend calculation logic (if needed)
  - [ ] 1.3 Ensure frontend and backend are connected (if backend is used)
- [ ] 2.0 Implement the Calculator UI component
  - [ ] 2.1 Add input fields for two numbers
  - [ ] 2.2 Add buttons or a dropdown to select operation (add, subtract, multiply, divide)
  - [ ] 2.3 Add a button to perform the calculation
  - [ ] 2.4 Display the result to the user
- [ ] 3.0 Implement calculation logic (frontend and/or backend)
  - [ ] 3.1 Implement calculation logic in the frontend (if backend is not required)
  - [ ] 3.2 Implement calculation logic in the backend (if backend is used)
  - [ ] 3.3 Connect frontend to backend API for calculations (if backend is used)
- [ ] 4.0 Handle error cases (e.g., division by zero)
  - [ ] 4.1 Detect division by zero and display an error message
  - [ ] 4.2 Validate user input (ensure both inputs are numbers)
- [ ] 5.0 Write unit tests for calculator functionality
  - [ ] 5.1 Write tests for Calculator UI component (`Calculator.test.tsx`)
  - [ ] 5.2 Write tests for calculation logic (frontend and/or backend)
  - [ ] 5.3 Write tests for error handling (e.g., division by zero)
