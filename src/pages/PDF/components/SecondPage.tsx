/* eslint-disable @typescript-eslint/no-explicit-any */
import { Users, Home, Store, TrendingUp, Award, Target } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

interface TableContent {
  description: string;
  headers: string[];
  id: number;
  rows: Array<[number, string, number, string]>;
  title: string;
}

interface ChartContent {
  chartType: string;
  datasets: Array<{
    data: number[];
    label: string;
  }>;
  description: string;
  id: number;
  labels: string[];
  title: string;
  xAxisLabel: string;
  yAxisLabel: string;
}

interface TextContent {
  bullets?: string[];
  summary_text?: string;
}

export default function ExecutiveSummaryPage({ data }: { data: any }) {
  const tableSection = data.sections.find((s: any) => s.type === 'table');
  const chartSection = data.sections.find((s: any) => s.type === 'chart');
  const textSection = data.sections.find((s: any) => s.type === 'text');

  const tableData = tableSection?.content as TableContent;
  const chartData = chartSection?.content as ChartContent;
  const textData = textSection?.content as TextContent;

  // Chart.js 설정
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#3b82f6',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: '#f3f4f6',
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const chartDataConfig = {
    labels: chartData?.labels || [],
    datasets: [
      {
        data: chartData?.datasets[0]?.data || [],
        backgroundColor: [
          '#3b82f6', // 파랑
          '#06b6d4', // 청록
          '#8b5cf6', // 보라
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
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
      <div className="px-16 pt-8 pb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <TrendingUp className="mr-3 h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Executive Summary</h1>
          </div>
          <div className="text-sm text-gray-500">2/5</div>
        </div>
      </div>

      {/* 추천 업종 Top 3 테이블 */}
      <div className="mb-10 px-16">
        <div className="rounded-2xl border border-blue-100 p-8">
          <div className="mb-6 flex items-center">
            <Award className="mr-3 h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">{tableData?.title}</h2>
          </div>

          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {tableData?.headers.map((header, index) => (
                    <th key={index} className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData?.rows.map((row, index) => (
                  <tr key={index} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div
                          className={`mr-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white ${
                            index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                          }`}
                        >
                          {row[0]}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">{row[1]}</td>
                    <td className="px-6 py-4">
                      <span className="text-2xl font-bold text-blue-600">{row[2]}</span>
                      <span className="ml-1 text-sm text-gray-500">점</span>
                    </td>
                    <td className="px-6 py-4 text-sm leading-relaxed text-gray-600">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-center text-sm text-gray-500">{tableData?.description}</div>
        </div>
      </div>

      {/* 차트와 핵심 근거 */}
      <div className="mb-8 px-16">
        <div className="grid grid-cols-2 gap-8">
          {/* 차트 영역 */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-bold text-gray-800">{chartData?.title}</h3>
            <div style={{ height: '280px' }}>
              <Bar data={chartDataConfig} options={chartOptions} />
            </div>
          </div>

          {/* 핵심 근거 */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
            <h3 className="mb-6 text-lg font-bold text-gray-800">핵심 근거</h3>
            <div className="space-y-6">
              {textData?.bullets?.map((bullet, index) => (
                <div key={index} className="flex items-center">
                  {index === 0 && <Users className="mr-4 h-8 w-8 text-blue-500" />}
                  {index === 1 && <Home className="mr-4 h-8 w-8 text-green-500" />}
                  {index === 2 && <Store className="mr-4 h-8 w-8 text-orange-500" />}
                  <div className="flex-1">
                    <div className="text-lg font-semibold text-gray-800">{bullet}</div>
                    <div className="mt-1 text-sm text-gray-500">
                      {index === 0 && '유동인구 분석'}
                      {index === 1 && '주거 배후지 분석'}
                      {index === 2 && '경쟁업체 분석'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 종합 요약 */}
      <div className="px-16 pb-16">
        <div className="rounded-xl border border-gray-200 p-6">
          <div className="flex items-start">
            <Target className="mt-1 mr-3 h-6 w-6 flex-shrink-0 text-blue-600" />
            <div>
              <h3 className="mb-3 text-lg font-bold text-gray-800">종합 평가</h3>
              <p className="leading-relaxed text-gray-700">{textData?.summary_text}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 장식 */}
      <div className="absolute right-0 bottom-0 left-0 h-1"></div>
    </div>
  );
}
