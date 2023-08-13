export interface Chat {
  sessionStatus: undefined | boolean;
  sessionId: null | string;
  chatHistory: CompletionData[];
}

export interface Completion {
  id: string;
  message: ChatContext;
}

export interface CompletionData {
  id: string;
  created: number;
  message: ChatContext;
  sessionId: null | string;
}

export interface ChatContext {
  role: string;
  content: string;
}