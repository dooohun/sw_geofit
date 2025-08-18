export interface ChatbotSessionResponse {
  id: number,
  title: string,
}

export interface CreateChatBotSessionResponse {
  id: number;
  title: string;
}

export interface ChatMessageResponse {
  id: number;
  isUser: boolean;
  content: string;
}