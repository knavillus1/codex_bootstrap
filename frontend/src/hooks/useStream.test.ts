import { describe, expect, it, vi } from 'vitest';
import { sendStream } from './useStream';

// Mock fetch
const fetchMock = vi.fn();
(global as any).fetch = fetchMock;

const encoder = new TextEncoder();

describe('sendStream', () => {
  it('falls back to /messages/ when body is undefined', async () => {
    fetchMock.mockResolvedValueOnce({ body: undefined });
    fetchMock.mockResolvedValueOnce({});
    await sendStream('1', 'hi', () => {});
    expect(fetchMock.mock.calls[1][0]).toContain('/messages/');
  });

  it('parses stream events', async () => {
    const chunks = [
      encoder.encode('event: message\ndata: a\n\n'),
      encoder.encode('event: done\ndata: [DONE]\n\n'),
    ];
    fetchMock.mockResolvedValueOnce({
      body: {
        getReader() {
          let i = 0;
          return {
            read() {
              if (i < chunks.length) {
                return Promise.resolve({ value: chunks[i++], done: false });
              }
              return Promise.resolve({ value: undefined, done: true });
            },
          };
        },
      },
    });

    const msgs: string[] = [];
    await sendStream('1', 'hi', d => msgs.push(d));
    expect(msgs).toEqual(['a']);
  });
});
