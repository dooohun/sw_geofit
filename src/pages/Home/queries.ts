import { chatbotApi } from "@/api/chatbot"
import { useMutation, useSuspenseQuery } from "@tanstack/react-query"

export const useGetChatSession = () => {
  return useSuspenseQuery({
    queryKey: ['chatbotSession'],
    queryFn: () => chatbotApi.getSession(),
    select: (data) => data.sort((a, b) => b.id - a.id)
  })
}

export const useGetMessages = (sessionId: number) => {
  return useSuspenseQuery({
    queryKey: ['messages', sessionId],
    queryFn: () => chatbotApi.getMessages(sessionId)
  });
}

export const useCreateChatSession = () => {
  return useMutation({
    mutationKey: ['createChatSession'],
    mutationFn: () => chatbotApi.createSession()
  })
}