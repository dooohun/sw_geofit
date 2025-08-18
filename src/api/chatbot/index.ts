import { apiClient } from "..";
import { type ChatbotSessionResponse, type CreateChatBotSessionResponse } from "./entity";

export const chatbotApi = {
  getSession: async () => await apiClient.get<ChatbotSessionResponse[]>('chatbot/session'),
  getMessages: async (sessionId: number) => await apiClient.get(`chatbot/${sessionId}`),
  createSession: async () => await apiClient.post<CreateChatBotSessionResponse>('chatbot/session')
}