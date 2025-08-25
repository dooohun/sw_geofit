import RealTimeIcon from '@/assets/svgs/realtime-icon.svg';
import PenIcon from '@/assets/svgs/pen-icon.svg';
import SearchIcon from '@/assets/svgs/search-icon.svg';
import demoUrl from '@/assets/images/demo.png';

export default function SecondSection() {
  return (
    <section className="h-screen bg-white px-6 pt-8 pb-20">
      <div className="mx-auto max-w-6xl">
        {/* Service Description */}
        <div className="mb-16 text-left">
          <div className="font-semi mb-6 text-2xl tracking-[-0.3px] text-[#4D96FF]">실시간 창업 분석</div>
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
        <div className="relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-blue-400 via-purple-500 to-orange-400 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)]">
          {/* 이미지로 대체될 영역 */}
          <img src={demoUrl} />
        </div>
      </div>
    </section>
  );
}
