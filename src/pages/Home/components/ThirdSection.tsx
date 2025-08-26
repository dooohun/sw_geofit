import { useEffect, useRef } from 'react';
import * as Chart from 'chart.js';

Chart.Chart.register(
  Chart.CategoryScale,
  Chart.LinearScale,
  Chart.BarElement,
  Chart.ArcElement,
  Chart.DoughnutController,
  Chart.Title,
  Chart.Tooltip,
  Chart.Legend,
);

export default function ThirdSection() {
  const circularChartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart.Chart | null>(null);

  useEffect(() => {
    if (circularChartRef.current) {
      const ctx = circularChartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart.Chart(ctx, {
          type: 'doughnut',
          data: {
            datasets: [
              {
                data: [27, 73],
                backgroundColor: ['#4285F4', '#E5E7EB'],
                borderWidth: 0,
              },
            ],
          },
          options: {
            cutout: '75%',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: false,
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <section className="bg-white px-6 pt-16 pb-20">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 text-left">
          <div className="font-semi mb-6 text-2xl tracking-[-0.3px] text-[#4D96FF]">Social Problem</div>
          <h2 className="font-semi mb-8 text-[40px] leading-[1.2] font-bold tracking-[-1.6px] text-black">
            현재 문제 상황을 해결합니다.
          </h2>
        </div>

        {/* Statistics Grid */}
        <div className="mb-10 grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left Stats - 높은 자영업 공실률 */}
          <div className="flex flex-col items-start justify-center rounded-xl bg-[#fafafa] px-5 py-6">
            <div className="w-full">
              <h3 className="mb-4 text-lg font-semibold text-black">높은 자영업 공실률</h3>
              <p className="mb-8 text-sm leading-relaxed text-[#718096]">
                세종, 경남, 충남 등 일부 지역의 상업용 부동산 공실률이 20%를 초과하며
                <br />
                상가 어려움이 심화되고 있습니다.
              </p>

              {/* Chart.js Circular Progress */}
              <div className="flex items-center justify-center space-x-8">
                <div className="relative h-32 w-32">
                  <canvas ref={circularChartRef} className="h-32 w-32"></canvas>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-black">27%</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex justify-center">
                <div className="text-md mb-1 text-[#718096]">공실률</div>
              </div>
            </div>
          </div>

          {/* Right Stats - 공간 확보 어려움 */}
          <div>
            <div className="flex flex-col items-start justify-center rounded-xl bg-[#fafafa] px-5 py-6">
              <h3 className="mb-4 text-lg font-semibold text-black">공간 확보 어려움</h3>
              <p className="mb-8 text-sm leading-relaxed text-[#718096]">
                창업자들 절반 이상이 적절한 공간 확보에 어려움을 겪고 있으며, 복잡한 정보 탐색
                <br />과 정확성 검증 장벽으로 실패율이 지속적으로 증가하고 있습니다.
              </p>

              {/* Large Percentage */}
              <div className="mb-6 w-full flex-col items-center text-center">
                <div className="mb-2 text-6xl font-bold text-[#4285F4]">51%</div>
                <div className="text-sm text-[#718096]">공간 확보 어려움</div>
              </div>

              {/* People Pictogram */}
              <div className="grid w-full grid-cols-10 gap-2">
                {Array.from({ length: 10 }, (_, i) => (
                  <div
                    key={i}
                    className="flex justify-center transition-all duration-300"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <svg
                      width="24"
                      height="32"
                      viewBox="0 0 24 32"
                      className={`transition-colors duration-500 ${i < 5 ? 'text-[#4285F4]' : 'text-[#E5E7EB]'}`}
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      {/* Person Pictogram */}
                      <g fill="currentColor">
                        {/* Head */}
                        <circle cx="12" cy="6" r="4" />
                        {/* Body */}
                        <path d="M12 12c-3.5 0-6 2.5-6 6v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V18c0-3.5-2.5-6-6-6z" />
                      </g>
                    </svg>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex w-full justify-between text-xs text-[#718096]">
                <span>어려움을 겪는 창업자 (51%)</span>
                <span>문제없는 창업자 (49%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Comparison */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col items-start justify-center rounded-xl bg-[#fafafa] px-5 py-6">
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-black">심화되는 지역 격차</h3>
              <p className="mb-6 text-sm leading-relaxed text-[#718096]">
                지방 공실률이 서울 대비 2.7배 높은 수준으로 지역 간 격차가 지속적으로 확대되고 있습니다.
              </p>
            </div>

            <div className="flex w-full items-center justify-center space-x-16">
              <div className="text-center">
                <div className="mb-4 text-5xl font-bold text-[#4285F4]">10%</div>
                <div className="text-sm text-[#718096]">서울 공실률</div>
              </div>

              <div className="text-3xl font-medium text-[#718096]">vs</div>

              <div className="text-center">
                <div className="mb-4 text-5xl font-bold text-[#4285F4]">27%</div>
                <div className="text-sm text-[#718096]">지방 평균 공실률</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
