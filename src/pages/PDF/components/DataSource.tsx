/* eslint-disable @typescript-eslint/no-explicit-any */
const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

interface DataSourceContent {
  area_policy: string[];
  scoring: string;
  sources: string[];
}

export default function DataSourcePage({ data }: { data: any }) {
  const dataSection = data.sections.find((s: any) => s.type === 'text');
  const dataContent = dataSection?.content as DataSourceContent;

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
      <div className="px-16 pt-8 pb-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-600">
              <span className="text-sm font-bold text-white">i</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">데이터 출처 및 산식</h1>
          </div>
          <div className="text-sm text-gray-500">(부록) 11/11</div>
        </div>
      </div>

      {/* 스코어링 공식 */}
      <div className="mb-10 px-16">
        <div className="rounded-xl border border-blue-200 p-8">
          <h2 className="mb-6 flex items-center text-xl font-bold text-blue-800">
            <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600">
              <span className="text-xs font-bold text-white">∑</span>
            </div>
            스코어링 공식
          </h2>

          <div className="rounded-lg border border-blue-100 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">25%</div>
                <div className="text-xs text-gray-600">유동인구</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">20%</div>
                <div className="text-xs text-gray-600">매출</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">15%</div>
                <div className="text-xs text-gray-600">임대료</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">15%</div>
                <div className="text-xs text-gray-600">교통</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">10%</div>
                <div className="text-xs text-gray-600">배후인구</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">10%</div>
                <div className="text-xs text-gray-600">경쟁</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-600">5%</div>
                <div className="text-xs text-gray-600">집객력</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 데이터 출처 */}
      <div className="mb-10 px-16">
        <div className="rounded-xl border border-gray-200 p-8">
          <h2 className="mb-6 flex items-center text-xl font-bold text-gray-800">
            <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-600">
              <span className="text-xs font-bold text-white">📊</span>
            </div>
            데이터 출처
          </h2>

          <div className="grid grid-cols-2 gap-6">
            {dataContent?.sources?.map((source, index) => (
              <div key={index} className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex items-start">
                  <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                    {index + 1}
                  </div>
                  <div className="text-sm leading-relaxed text-gray-700">{source}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 정보 */}
      <div className="absolute right-0 bottom-0 left-0">
        <div className="px-16 pb-8">
          <div className="text-center">
            <div className="mb-4 text-sm text-gray-600">
              본 분석 결과는 위 데이터 소스를 기반으로 생성되었으며, 지속적인 데이터 업데이트를 통해 정확도를 향상시키고
              있습니다.
            </div>
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
              <span>• 데이터 기준일: 2024년 4분기</span>
              <span>• 분석 모델: LightGBM v4.0</span>
              <span>• 공간 해상도: H3 Level 9</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
