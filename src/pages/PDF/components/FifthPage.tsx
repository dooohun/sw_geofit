import { TrendingUp } from 'lucide-react';
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
import { Bar, Doughnut } from 'react-chartjs-2';

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

/* eslint-disable @typescript-eslint/no-explicit-any */
const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

interface BusinessAnalysisContent {
  score: number;
  strengths: string[];
  weaknesses: string[];
}

interface InsightContent {
  insight: string;
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

export default function BusinessDetailPage({ data }: { data: any }) {
  const businessSection = data.sections.find(
    (s: any) => s.type === 'text' && 'score' in (s.content as BusinessAnalysisContent),
  );
  const chartSections = data.sections.filter((s: any) => s.type === 'chart');
  const insightSection = data.sections.find(
    (s: any) => s.type === 'text' && 'insight' in (s.content as InsightContent),
  );

  const businessData = businessSection?.content as BusinessAnalysisContent;
  const insightData = insightSection?.content as InsightContent;

  // 차트 데이터 분리
  const timeChart = chartSections.find((s: any) => (s.content as ChartContent).title.includes('시간대'));
  const ageChart = chartSections.find((s: any) => (s.content as ChartContent).chartType === 'doughnut');
  const salesChart = chartSections.find((s: any) => (s.content as ChartContent).title.includes('매출'));
  const rentChart = chartSections.find((s: any) => (s.content as ChartContent).title.includes('임대료'));

  const timeData = timeChart?.content as ChartContent;
  const ageData = ageChart?.content as ChartContent;
  const salesData = salesChart?.content as ChartContent;
  const rentData = rentChart?.content as ChartContent;

  // 업종명 추출
  const businessType = data.title.split(' - ')[1] || '업종';
  const pageNumber = data.id === 41 ? '5' : data.id === 42 ? '6' : '7';

  // 차트 설정들
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
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
        grid: { display: false },
        ticks: { color: '#6b7280', font: { size: 10 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: '#f3f4f6' },
        ticks: { color: '#6b7280', font: { size: 10 } },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: { size: 10 },
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#3b82f6',
        borderWidth: 1,
        callbacks: {
          label: function (context: any) {
            return `${context.label}: ${context.parsed}%`;
          },
        },
      },
    },
    cutout: '60%',
  };

  // 차트 데이터 구성
  const timeChartData = {
    labels: timeData?.labels || [],
    datasets: [
      {
        data: timeData?.datasets[0]?.data || [],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
        borderColor: ['#1d4ed8', '#059669', '#d97706', '#7c3aed'],
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  const ageChartData = {
    labels: ageData?.labels || [],
    datasets: [
      {
        data: ageData?.datasets[0]?.data || [],
        backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const salesChartData = {
    labels: salesData?.labels || [],
    datasets: [
      {
        data: salesData?.datasets[0]?.data || [],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
        borderColor: ['#1d4ed8', '#059669', '#d97706'],
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  const rentChartData = {
    labels: rentData?.labels || [],
    datasets: [
      {
        data: rentData?.datasets[0]?.data || [],
        backgroundColor: ['#ef4444', '#f97316'],
        borderColor: ['#dc2626', '#ea580c'],
        borderWidth: 2,
        borderRadius: 4,
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
      <div className="px-16 pt-16 pb-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <TrendingUp className="mr-3 h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">업종 상세 - {businessType}</h1>
          </div>
          <div className="text-sm text-gray-500">{pageNumber}/8</div>
        </div>

        {/* 점수 및 강점/약점 */}
        <div className="rounded-lg border border-indigo-100 p-6">
          <div className="grid grid-cols-3 gap-6">
            {/* 점수 */}
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-indigo-600">{businessData?.score}</div>
              <div className="text-sm text-gray-600">종합 점수</div>
            </div>

            {/* 강점 */}
            <div>
              <h3 className="mb-3 text-lg font-bold text-green-600">강점</h3>
              <ul className="space-y-1">
                {businessData?.strengths?.map((strength, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-700">
                    <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            {/* 약점 */}
            <div>
              <h3 className="mb-3 text-lg font-bold text-red-600">약점</h3>
              <ul className="space-y-1">
                {businessData?.weaknesses?.map((weakness, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-700">
                    <div className="mr-2 h-2 w-2 rounded-full bg-red-500"></div>
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 차트 영역 */}
      <div className="mb-8 px-16">
        <div className="grid grid-cols-2 gap-6">
          {/* 시간대별 유동 */}
          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-lg">
            <h3 className="mb-3 text-lg font-bold text-gray-800">{timeData?.title}</h3>
            <div style={{ height: '200px' }}>
              <Bar data={timeChartData} options={barOptions} />
            </div>
            <div className="mt-2 text-center text-xs text-gray-500">{timeData?.description}</div>
          </div>

          {/* 연령/성별 구성 */}
          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-lg">
            <h3 className="mb-3 text-lg font-bold text-gray-800">{ageData?.title}</h3>
            <div style={{ height: '200px' }}>
              <Doughnut data={ageChartData} options={doughnutOptions} />
            </div>
            <div className="mt-2 text-center text-xs text-gray-500">{ageData?.description}</div>
          </div>

          {/* 업소당 매출 비교 */}
          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-lg">
            <h3 className="mb-3 text-lg font-bold text-gray-800">{salesData?.title}</h3>
            <div style={{ height: '200px' }}>
              <Bar data={salesChartData} options={barOptions} />
            </div>
            <div className="mt-2 text-center text-xs text-gray-500">{salesData?.description}</div>
          </div>

          {/* 임대료 비교 */}
          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-lg">
            <h3 className="mb-3 text-lg font-bold text-gray-800">{rentData?.title}</h3>
            <div style={{ height: '200px' }}>
              <Bar data={rentChartData} options={barOptions} />
            </div>
            <div className="mt-2 text-center text-xs text-gray-500">{rentData?.description}</div>
          </div>
        </div>
      </div>

      {/* AI 인사이트 */}
      <div className="px-16 pb-16">
        <div className="rounded-xl border border-gray-200 p-6">
          <div className="flex items-start">
            <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600">
              <span className="text-sm font-bold text-white">AI</span>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-bold text-gray-800">분석 인사이트</h3>
              <p className="leading-relaxed text-gray-700">{insightData?.insight}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 장식 */}
    </div>
  );
}
