## Relevant Files

- `frontend/Calculator.tsx` - Main React component for the calculator UI and logic.
- `frontend/Calculator.test.tsx` - Unit tests for the calculator component.
- `frontend/App.tsx` - Entry point for the frontend app; may need to import and render the calculator.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `Calculator.tsx` and `Calculator.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [ ] 1.0 Set up Calculator Component
  - [ ] 1.1 Create `frontend/Calculator.tsx` file.
  - [ ] 1.2 Set up a functional React component skeleton.
  - [ ] 1.3 Export the Calculator component for use in `App.tsx`.
- [ ] 2.0 Implement Basic Calculator Logic
  - [ ] 2.1 Add state for two input numbers and the selected operation.
  - [ ] 2.2 Implement functions for addition, subtraction, multiplication, and division.
  - [ ] 2.3 Add logic to compute and display the result.
- [ ] 3.0 Build Minimal Calculator UI
  - [ ] 3.1 Add input fields for two numbers.
  - [ ] 3.2 Add buttons or a dropdown to select the operation.
  - [ ] 3.3 Add a button to perform the calculation and display the result.
  - [ ] 3.4 Add a button to clear/reset the calculator.
- [ ] 4.0 Handle Edge Cases and Errors
  - [ ] 4.1 Prevent calculation if inputs are invalid (e.g., empty or non-numeric).
  - [ ] 4.2 Handle division by zero gracefully (show an error message).
- [ ] 5.0 Write Unit Tests for Calculator
  - [ ] 5.1 Create `frontend/Calculator.test.tsx` file.
  - [ ] 5.2 Write tests for each operation (add, subtract, multiply, divide).
  - [ ] 5.3 Write tests for error handling (e.g., division by zero, invalid input).
  - [ ] 5.4 Ensure all tests pass using `npx jest`.
