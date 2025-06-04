import type { Message } from './message';

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
}
