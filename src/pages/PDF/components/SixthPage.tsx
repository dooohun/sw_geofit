/* eslint-disable @typescript-eslint/no-explicit-any */
import { Award } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ArcElement,
);

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

// 타입 정의
interface TableContent {
  description: string;
  headers: string[];
  id: number;
  // Update the tuple to have 7 elements to match usage in the code
  rows: Array<[number, string, number, string, string, string, string]>;
  title: string;
}

export default function Top3ComparisonPage({ data }: { data: any }) {
  const tableSection = data.sections.find((s: any) => s.type === 'table');

  const tableData = tableSection?.content as TableContent;

  // 임대료 레벨에 따른 색상
  const getRentLevelColor = (level: string) => {
    switch (level) {
      case '평균−':
        return 'text-green-600 bg-green-50';
      case '평균':
        return 'text-blue-600 bg-blue-50';
      case '평균+':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  // 경쟁점포 수준에 따른 색상
  const getCompetitionColor = (level: string) => {
    switch (level) {
      case '多':
        return 'text-red-600 bg-red-50';
      case '중':
        return 'text-yellow-600 bg-yellow-50';
      case '4':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

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
      <div className="px-10 pt-8 pb-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <Award className="mr-3 h-8 w-8 text-yellow-600" />
            <h1 className="text-3xl font-bold text-gray-800">Top3 비교</h1>
          </div>
          <div className="text-sm text-gray-500">8/11</div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="mb-8 px-10">
        <div className="flex flex-col">
          {/* 비교표 */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-xl font-bold text-gray-800">{tableData?.title}</h2>

            <div className="overflow-hidden rounded-xl bg-white shadow-sm">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {tableData?.headers.map((header, index) => (
                      <th
                        key={index}
                        className="px-3 py-3 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData?.rows.map((row, index) => (
                    <tr key={index} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-2 py-2 text-sm font-semibold text-gray-800">{row[0]}</td>
                      <td className="px-2 py-2">
                        <span className="text-xl font-bold text-blue-600">{row[1]}</span>
                        <span className="ml-1 text-xs text-gray-500">점</span>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-700">{row[2]}</td>
                      <td className="px-3 py-4 text-sm text-gray-700">{row[3]}</td>
                      <td className="px-3 py-4">
                        <span
                          className={`rounded px-2 py-1 text-xs font-medium ${getCompetitionColor(row[4] as unknown as string)}`}
                        >
                          {row[4]}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <span
                          className={`rounded px-2 py-1 text-xs font-medium ${getRentLevelColor(row[5] as unknown as string)}`}
                        >
                          {row[5]}
                        </span>
                      </td>
                      <td className="max-w-xs px-3 py-4 text-xs leading-relaxed text-gray-600">{row[6]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-center text-xs text-gray-500">{tableData?.description}</div>
          </div>
        </div>
      </div>

      {/* 하단 요약 */}
      <div className="px-16 pb-16">
        <div className="rounded-xl border border-yellow-200 p-6">
          <h3 className="mb-4 text-center text-lg font-bold text-gray-800">종합 분석 요약</h3>

          <div className="grid grid-cols-3 gap-6">
            {tableData?.rows.map((row, index) => (
              <div key={index} className="rounded-lg border border-gray-100 bg-white p-4 text-center shadow-sm">
                <div className="mb-2 text-lg font-bold text-gray-800">{row[0]}</div>
                <div className="mb-2 text-2xl font-bold text-blue-600">{row[1]}점</div>
                <div className="mb-2 text-xs text-gray-600">
                  <div className="mb-1">
                    피크: <span className="font-medium">{row[2]}</span>
                  </div>
                  <div>
                    고객: <span className="font-medium">{row[3]}</span>
                  </div>
                </div>
                <div className="mb-2 flex justify-center space-x-1">
                  <span
                    className={`rounded px-2 py-1 text-xs font-medium ${getCompetitionColor(row[4] as unknown as string)}`}
                  >
                    경쟁{row[4]}
                  </span>
                  <span
                    className={`rounded px-2 py-1 text-xs font-medium ${getRentLevelColor(row[5] as unknown as string)}`}
                  >
                    {row[5]}
                  </span>
                </div>
                <div className="text-xs leading-tight text-gray-600">{row[6]}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            * 모든 업종이 동일한 점수를 기록하여 세부 조건에 따른 차별화 포인트를 검토하시기 바랍니다.
          </div>
        </div>
      </div>

      {/* 하단 장식 */}
    </div>
  );
}
