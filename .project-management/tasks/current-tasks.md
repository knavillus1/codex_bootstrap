## Project Tree
```
.
├── AGENTS.md
├── CHANGELOG.md
├── DEVELOPMENT.md
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

- `frontend/Calculator.js` - Main React component for the calculator UI and logic.
- `frontend/Calculator.test.js` - Unit tests for the calculator component.
- `frontend/App.js` - Entry point for the frontend app, may need to integrate the calculator.
- `frontend/App.test.js` - Unit tests for the app entry point.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `Calculator.js` and `Calculator.test.js` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [ ] 1.0 Create Calculator UI
  - [ ] 1.1 Set up a new `Calculator.js` file in the `frontend` directory.
  - [ ] 1.2 Add two input fields for user numbers.
  - [ ] 1.3 Add operation selector (dropdown or buttons) for add, subtract, multiply, divide.
  - [ ] 1.4 Add a button to perform the calculation.
  - [ ] 1.5 Add a display area for the result and error messages.
- [ ] 2.0 Implement Calculator Logic
  - [ ] 2.1 Write functions to perform each arithmetic operation.
  - [ ] 2.2 Connect input fields and operation selector to component state.
  - [ ] 2.3 Update result display when calculation is performed.
- [ ] 3.0 Handle Input Validation and Errors
  - [ ] 3.1 Validate that both inputs are numbers before calculation.
  - [ ] 3.2 Handle division by zero and display an appropriate error message.
  - [ ] 3.3 Display error messages for invalid input.
- [ ] 4.0 Integrate Calculator into App
  - [ ] 4.1 Import and render `Calculator` in `App.js`.
  - [ ] 4.2 Ensure the calculator is visible and functional in the main app view.
- [ ] 5.0 Write Unit Tests
  - [ ] 5.1 Create `Calculator.test.js` for component and logic tests.
  - [ ] 5.2 Test all arithmetic operations, including edge cases (e.g., division by zero).
  - [ ] 5.3 Test input validation and error handling.
  - [ ] 5.4 (Optional) Add tests for integration in `App.test.js`.
