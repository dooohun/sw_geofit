import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SuggestionIcon from '@/assets/svgs/suggestion-icon.svg';
import RequestIcon from '@/assets/svgs/request-icon.svg';
import cmdImage from '@/assets/images/cmd-image.png';
import upImage from '@/assets/images/up-image.png';
import downImage from '@/assets/images/down-image.png';
import enterImage from '@/assets/images/enter-image.png';

interface FirstSectionProps {
  secondSectionRef: React.RefObject<HTMLDivElement | null>;
  secondSectionTitleRef: React.RefObject<HTMLDivElement | null>;
  isVideoPlaying: boolean;
  setIsVideoPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FirstSection({
  secondSectionRef,
  secondSectionTitleRef,
  isVideoPlaying,
  setIsVideoPlaying,
}: FirstSectionProps) {
  const [inputValue, setInputValue] = useState('');
  const [isCompact, setIsCompact] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // FirstSection observer (compact 모드 전환용)
    const secondSectionTitleObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsCompact(entry.isIntersecting);
      },
      {
        threshold: 0,
      },
    );

    const secondSectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // SecondSection이 보이기 시작하면 input 숨김
        setIsVideoPlaying(entry.isIntersecting);
      },
      {
        threshold: 0.1, // 10% 보이면 트리거
        rootMargin: '0px 0px -50px 0px',
      },
    );

    if (secondSectionRef.current) {
      secondSectionObserver.observe(secondSectionRef.current);
    }

    if (secondSectionTitleRef.current) {
      secondSectionTitleObserver.observe(secondSectionTitleRef.current);
    }

    return () => {
      secondSectionTitleObserver.disconnect();
      secondSectionObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div className="relative min-h-screen" style={{ backgroundColor: 'rgba(221, 226, 238, 0.8)' }}>
        <img src={cmdImage} className={`absolute top-[250px] left-[7%] h-[250px] w-[250px]`} />
        <img src={downImage} className={`absolute top-[500px] left-[5%] h-[300px] w-[300px]`} />
        <img src={enterImage} className={`absolute top-[250px] right-[5%] h-[250px] w-[250px]`} />
        <img src={upImage} className={`absolute top-[500px] right-[7%] h-[250px] w-[250px]`} />

        {/* Main Content */}
        <main className="flex flex-col items-center justify-center px-6 py-32">
          <div
            className={`mx-auto max-w-4xl text-center duration-700 ease-out ${
              isCompact ? 'scale-95 transform opacity-20' : 'scale-100 transform opacity-100'
            }`}
          >
            {/* Main Title */}
            <h1 className="font-semi mb-4 text-[72px] leading-tight font-bold tracking-[-3.38px] text-black">
              Chat, Locate, Analyze
              <br />
              All in One
            </h1>

            {/* Subtitle */}
            <p className="font-semi mb-16 text-[30px] tracking-[-2px] text-[#1A202C]">
              AI가 찾아주는 당신만의 완벽한 창업 공간
            </p>
          </div>

          <div
            className={`mx-auto w-[520px] transition-[height,opacity,transform] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              isCompact ? 'fixed top-1/2 left-1/2 z-50 max-w-[600px] -translate-x-1/2' : 'relative'
            } ${isVideoPlaying ? 'pointer-events-none opacity-0' : 'translate-y-0 opacity-100'}`}
          >
            <div
              className={`shadow-input flex justify-between rounded-xl bg-white p-3 transition-[height] duration-700 ${
                isCompact
                  ? 'h-[60px] items-center rounded-full border border-gray-100 px-4 shadow-lg'
                  : 'shadow-input h-[145px] flex-col'
              } hover:shadow-xl ${isCompact ? 'hover:scale-[1.02]' : 'hover:scale-[1.01]'}`}
            >
              {/* Input Text */}
              <input
                type="text"
                onChange={(e) => setInputValue(e.target.value)}
                className={`text- text-left text-base font-medium text-gray-700 opacity-50 focus:outline-none ${
                  isCompact ? 'flex-1 px-2' : 'mt-2 ml-1.5'
                }`}
                value={inputValue}
                placeholder="세종시 조치원읍에 카페를 차리고 싶어."
              />

              {/* Bottom Row - Compact 모드에서는 버튼만 */}
              {isCompact ? (
                <button
                  className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black text-white hover:scale-105 hover:bg-gray-800"
                  onClick={() => navigate(`/chatbot/?query=${inputValue}`)}
                >
                  <RequestIcon className="h-5 w-5" />
                </button>
              ) : (
                <div className="flex items-center justify-between">
                  <button className="flex h-[42px] w-[170px] cursor-pointer items-center justify-between space-x-2 rounded-3xl border-[1px] border-[#E2E8F0] p-[14px] text-gray-500 transition-all hover:scale-105 hover:bg-gray-50">
                    <SuggestionIcon />
                    <span className="mr-2 text-sm text-[#1A202C]">New suggestion</span>
                  </button>
                  <button
                    className="flex cursor-pointer items-center space-x-2 rounded-3xl bg-black px-6 py-2 text-white hover:scale-105 hover:bg-gray-800 hover:shadow-lg"
                    onClick={() => navigate(`/chatbot?query=${inputValue}`)}
                  >
                    <RequestIcon />
                    <span>Request</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
