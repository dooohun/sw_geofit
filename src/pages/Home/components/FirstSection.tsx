import { useNavigate } from 'react-router-dom';
import SuggestionIcon from '@/assets/svgs/suggestion-icon.svg';
import RequestIcon from '@/assets/svgs/request-icon.svg';
import cmdImage from '@/assets/images/cmd-image.png';
import upImage from '@/assets/images/up-image.png';
import downImage from '@/assets/images/down-image.png';
import enterImage from '@/assets/images/enter-image.png';
import { useState } from 'react';

export default function FirstSection() {
  const [inputValue, setInputValue] = useState('서울시 강남구에 카페를 차리고 싶어');
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: 'rgba(221, 226, 238, 0.8)' }}>
      {/* Header */}
      <img src={cmdImage} className="absolute top-[250px] left-32 h-[250px] w-[250px]" />
      <img src={downImage} className="absolute top-[500px] left-24 h-[300px] w-[300px]" />
      <img src={enterImage} className="absolute top-[250px] right-24 h-[250px] w-[250px]" />
      <img src={upImage} className="absolute top-[500px] right-32 h-[250px] w-[250px]" />

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-6 py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Title */}
          <h1 className="font-semi mb-4 text-[72px] leading-tight font-bold tracking-[-3.38px] text-black">
            Analyze, Chat, Locate
            <br />
            All in One
          </h1>

          {/* Subtitle */}
          <p className="font-semi mb-16 text-[30px] tracking-[-2px] text-[#1A202C]">
            AI가 찾아주는 당신만의 완벽한 창업 공간
          </p>

          {/* Search Input Box */}
          <div className="mx-auto max-w-[520px]">
            <div className="shadow-input flex h-[145px] flex-col justify-between rounded-xl bg-white p-3 align-middle">
              {/* Input Text */}
              <input
                type="text"
                onChange={(e) => setInputValue(e.target.value)}
                className="mt-2 ml-1.5 text-left text-base font-medium text-gray-700 focus:outline-none"
                value={inputValue}
              />

              {/* Bottom Row with Icon and Button */}
              <div className="flex items-center justify-between">
                <button className="flex h-[42px] w-[170px] cursor-pointer items-center justify-between space-x-2 rounded-3xl border-[1px] border-[#E2E8F0] p-[14px] text-gray-500">
                  <SuggestionIcon />
                  <span className="text-sm text-[#1A202C]">New suggestion</span>
                </button>
                <button
                  className="flex cursor-pointer items-center space-x-2 rounded-3xl bg-black px-6 py-2 text-white transition-colors hover:bg-gray-800"
                  onClick={() => navigate(`/chatbot?query=${inputValue}`)}
                >
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
}
