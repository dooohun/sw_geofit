import { useState } from 'react';
import RequestIcon from '@/assets/svgs/request-icon.svg';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useCreateChatSession, usePostMessage } from '../queries';

export default function ChatBotHome() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [inputValue, setInputValue] = useState(query);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const { mutate: createChatSession } = useCreateChatSession();
  const { mutate: postMessage } = usePostMessage();

  const handleSend = () => {
    if (inputValue.trim()) {
      setInputValue('');
      createChatSession(undefined, {
        onSuccess: (newSession) => {
          postMessage({ sessionId: newSession.id, message: inputValue });
          navigate(`/chatbot/${newSession.id}`);
        },
      });
    }
  };

  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} />
      {/* Main Content */}
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

        {/* Chat Messages Area */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-8">
          <div className="w-full max-w-3xl">
            {/* Welcome Message */}
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-2xl font-semibold text-gray-900">오늘의 어떤 창업 입지 분석을 도와드릴까요?</h1>
              <p className="text-gray-600">창업하고 싶은 업종과 지역을 자연스럽게 말씀해주세요</p>
            </div>
          </div>
        </div>

        {/* Input Area */}
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
                onClick={handleSend}
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
