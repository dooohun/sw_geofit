// components/ChatInterface.tsx
import { useState, useEffect, useRef } from 'react';
import ChatBubble from '@/pages/Chatbot/components/ChatBubble';
import LoadingIndicator from '@/components/LoadingIndicator';
import Sidebar from '@/pages/Chatbot/components/Sidebar';
import { useGetMessages, usePostMessage } from './queries';
import { useParams } from 'react-router-dom';

export default function ChatBot() {
  const [inputValue, setInputValue] = useState('');
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();

  const sessionId = id ? parseInt(id) : 0;
  const { data: chatbotMessage, isLoading} = useGetMessages(sessionId);
  const { mutate: postMessage, isPending } = usePostMessage(sessionId, {
    onSuccess: () => {
      // 성공 시 pending 메시지 제거
      setPendingMessage(null);
    },
    onError: () => {
      // 에러 시에도 pending 메시지 제거 (또는 에러 처리)
      setPendingMessage(null);
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatbotMessage, pendingMessage]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || isPending || isLoading) return;

    const messageToSend = inputValue.trim();
    
    // pending 메시지 설정 (전송 중에 보여줄 메시지)
    setPendingMessage(messageToSend);
    
    // 실제 메시지 전송
    postMessage(messageToSend);
    
    // 입력 필드 초기화
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-300 px-6 py-4 shadow-sm">
          <h1 className="text-xl font-bold text-gray-800">수원시 영통구 치킨집 분석</h1>
          <p className="text-sm text-gray-500">AI 기반 창업 입지 분석 상담</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            {chatbotMessage.messages.map((message) => (
              <ChatBubble key={message.id} message={message.content} isBot={!message.isUser} />
            ))}
            
            {/* Pending 메시지 표시 (전송 중인 사용자 메시지) */}
            {pendingMessage && (
              <ChatBubble
                message={pendingMessage} 
                isBot={false}
              />
            )}
            
            {/* 로딩 인디케이터 (AI 응답 대기 중) */}
            {isPending && <LoadingIndicator />}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="bg-white border-t border-gray-300 p-4 shadow-sm">
          <div className="max-w-4xl mx-auto flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="궁금한 점이나 요구사항을 입력해주세요"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading || isPending}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || isPending || !inputValue.trim()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isPending ? '전송 중...' : '전송'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};