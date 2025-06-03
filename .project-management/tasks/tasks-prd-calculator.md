## Project Tree
```
AGENTS.md
CHANGELOG.md
dev_init.sh
DEVELOPMENT.md
README.md
run_tests.sh
backend/
  requirements.txt
frontend/
  eslint.config.js
  package.json
```

## Relevant Files

- `frontend/Calculator.tsx` - Main React component for the calculator UI and logic.
- `frontend/Calculator.test.tsx` - Unit tests for the calculator component.
- `frontend/App.tsx` - Entry point for the frontend app; may need to import and render the calculator.
- `frontend/App.test.tsx` - Unit tests for the app entry point.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `Calculator.tsx` and `Calculator.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [ ] 1.0 Set up Calculator component structure
  - [ ] 1.1 Create `frontend/Calculator.tsx` file.
  - [ ] 1.2 Define a functional React component named `Calculator`.
  - [ ] 1.3 Add initial JSX structure: two input fields, operation selector, result display area, and error message area.
  - [ ] 1.4 Export the component for use in `App.tsx`.
- [ ] 2.0 Implement calculator input and operation logic
  - [ ] 2.1 Add state for input values, selected operation, result, and error message.
  - [ ] 2.2 Implement handlers for input changes and operation selection.
  - [ ] 2.3 Implement calculation logic for add, subtract, multiply, and divide.
  - [ ] 2.4 Validate inputs to ensure they are numbers.
- [ ] 3.0 Implement result display and error handling
  - [ ] 3.1 Display calculation result after user submits input.
  - [ ] 3.2 Display error message for invalid input or division by zero.
  - [ ] 3.3 Clear error message when inputs are corrected.
- [ ] 4.0 Add minimal styling for clarity
  - [ ] 4.1 Add basic CSS styles inline or in a separate file for layout and readability.
  - [ ] 4.2 Ensure UI is clear and easy to use.
- [ ] 5.0 Write unit tests for calculator functionality
  - [ ] 5.1 Create `frontend/Calculator.test.tsx` file.
  - [ ] 5.2 Write tests for each operation (add, subtract, multiply, divide).
  - [ ] 5.3 Write tests for input validation and error handling.
  - [ ] 5.4 Ensure all tests pass using `npx jest`.
