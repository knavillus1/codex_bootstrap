export type MessageContentPart = string | { type: string; image_url: string };

export interface File {
  filename: string;
  content_type: string;
  url?: string;
}

export interface Message {
  id: string;
  chat_id: string;
  role: 'user' | 'assistant';
  content: string | MessageContentPart[];
  file?: File;
  created_at: string;
}
