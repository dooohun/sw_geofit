export interface ChatbotSessionResponse {
  id: number,
  title: string,
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