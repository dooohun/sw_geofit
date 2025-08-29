import { Suspense } from 'react';
import { useCreateChatSession, useGetChatSession } from '../queries';
import { useNavigate, useParams } from 'react-router-dom';

interface SidebarComponentProps {
  sidebarOpen: boolean;
}

const SidebarComponent = ({ sidebarOpen }: SidebarComponentProps) => {
  const { data: analysisHistory } = useGetChatSession();
  const { mutateAsync: createChatSession } = useCreateChatSession();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleCreateSession = async () => {
    try {
      const newSession = await createChatSession();
      navigate(`/chatbot/${newSession.id}`);
    } catch (error) {
      console.error('Error creating chat session:', error);
    }
  };
  return (
    <div
      className={`${sidebarOpen ? 'w-64' : 'w-0'} flex flex-col overflow-hidden border-r border-gray-200 bg-[#F7F7F8] transition-all duration-300 ease-in-out`}
    >
      <div className="p-4">
        <button
          className="flex w-full items-center justify-center space-x-2 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          onClick={handleCreateSession}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>새 분석 시작</span>
        </button>
      </div>

      <div className="flex-1 px-4 pb-4">
        <div className="mb-3 text-xs font-medium text-gray-500">최근 분석</div>

        <div className="space-y-1">
          {analysisHistory.map((history) => (
            <button
              onClick={() => navigate(`/chatbot/${history.id}`)}
              key={history.id}
              className={`w-full cursor-pointer rounded-lg p-3 text-start transition-colors hover:bg-gray-200 ${history.id === Number(id) ? 'bg-gray-200' : ''}`}
            >
              <div className="truncate text-sm text-gray-900">{history.title}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
            <span className="text-sm font-medium text-white">김</span>
          </div>
          <div className="text-sm font-medium text-gray-900">김창업</div>
        </div>
      </div>
    </div>
  );
};

export default function Sidebar({ sidebarOpen }: SidebarComponentProps) {
  return (
    <Suspense fallback={null}>
      <SidebarComponent sidebarOpen={sidebarOpen} />
    </Suspense>
  );
}
