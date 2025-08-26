import { Suspense } from 'react';
import { useCreateChatSession, useGetChatSession } from '../queries';
import { useNavigate, useParams } from 'react-router-dom';

const SidebarComponent = () => {
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
    <div className="h-screen w-64 border-r border-gray-300 bg-white p-4 shadow-sm">
      <div className="mb-6">
        <h2 className="mb-4 text-lg font-bold text-gray-800">창업 분석 AI</h2>
        <button
          onClick={handleCreateSession}
          className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          + 새 분석 시작
        </button>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-600">최근 분석</h3>
        <div className="space-y-2">
          {analysisHistory.map((analysis, index) => (
            <button
              key={index}
              className={`w-full rounded-lg p-2 text-left text-sm transition-colors ${
                analysis.id === (id ? parseInt(id) : -1)
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => navigate(`/chatbot/${analysis.id}`)}
            >
              {analysis.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Sidebar() {
  return (
    <Suspense fallback={null}>
      <SidebarComponent />
    </Suspense>
  );
}
