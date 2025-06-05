import { formatTimestamp } from '../../utils/dateUtils';

describe('formatTimestamp', () => {
  it('returns formatted date for valid iso string', () => {
    const iso = '2024-01-01T00:00:00Z';
    const formatted = formatTimestamp(iso);
    expect(formatted).not.toEqual('');
    expect(formatted).not.toMatch(/Invalid Date/);
  });

  it('returns empty string for invalid input', () => {
    const formatted = formatTimestamp(undefined as unknown as string);
    expect(formatted).toBe('');
  });
});
