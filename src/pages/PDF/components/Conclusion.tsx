import { Store, Target, TrendingUp, Users } from 'lucide-react';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ConclusionContent {
  execution_idea: string;
  final_recommendation: string;
  reasons: string[];
  risks: string[];
}

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

export default function ConclusionPage({ data }: { data: any }) {
  const conclusionSection = data.sections.find((s: any) => s.type === 'text');
  const conclusionData = conclusionSection?.content as ConclusionContent;

  // 추천 업종과 점수 추출
  const recommendation = conclusionData?.final_recommendation;
  const businessType = recommendation.split(':')[1]?.split('(')[0]?.trim() || '';
  const score = recommendation.match(/\(([^)]+)점\)/)?.[1] || '';

  return (
    <div
      className="relative overflow-hidden bg-white"
      style={{
        width: `${A4_WIDTH}px`,
        height: `${A4_HEIGHT}px`,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* 헤더 */}
      <div className="px-16 pt-16 pb-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <Target className="mr-3 h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">결론</h1>
          </div>
          <div className="text-sm text-gray-500">10/10</div>
        </div>
      </div>

      {/* 최종 추천 */}
      <div className="mb-8 px-16">
        <div className="rounded-2xl border-2 border-blue-200 p-8 shadow-lg">
          <div className="text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-800">최종 추천 업종</h2>
            <div className="mb-2 text-4xl font-bold text-blue-600">{businessType}</div>
            <div className="text-xl text-gray-600">{score}점</div>
          </div>
        </div>
      </div>

      {/* 추천 이유 */}
      <div className="mb-8 px-16">
        <div className="grid grid-cols-2 gap-8">
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
            <h3 className="mb-6 flex items-center text-xl font-bold text-green-600">
              <Users className="mr-2 h-6 w-6" />
              추천 이유
            </h3>
            <div className="space-y-4">
              {conclusionData?.reasons?.map((reason, index) => (
                <div key={index} className="flex items-start">
                  <div className="mt-0.5 mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="text-sm leading-relaxed text-gray-700">{reason}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
            <h3 className="mb-6 flex items-center text-xl font-bold text-red-600">
              <Store className="mr-2 h-6 w-6" />
              리스크 요인
            </h3>
            <div className="space-y-4">
              {conclusionData?.risks?.map((risk, index) => (
                <div key={index} className="flex items-start">
                  <div className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-red-500"></div>
                  <div className="text-sm leading-relaxed text-gray-700">{risk}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 실행 아이디어 */}
      <div className="mb-8 px-16">
        <div className="rounded-xl border border-orange-200 p-6">
          <h3 className="mb-4 flex items-center text-lg font-bold text-orange-600">
            <TrendingUp className="mr-2 h-5 w-5" />
            실행 아이디어
          </h3>
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <p className="leading-relaxed font-medium text-gray-700">"{conclusionData?.execution_idea}"</p>
          </div>
        </div>
      </div>

      {/* AI 활용 제안 */}
      {/* TODO: AI 활용 제안 추가 */}
      {/* <div className="px-16 pb-16">
        <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 p-6">
          <h3 className="mb-4 flex items-center text-lg font-bold text-purple-600">
            <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600">
              <span className="text-xs font-bold text-white">AI</span>
            </div>
            AI 맞춤형 운영 전략
          </h3>
          <div className="space-y-4">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="rounded-lg bg-white p-4 shadow-sm">
                <div className="flex items-start">
                  <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-relaxed text-gray-700">{suggestion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* 하단 서비스 정보 */}
    </div>
  );
}
