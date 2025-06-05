import type { Message } from './message';

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  created_at: string;
  message_count: number;
  last_activity: string;
}
