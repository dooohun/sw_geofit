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
    }
    catch (error) {
      console.error("Error creating chat session:", error);
    }
  }
  return (
    <div className="w-64 bg-white h-screen p-4 border-r border-gray-300 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">창업 분석 AI</h2>
        <button
          onClick={handleCreateSession}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          + 새 분석 시작
        </button>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-3">최근 분석</h3>
        <div className="space-y-2">
          {analysisHistory.map((analysis, index) => (
            <button
              key={index}
              className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${
                analysis.id === (id ? parseInt(id) : 0)
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
  )
}