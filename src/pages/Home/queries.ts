import { chatbotApi } from "@/api/chatbot"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"

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
    queryFn: () => chatbotApi.getMessages(sessionId),
  });
}

export const useCreateChatSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createChatSession'],
    mutationFn: () => chatbotApi.createSession(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatbotSession']});
    }
  })
}

export const usePostMessage = (sessionId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['postMessage', sessionId],
    mutationFn: (message: string) => chatbotApi.postMessage(sessionId, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', sessionId]});
    }
  })
}