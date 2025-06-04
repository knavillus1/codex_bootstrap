export interface File {
  filename: string;
  contentType: string;
  url?: string;
}

export interface Message {
  id: string;
  chatId: string;
  role: 'user' | 'assistant';
  content: string;
  file?: File;
  createdAt: string;
}
