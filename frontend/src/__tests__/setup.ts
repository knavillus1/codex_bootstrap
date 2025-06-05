import '@testing-library/jest-dom';

// Mock scrollIntoView as it's not implemented in jsdom
Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
  value: vi.fn(),
  writable: true,
});
