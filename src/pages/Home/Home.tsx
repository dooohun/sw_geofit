// components/ChatInterface.tsx
import { useState, useEffect, useRef } from 'react';
import ChatBubble from '@/pages/Home/components/ChatBubble';
import LoadingIndicator from '@/components/LoadingIndicator';
import Sidebar from '@/pages/Home/components/Sidebar';
import { useGetMessages, usePostMessage } from './queries';
import { useParams } from 'react-router-dom';

const ChatInterface = () => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();


  const { data: chatbotMessage, isLoading } = useGetMessages(id ? parseInt(id) : 0);
  const { mutate: postMessage } = usePostMessage(id ? parseInt(id) : 0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatbotMessage]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    postMessage(inputValue);
    setInputValue('');
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
            {chatbotMessage.map((message) => (
              <ChatBubble key={message.id} message={message.content} isBot={!message.isUser} />
            ))}
            {isLoading && <LoadingIndicator />}
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
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="궁금한 점이나 요구사항을 입력해주세요"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              전송
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;