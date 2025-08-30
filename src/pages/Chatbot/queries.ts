import { chatbotApi } from '@/api/chatbot';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

export const useGetChatSession = () => {
  return useSuspenseQuery({
    queryKey: ['chatbotSession'],
    queryFn: () => chatbotApi.getSession(),
    select: (data) => data.sort((a, b) => b.id - a.id),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetMessages = (sessionId: number) => {
  return useSuspenseQuery({
    queryKey: ['messages', sessionId],
    queryFn: () => chatbotApi.getMessages(sessionId),
  });
};

export const useCreateChatSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createChatSession'],
    mutationFn: () => chatbotApi.createSession(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatbotSession'] });
    },
  });
};

export const usePostMessage = (options?: { onSuccess?: () => void; onError?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['postMessage'],
    mutationFn: ({ sessionId, message }: { sessionId: number; message: string }) =>
      chatbotApi.postMessage(sessionId, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['messages'] });
      }, 1500);

      options?.onSuccess?.();
    },
    onError: () => {
      options?.onError?.();
    },
    retry: false,
  });
};
