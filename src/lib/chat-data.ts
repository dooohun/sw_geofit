export interface SelectionOption {
  label: string;
  value: string;
  selected?: boolean;
}

export interface AnalysisSummary {
  period: string;
  location: string;
}

export interface DetailedReport {
  title: string;
  description: string;
  actions: Array<{
    label: string;
    action: string;
    type: 'primary' | 'secondary';
  }>;
}

export interface MockResponse {
  type: string;
  message: string;
  sub_message?: string;
  options?: SelectionOption[];
  analysis_summary?: AnalysisSummary;
  detailed_report?: DetailedReport;
  required_fields?: string[];
}

export const mockResponses: Record<string, MockResponse> = {
  initial_greeting: {
    type: "greeting",
    message: "안녕하세요! 창업 입지 분석을 도와드리는 AI 상담사입니다. 😊",
    sub_message: "창업하고 싶은 업종과 지역을 저희에게 말씀해주세요.",
    required_fields: ["industry", "location", "budget"]
  },
  
  industry_selection: {
    type: "selection",
    message: "수원시 영통구에서 치킨집 창업을 계획하고 계시는군요! 👍",
    sub_message: "창업 예산 규모는 어느 정도로 계획하고 계신가요?\n정확한 기준으로 안내드리겠습니다.",
    options: [
      { label: "50만원 이하", value: "under_500k" },
      { label: "100만원 이하", value: "under_1m" },
      { label: "200만원 이하", value: "under_2m" },
      { label: "300만원 이하", value: "under_3m" },
      { label: "예산 협의", value: "negotiable" }
    ]
  },

  analysis_result: {
    type: "analysis_complete",
    message: "✅ 분석 완료",
    analysis_summary: {
      period: "최근 약 2~3개 매물을 발견했습니다.",
      location: "수원시 영통구 광교중앙역 인근이 가장 적합한 장소로 분석됩니다."
    },
    detailed_report: {
      title: "📊 상세 분석 리포트를 생성하시겠나요?",
      description: "리포트에는 상권 분석, 경쟁업체 현황, 예상 매출 등이 포함됩니다.",
      actions: [
        { label: "상세 리포트 생성", action: "generate_report", type: "primary" },
        { label: "다른 조건으로 재분석", action: "restart_analysis", type: "secondary" },
        { label: "매물 정보 보기", action: "view_properties", type: "secondary" }
      ]
    }
  },
};

export const analysisHistory = [
  "수원시 영통구 치킨집 분석",
  "안양구 카페 창업 분석",
  "파주구 편의점 입지 분석",
  "용인구 미용실 상권 분석",
  "용산구 디저트카페 분석"
];