export default function FourthSection() {
  return (
    <section className="bg-white px-6 pt-16 pb-20">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 text-left">
          <div className="font-semi mb-6 text-2xl tracking-[-0.3px] text-[#4D96FF]">AI-Powered solution</div>
          <h2 className="font-semi mb-8 text-[40px] leading-[1.2] font-bold tracking-[-1.6px] text-black">
            3단계로 완성하는 입지 분석
          </h2>
        </div>

        {/* Three Step Process */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Step 1 */}
          <div className="flex flex-col items-center justify-start rounded-xl bg-[#fafafa] px-5 py-6">
            <div className="mb-6 flex h-[280px] w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-100">
              <img src="/images/step1-conversation.png" alt="대화형 정보 입력" className="h-full w-full object-cover" />
            </div>
            <h3 className="mb-4 text-center text-lg font-semibold text-black">자연어로 말하면 AI가 이해합니다.</h3>
            <p className="text-center text-sm leading-relaxed text-[#718096]">
              복잡한 창업 조건을 일상 언어로 입력하면 업종, 지역, 예산 등을 자동 추출하여 구조화합니다.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center justify-start rounded-xl bg-[#fafafa] px-5 py-6">
            <div className="mb-6 flex h-[280px] w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-100">
              <img src="/images/step2-analysis.png" alt="전국 데이터 분석" className="h-full w-full object-cover" />
            </div>
            <h3 className="mb-4 text-center text-lg font-semibold text-black">전국 데이터를 한 번에 분석합니다.</h3>
            <p className="text-center text-sm leading-relaxed text-[#718096]">
              공실 정보, 상권 데이터, 정책 지원 정보, 교통 접근성을 통합 분석합니다.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center justify-start rounded-xl bg-[#fafafa] px-5 py-6">
            <div className="mb-6 flex h-[280px] w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-100">
              <img src="/images/step3-report.png" alt="PDF 리포트 생성" className="h-full w-full object-cover" />
            </div>
            <h3 className="mb-4 text-center text-lg font-semibold text-black">최적 입지를 PDF 리포트로 제공합니다.</h3>
            <p className="text-center text-sm leading-relaxed text-[#718096]">
              분석 결과를 시각화된 상세 리포트로 생성하여 즉시 의사결정할 수 있습니다.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <button className="rounded-xl bg-[#4285F4] px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-[#3367D6]">
            지금 시작하기
          </button>
        </div>
      </div>
    </section>
  );
}
