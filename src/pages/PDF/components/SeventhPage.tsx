/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Building } from 'lucide-react';
import { Bar } from 'react-chartjs-2';

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

// A4 사이즈: 210mm × 297mm = 794px × 1123px (96 DPI 기준)
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

interface RentAnalysisContent {
  bucket: string;
  note: string;
  size_multiplier: number;
}

interface GradeContent {
  eocr: string;
  grade: string;
}

export default function RentAnalysisPage({ data }: { data: any }) {
  const rentSection = data.sections.find(
    (s: any) => s.type === 'text' && 'bucket' in (s.content as RentAnalysisContent),
  );
  const chartSection = data.sections.find((s: any) => s.type === 'chart');
  const gradeSection = data.sections.find((s: any) => s.type === 'text' && 'grade' in (s.content as GradeContent));

  const rentData = rentSection?.content as RentAnalysisContent;
  const chartData = chartSection?.content as ChartContent;
  const gradeData = gradeSection?.content as GradeContent;

  // 등급별 색상 설정
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case '안정':
        return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' };
      case '경계':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' };
      case '위험':
        return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' };
    }
  };

  const gradeColors = getGradeColor(gradeData?.grade || '');

  // 게이지 차트를 위한 데이터 처리
  const rentValues = chartData?.datasets[0]?.data || [];
  const avgRent = rentValues[0] || 0;
  const originalRent = rentValues[1] || 0;
  const adjustedRent = rentValues[2] || 0;

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
            return `${context.parsed.y.toLocaleString()}원/㎡`;
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
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6',
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 11,
          },
          callback: function (value: any) {
            return value.toLocaleString();
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
          '#3b82f6', // 동 평균 - 파랑
          '#f59e0b', // 공실원시 - 노랑
          '#ef4444', // 공실조정 - 빨강
        ],
        borderColor: ['#1d4ed8', '#d97706', '#dc2626'],
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  // 게이지형 시각화를 위한 컴포넌트
  const GaugeVisualization = () => {
    const maxValue = Math.max(avgRent, originalRent, adjustedRent) * 1.2;
    const avgPercent = (avgRent / maxValue) * 100;
    const adjustedPercent = (adjustedRent / maxValue) * 100;

    return (
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
        <h3 className="mb-6 text-center text-lg font-bold text-gray-800">임대료 수준 게이지</h3>

        {/* 게이지 바 */}
        <div className="space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">동 평균</span>
              <span className="text-sm font-bold text-blue-600">{avgRent.toLocaleString()}원</span>
            </div>
            <div className="h-4 w-full rounded-full bg-gray-200">
              <div
                className="h-4 rounded-full bg-blue-500 transition-all duration-1000"
                style={{ width: `${avgPercent}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">공실(조정후)</span>
              <span className="text-sm font-bold text-red-600">{adjustedRent.toLocaleString()}원</span>
            </div>
            <div className="h-4 w-full rounded-full bg-gray-200">
              <div
                className="h-4 rounded-full bg-red-500 transition-all duration-1000"
                style={{ width: `${adjustedPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* 비교 텍스트 */}
        <div className="mt-6 text-center">
          <div className="text-sm text-gray-600">
            {adjustedRent === avgRent
              ? '동 평균과 동일'
              : adjustedRent > avgRent
                ? `동 평균 대비 +${(((adjustedRent - avgRent) / avgRent) * 100).toFixed(1)}%`
                : `동 평균 대비 -${(((avgRent - adjustedRent) / avgRent) * 100).toFixed(1)}%`}
          </div>
        </div>
      </div>
    );
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
            <Building className="mr-3 h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800">임대료 분석</h1>
          </div>
          <div className="text-sm text-gray-500">9/11</div>
        </div>

        {/* 기본 정보 */}
        <div className="rounded-lg border border-green-100 p-6">
          <div className="grid grid-cols-3 items-center gap-6">
            <div className="text-center">
              <div className="mb-1 text-2xl font-bold text-green-600">{rentData?.bucket}</div>
              <div className="text-sm text-gray-600">면적 버킷</div>
            </div>
            <div className="text-center">
              <div className="mb-1 text-2xl font-bold text-blue-600">×{rentData?.size_multiplier}</div>
              <div className="text-sm text-gray-600">조정 계수</div>
            </div>
            <div
              className={`rounded-lg border-2 px-4 py-3 text-center ${gradeColors.bg} ${gradeColors.text} ${gradeColors.border}`}
            >
              <div className="mb-1 text-xl font-bold">{gradeData?.grade}</div>
              <div className="text-xs">EOCR 등급</div>
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-gray-600">{rentData?.note}</div>
        </div>
      </div>

      {/* 차트 영역 */}
      <div className="mb-8 px-16">
        <div className="grid grid-cols-2 gap-8">
          {/* 막대 차트 */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-bold text-gray-800">{chartData?.title}</h3>
            <div style={{ height: '300px' }}>
              <Bar data={chartDataConfig} options={barOptions} />
            </div>
            <div className="mt-3 text-center text-xs text-gray-500">{chartData?.description}</div>
          </div>

          {/* 게이지 시각화 */}
          <GaugeVisualization />
        </div>
      </div>

      {/* 하단 분석 */}
      <div className="px-16 pb-16">
        <div className="rounded-xl border border-gray-200 p-6">
          <h3 className="mb-4 text-center text-lg font-bold text-gray-800">EOCR 임대료 평가</h3>

          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg border border-gray-100 bg-white p-4 text-center shadow-sm">
              <div className="text-lg font-bold text-blue-600">{avgRent.toLocaleString()}</div>
              <div className="mt-1 text-xs text-gray-600">동 평균 임대료</div>
              <div className="mt-2 text-xs text-gray-500">원/㎡</div>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white p-4 text-center shadow-sm">
              <div className="text-lg font-bold text-orange-600">{originalRent.toLocaleString()}</div>
              <div className="mt-1 text-xs text-gray-600">공실 원시 임대료</div>
              <div className="mt-2 text-xs text-gray-500">원/㎡</div>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white p-4 text-center shadow-sm">
              <div className="text-lg font-bold text-red-600">{adjustedRent.toLocaleString()}</div>
              <div className="mt-1 text-xs text-gray-600">공실 조정 임대료</div>
              <div className="mt-2 text-xs text-gray-500">원/㎡</div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <div className="mb-2 text-sm text-gray-700">{gradeData?.eocr}</div>
            <div
              className={`inline-block rounded-full px-4 py-2 ${gradeColors.bg} ${gradeColors.text} border ${gradeColors.border}`}
            >
              <span className="text-lg font-bold">{gradeData?.grade} 등급</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
