/* eslint-disable @typescript-eslint/no-explicit-any */
import { Target } from 'lucide-react';
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
} from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2';

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
);

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

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

interface ScoreContent {
  base_scores: {
    경쟁: number;
    교통: number;
    매출: number;
    배후: number;
    유동: number;
    임대료: number;
    집객: number;
  };
  final_score: number;
  formula: string;
}

export default function ScoreSummaryPage({ data }: { data: any }) {
  const scoreSection = data.sections.find((s: any) => s.type === 'text');
  const radarSection = data.sections.find(
    (s: any) => s.type === 'chart' && (s.content as ChartContent).chartType === 'radar',
  );
  const barSection = data.sections.find(
    (s: any) => s.type === 'chart' && (s.content as ChartContent).chartType === 'bar',
  );

  const scoreData = scoreSection?.content as ScoreContent;
  const radarData = radarSection?.content as ChartContent;
  const barData = barSection?.content as ChartContent;

  // 레이더 차트 설정
  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            size: 11,
          },
          usePointStyle: true,
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
            return `${context.dataset.label}: ${context.parsed.r.toFixed(1)}점`;
          },
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: '#f3f4f6',
        },
        pointLabels: {
          font: {
            size: 12,
          },
          color: '#374151',
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  // 상위 5개 업종만 표시하기 위한 데이터 필터링
  const topDatasets = radarData?.datasets.slice(0, 5) || [];

  const radarChartData = {
    labels: radarData?.labels || [],
    datasets: topDatasets.map((dataset, index) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: [
        'rgba(59, 130, 246, 0.1)', // 파랑
        'rgba(16, 185, 129, 0.1)', // 초록
        'rgba(245, 158, 11, 0.1)', // 노랑
        'rgba(239, 68, 68, 0.1)', // 빨강
        'rgba(139, 92, 246, 0.1)', // 보라
      ][index],
      borderColor: [
        '#3b82f6', // 파랑
        '#10b981', // 초록
        '#f59e0b', // 노랑
        '#ef4444', // 빨강
        '#8b5cf6', // 보라
      ][index],
      borderWidth: 2,
      pointBackgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index],
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
    })),
  };

  // 막대 차트 설정
  const barOptions = {
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
        callbacks: {
          label: function (context: any) {
            return `${context.parsed.y}%`;
          },
        },
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
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 30,
        grid: {
          color: '#f3f4f6',
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 11,
          },
          callback: function (value: any) {
            return value + '%';
          },
        },
      },
    },
  };

  const barChartData = {
    labels: barData?.labels || [],
    datasets: [
      {
        data: barData?.datasets[0]?.data || [],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16'],
        borderColor: ['#1d4ed8', '#059669', '#d97706', '#dc2626', '#7c3aed', '#0891b2', '#65a30d'],
        borderWidth: 2,
        borderRadius: 6,
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
      <div className="px-16 pt-16 pb-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Target className="mr-3 h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800">상권 종합 점수 요약</h1>
          </div>
          <div className="text-sm text-gray-500">4/5</div>
        </div>

        {/* 최종 점수 및 공식 */}
        <div className="rounded-lg border border-purple-100 p-6">
          <div className="grid grid-cols-3 items-center gap-6">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-purple-600">{scoreData?.final_score}</div>
              <div className="text-sm text-gray-600">최종 점수</div>
            </div>
            <div className="col-span-2">
              <div className="text-sm leading-relaxed text-gray-700">
                <span className="font-semibold text-gray-800">평가 공식:</span>
                <br />
                {scoreData?.formula}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 차트 영역 */}
      <div className="mb-8 px-16">
        <div className="grid grid-cols-2 gap-8">
          {/* 레이더 차트 */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-bold text-gray-800">{radarData?.title}</h3>
            <div style={{ height: '320px' }}>
              <Radar data={radarChartData} options={radarOptions} />
            </div>
            <div className="mt-3 text-center text-xs text-gray-500">{radarData?.description}</div>
          </div>

          {/* 막대 차트 */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-bold text-gray-800">{barData?.title}</h3>
            <div style={{ height: '320px' }}>
              <Bar data={barChartData} options={barOptions} />
            </div>
            <div className="mt-3 text-center text-xs text-gray-500">{barData?.description}</div>
          </div>
        </div>
      </div>

      {/* 하단 점수 상세 */}
      <div className="px-16 pb-16">
        <div className="rounded-xl border border-gray-200 p-6">
          <h3 className="mb-4 text-center text-lg font-bold text-gray-800">7지표 세부 점수</h3>

          <div className="grid grid-cols-7 gap-3">
            {Object.entries(scoreData?.base_scores || {}).map(([key, score]) => (
              <div key={key} className="rounded-lg border border-gray-100 bg-white p-3 text-center shadow-sm">
                <div className="text-lg font-bold text-purple-600">{score}</div>
                <div className="text-xs font-medium text-gray-700">{key}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center text-sm text-gray-600">
            * 각 지표는 0~100점 기준으로 평가되며, 가중치를 적용하여 최종 점수를 산출합니다.
          </div>
        </div>
      </div>

      {/* 하단 장식 */}
    </div>
  );
}
