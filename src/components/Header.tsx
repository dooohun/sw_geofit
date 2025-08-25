import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="header-fade sticky top-0 z-50 flex items-center justify-between bg-transparent px-6 py-4 backdrop-blur-md">
      <div className="font-semi text-xl font-bold text-black">Geo-Fit</div>
      <nav className="flex items-center space-x-8">
        <Link to="chatbot/new" className="text-black transition-colors hover:text-gray-700">
          AI 채팅
        </Link>
        <Link to="property-registration" className="text-black transition-colors hover:text-gray-700">
          매물 등록
        </Link>
        <Link to="property-search" className="text-black transition-colors hover:text-gray-700">
          매물 조회
        </Link>
        <Link to="guide" className="text-black transition-colors hover:text-gray-700">
          이용 가이드
        </Link>
        <button
          className="h-10 w-[160px] rounded-xl bg-black px-6 py-2 text-white transition-colors hover:bg-gray-800"
          onClick={() => navigate('chatbot/new')}
        >
          시작하기
        </button>
      </nav>
    </header>
  );
}
