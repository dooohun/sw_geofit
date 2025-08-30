export interface ChatbotSessionResponse {
  id: number;
  title: string;
}

export interface CreateChatBotSessionResponse {
  id: number;
  title: string;
}

interface ChatMessage {
  id: number;
  content: string;
  isUser: boolean;
}

export interface ChatMessageResponse {
  messages: ChatMessage[];
}

export interface PostMessageResponse {
  type: 'COLLECT' | 'RESULT' | 'POLICY' | 'EVALUATION';
  content: string;
  ids?: number[];
}
