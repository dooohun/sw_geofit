import type { AnalysisSummary } from '@/lib/chat-data';

interface AnalysisResultProps {
  data: {
    analysis_summary: AnalysisSummary;
  };
}

export default function AnalysisResult ({ data }: AnalysisResultProps) {
  return (
    <div className="bg-green-50 border border-green-300 rounded-xl p-4 my-3">
      <div className="flex items-center mb-3">
        <span className="text-green-600 font-semibold text-sm">✅ 분석 완료</span>
      </div>
      <div className="text-sm text-gray-700 space-y-2 leading-relaxed">
        <p>
          <span className="font-medium">
            최근에 맞는 {data.analysis_summary.period.split(' ')[2]}개 매물
          </span>
          을 발견했습니다.
        </p>
        <p>
          <span className="font-medium text-blue-600">
            {data.analysis_summary.location}
          </span>{' '}
          이 가장 적합한 것으로 분석됩니다.
        </p>
      </div>
    </div>
  );
};
