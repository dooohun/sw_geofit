import RealTimeIcon from '@/assets/svgs/realtime-icon.svg';
import PenIcon from '@/assets/svgs/pen-icon.svg';
import SearchIcon from '@/assets/svgs/search-icon.svg';
import demoUrl from '@/assets/images/demo.png';
import demoVideoUrl from '@/assets/videos/demo-example.mp4';

interface SecondSectionProps {
  ref: React.RefObject<HTMLDivElement | null>;
  titleRef: React.RefObject<HTMLDivElement | null>;
  isVideoPlaying: boolean;
}

export default function SecondSection({ ref, titleRef, isVideoPlaying }: SecondSectionProps) {
  console.log(isVideoPlaying);
  return (
    <section className="relative h-screen bg-white px-6 pt-8 pb-20">
      <div className="mx-auto max-w-6xl">
        {/* Service Description */}
        <div className="mb-16 text-left">
          <div ref={titleRef} className="font-semi mb-6 text-2xl tracking-[-0.3px] text-[#4D96FF]">
            실시간 창업 분석
          </div>
          <h2 className="font-semi mb-8 text-[40px] leading-[1.2] font-bold tracking-[-1.6px] text-black">
            창업 조건을 말로 설명하면, AI가 전국 데이터를
            <br />
            실시간으로 분석해 최적 입지를 찾아드립니다
          </h2>
          <div className="flex items-center space-x-8 text-sm text-[#718096]">
            <div className="flex items-center space-x-2">
              <RealTimeIcon />
              <span>Real-time Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <PenIcon />
              <span>Smart Recommendation</span>
            </div>
            <div className="flex items-center space-x-2">
              <SearchIcon />
              <span>Conversational Search</span>
            </div>
          </div>
        </div>

        {/* Demo Interface Placeholder */}
        <div className="relative aspect-[1216/620] overflow-hidden rounded-3xl shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]">
          {/* 이미지로 대체될 영역 */}
          <video
            src={demoVideoUrl}
            autoPlay
            loop
            playsInline
            className={`absolute top-0 left-0 h-full w-full transition-all duration-500 ${isVideoPlaying ? 'opacity-100' : 'opacity-0'}`}
          />
          <img
            src={demoUrl}
            className={`absolute top-0 left-0 h-full w-full transition-all duration-500 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`}
          />
        </div>
        <div ref={ref} className="absolute bottom-[100px] h-1" />
      </div>
    </section>
  );
}
