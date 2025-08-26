import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#F8F9FA] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Brand */}
          <div>
            <div className="mb-4 text-2xl font-bold text-black">Geo-Fit</div>
            <p className="text-sm leading-relaxed text-[#718096]">AI가 찾아주는 당신만의 완벽한 창업 공간</p>
          </div>

          {/* Middle Column - Services */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-black">서비스</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/chatbot" className="text-sm text-[#718096] transition-colors hover:text-black">
                  AI 추천받기
                </Link>
              </li>
              <li>
                <Link to="/property-registration" className="text-sm text-[#718096] transition-colors hover:text-black">
                  매물 등록
                </Link>
              </li>
              <li>
                <Link to="/property-search" className="text-sm text-[#718096] transition-colors hover:text-black">
                  매물 조회
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column - Support */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-black">고객 지원</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/guide" className="text-sm text-[#718096] transition-colors hover:text-black">
                  이용 가이드
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-start space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <p className="text-sm text-[#718096]">© 2025 Geo-Fit. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
