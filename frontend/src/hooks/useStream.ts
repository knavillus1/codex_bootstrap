import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser';
import { baseUrl } from '../services/api';

export async function sendStream(
  chatId: string,
  content: string,
  onMessage: (data: string) => void,
  onDone?: () => void,
): Promise<void> {
  const resp = await fetch(`${baseUrl}/stream/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, content }),
  });

  if (!resp.body) {
    // Fallback to standard messages endpoint
    await fetch(`${baseUrl}/messages/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, role: 'user', content }),
    });
    return;
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  const parser = createParser((event: ParsedEvent | ReconnectInterval) => {
    if (event.type === 'event') {
      if (event.event === 'done') {
        onDone?.();
      } else {
        onMessage(event.data);
      }
    }
  });

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    parser.feed(decoder.decode(value));
  }
}

export default function useStream() {
  return { sendStream };
}
