import { Link, useNavigate } from "react-router-dom";
import SuggestionIcon from '@/assets/suggestion-icon.svg';
import RequestIcon from '@/assets/request-icon.svg';
import cmdImage from '@/assets/images/cmd-image.png';
import upImage from '@/assets/images/up-image.png';
import downImage from '@/assets/images/down-image.png';
import enterImage from '@/assets/images/enter-image.png';

export default function FirstSection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: 'rgba(221, 226, 238, 0.8)' }}>
      {/* Header */}
      <img src={cmdImage} className="w-[250px] h-[250px] absolute top-[250px] left-32" />
      <img src={downImage} className="w-[300px] h-[300px] absolute top-[500px] left-24" />
      <img src={enterImage} className="w-[250px] h-[250px] absolute top-[250px] right-24" />
      <img src={upImage} className="w-[250px] h-[250px] absolute top-[500px] right-32" />
      <header className="flex items-center justify-between px-6 py-4">
        <div className="text-xl font-bold text-black font-semi">
          Geo-Fit
        </div>
        <nav className="flex items-center space-x-8">
          <Link to="chatbot/new" className="text-black hover:text-gray-700 transition-colors">
            AI 채팅
          </Link>
          <Link to="property-registration" className="text-black hover:text-gray-700 transition-colors">
            매물 등록
          </Link>
          <Link to="property-search" className="text-black hover:text-gray-700 transition-colors">
            매물 조회
          </Link>
          <Link to="guide" className="text-black hover:text-gray-700 transition-colors">
            이용 가이드
          </Link>
          <button className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition-colors w-[160px] h-10" onClick={() => navigate("chatbot/new")}>
            시작하기
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-6 py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-[72px] font-bold text-black mb-4 leading-tight font-semi tracking-[-3.38px]">
            Analyze, Chat, Locate<br />
            All in One
          </h1>
          
          {/* Subtitle */}
          <p className="text-[30px] text-[#1A202C] mb-16 font-semi tracking-[-2px]">
            AI가 찾아주는 당신만의 완벽한 창업 공간
          </p>

          {/* Search Input Box */}
          <div className="max-w-[520px] mx-auto">
            <div className="flex flex-col align-middle justify-between bg-white rounded-xl p-3 h-[145px] shadow-input">
              {/* Input Text */}
              <div className="text-left text-gray-700 text-base ml-1.5 mt-2 font-medium">
                서울시 강남구에 카페를 차리고 싶어
              </div>
              
              {/* Bottom Row with Icon and Button */}
              <div className="flex items-center justify-between">
                <button className="flex justify-between border-[1px] h-[42px] rounded-3xl p-[14px] border-[#E2E8F0] items-center space-x-2 text-gray-500 w-[170px] cursor-pointer">
                  <SuggestionIcon />
                  <span className="text-sm text-[#1A202C]">New suggestion</span>
                </button>
                <button className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors flex items-center space-x-2 rounded-3xl cursor-pointer" onClick={() => navigate('/chatbot/new')}>
                  <RequestIcon />
                  <span>Request</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};