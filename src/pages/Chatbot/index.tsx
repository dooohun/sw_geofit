// components/ChatInterface.tsx
import { useState, useEffect, useRef } from 'react';
import ChatBubble from '@/pages/Chatbot/components/ChatBubble';
import LoadingIndicator from '@/components/LoadingIndicator';
import Sidebar from '@/pages/Chatbot/components/Sidebar';
import { useGetMessages, usePostMessage } from './queries';
import { Link, useParams } from 'react-router-dom';
import RequestIcon from '@/assets/svgs/request-icon.svg';

export default function ChatBot() {
  const [inputValue, setInputValue] = useState('');
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();

  const sessionId = id ? parseInt(id) : 0;
  const { data: chatbotMessage, isLoading } = useGetMessages(sessionId);
  const { mutate: postMessage, isPending } = usePostMessage(sessionId, {
    onSuccess: () => {
      // 성공 시 pending 메시지 제거
      setPendingMessage(null);
      setInputValue('');
    },
    onError: () => {
      // 에러 시에도 pending 메시지 제거 (또는 에러 처리)
      setPendingMessage(null);
      setInputValue('');
    },
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
    setInputValue('');
    setPendingMessage(messageToSend);
    postMessage(messageToSend);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <Sidebar sidebarOpen={sidebarOpen} />

      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Sidebar Toggle Button */}
              <button
                onClick={toggleSidebar}
                className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                aria-label="Toggle sidebar"
              >
                <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <Link to="/" className="text-xl font-bold text-black">
                Geo-Fit
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/chatbot" className="text-gray-600 transition-colors hover:text-gray-800">
                AI 채팅
              </Link>
              <Link to="/property-registration" className="text-gray-600 transition-colors hover:text-gray-800">
                매물 등록
              </Link>
              <Link to="/property-search" className="text-gray-600 transition-colors hover:text-gray-800">
                매물 조회
              </Link>
              <Link to="/guide" className="text-gray-600 transition-colors hover:text-gray-800">
                이용 가이드
              </Link>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-4xl">
            {chatbotMessage.messages.map((message) => (
              <ChatBubble key={message.id} message={message.content} isBot={!message.isUser} />
            ))}

            {/* Pending 메시지 표시 (전송 중인 사용자 메시지) */}
            {pendingMessage && <ChatBubble message={pendingMessage} isBot={false} />}

            {/* 로딩 인디케이터 (AI 응답 대기 중) */}
            {isPending && <LoadingIndicator />}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-6">
          <div className="mx-auto max-w-4xl">
            <div className="relative flex justify-between gap-4">
              <div className="relative flex-1">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="추가 정보이나 요청사항을 입력해주세요"
                  className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 pr-12 text-sm focus:border-gray-400 focus:ring-0 focus:outline-none"
                  rows={1}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="flex h-[46px] w-[46px] items-center justify-center rounded-lg bg-black p-3 text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                <RequestIcon />
              </button>
            </div>

            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">Geo-Fit은 실수할 수 있습니다. 중요한 정보는 재검토하세요.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
