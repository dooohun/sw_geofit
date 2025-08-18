import { apiClient } from "..";
import { type ChatbotSessionResponse, type ChatMessageResponse, type CreateChatBotSessionResponse } from "./entity";

export const chatbotApi = {
  getSession: async () => await apiClient.get<ChatbotSessionResponse[]>('chatbot/session'),
  getMessages: async (sessionId: number) => await apiClient.get<ChatMessageResponse[]>(`chatbot/${sessionId}`),
  createSession: async () => await apiClient.post<CreateChatBotSessionResponse>('chatbot/session'),
  postMessage: async (sessionId: number, message: string) => await apiClient.post(`chatbot/${sessionId}`, {
    body: {
      content: message
    }
  })
}