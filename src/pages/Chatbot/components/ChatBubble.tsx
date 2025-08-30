/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Property {
  propertyId: number;
  dong: string;
  propertyType: string;
  floor: string;
  rent: number;
  deposit: number;
  area: number;
  image: string;
  rec1Type?: string;
  rec2Type?: string;
  rec3Type?: string;
  reason1?: string;
  reason2?: string;
  reason3?: string;
}

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  type?: 'COLLECT' | 'RESULT' | 'POLICY' | 'EVALUATION';
  ids?: number[];
}

interface ChatBubbleProps {
  message: string | Message;
  isBot: boolean;
  isPending?: boolean;
  properties?: Property[]; // 매물 데이터 배열
  onPropertyClick?: (propertyId: number) => void;
  onEvaluationSubmit?: (score: number, messageId?: number) => void;
}

export default function ChatBubble({
  message,
  isBot,
  isPending = false,
  properties = [],
  onPropertyClick,
  onEvaluationSubmit,
}: ChatBubbleProps) {
  // message가 객체인 경우와 문자열인 경우를 구분
  const messageObj =
    typeof message === 'string' ? { id: 0, content: message, isUser: !isBot, type: 'COLLECT' as const } : message;

  const markdownComponents = {
    // 코드 블록 스타일링
    code: ({ inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <div className="my-2 overflow-x-auto rounded-md bg-gray-800 p-3 text-gray-100">
          <div className="mb-2 text-xs text-gray-400">{match[1]}</div>
          <code className="text-sm" {...props}>
            {children}
          </code>
        </div>
      ) : (
        <code className="rounded bg-gray-100 px-1 py-0.5 text-sm text-red-600" {...props}>
          {children}
        </code>
      );
    },

    // 헤딩 스타일링
    h1: ({ children }: any) => <h1 className="mt-4 mb-2 text-xl font-bold first:mt-0">{children}</h1>,
    h2: ({ children }: any) => <h2 className="mt-3 mb-2 text-lg font-bold first:mt-0">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-md mt-2 mb-1 font-bold first:mt-0">{children}</h3>,

    // 리스트 스타일링
    ul: ({ children }: any) => <ul className="mb-2 list-inside list-disc space-y-1">{children}</ul>,
    ol: ({ children }: any) => <ol className="mb-2 list-inside list-decimal space-y-1">{children}</ol>,

    // 링크 스타일링
    a: ({ children, href }: any) => (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">
        {children}
      </a>
    ),

    // 인용구 스타일링
    blockquote: ({ children }: any) => (
      <blockquote className="my-2 border-l-4 border-gray-300 pl-4 italic">{children}</blockquote>
    ),

    // 테이블 스타일링
    table: ({ children }: any) => (
      <div className="my-2 overflow-x-auto">
        <table className="min-w-full border-collapse">{children}</table>
      </div>
    ),
    th: ({ children }: any) => (
      <th className="border border-gray-300 bg-gray-50 px-3 py-2 text-left font-semibold">{children}</th>
    ),
    td: ({ children }: any) => <td className="border border-gray-300 px-3 py-2">{children}</td>,

    // 문단 간격
    p: ({ children }: any) => <p className="mb-2 last:mb-0">{children}</p>,
  };

  // 매물 카드 렌더링 함수
  const renderPropertyCard = (property: Property) => {
    const isAnalysisComplete = property.rec1Type && property.reason1;

    return (
      <div
        key={property.propertyId}
        className="group relative transform cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
        onClick={() => onPropertyClick?.(property.propertyId)}
      >
        {/* Property Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={property.image}
            alt={property.dong}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Property Info */}
        <div className="p-5">
          {/* Location & Basic Info */}
          <div className="mb-3">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="line-clamp-1 text-lg font-bold text-gray-900">{property.dong}</h3>
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                {property.floor}
              </span>
            </div>
            <p className="text-sm text-gray-500">{property.propertyType}</p>
          </div>

          {/* Price Info */}
          <div className="mb-4 space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-blue-600">
                월세 {Math.floor(property.rent / 10000).toLocaleString()}만원
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span>보증금 {Math.floor(property.deposit / 10000).toLocaleString()}만원</span>
              <span>•</span>
              <span>{property.area}㎡</span>
            </div>
          </div>

          {/* Analysis Status */}
          {isAnalysisComplete ? (
            <>
              {/* 추천 업종 */}
              <div className="mb-4">
                <div className="mb-2 flex items-center gap-1">
                  <span className="text-xs font-medium text-gray-700">추천 업종</span>
                  <div className="h-1 w-1 rounded-full bg-blue-500"></div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[property.rec1Type, property.rec2Type, property.rec3Type].filter(Boolean).map((type, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-200"
                    >
                      #{type}
                    </span>
                  ))}
                </div>
              </div>

              {/* 핵심 근거 */}
              <div className="mb-5">
                <div className="mb-2 flex items-center gap-1">
                  <span className="text-xs font-medium text-gray-700">핵심 근거</span>
                  <div className="h-1 w-1 rounded-full bg-emerald-500"></div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[property.reason1, property.reason2, property.reason3].filter(Boolean).map((reason, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200"
                    >
                      #{reason}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-md"
                onClick={(e) => {
                  e.stopPropagation();
                  onPropertyClick?.(property.propertyId);
                }}
              >
                자세히 보기
              </button>
            </>
          ) : (
            /* 분석 중 상태 */
            <div className="space-y-4">
              <div className="rounded-xl bg-amber-50 p-4 text-center">
                <div className="mb-2 flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-amber-600 border-t-transparent"></div>
                </div>
                <p className="text-sm font-medium text-amber-800">분석 중입니다</p>
                <p className="mt-1 text-xs text-amber-600">업종 추천 및 입지 분석을 진행하고 있어요</p>
              </div>

              <button
                className="w-full rounded-xl bg-[#4D96FF] bg-gradient-to-r px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md"
                onClick={(e) => {
                  e.stopPropagation();
                  onPropertyClick?.(property.propertyId);
                }}
              >
                자세히 보기
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // 평가 버튼 렌더링 함수
  const renderEvaluationButtons = () => {
    const handleStarClick = (score: number) => {
      onEvaluationSubmit?.(score, messageObj.id);
    };

    return (
      <div className="mt-4 rounded-xl bg-gray-50 p-4">
        <div className="mb-3 text-center">
          <p className="text-sm font-medium text-gray-700">이 답변이 도움이 되었나요?</p>
          <p className="mt-1 text-xs text-gray-500">별점을 선택해주세요 (1-5점)</p>
        </div>
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((score) => (
            <button
              key={score}
              onClick={() => handleStarClick(score)}
              className="group flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:bg-yellow-100"
            >
              <svg
                className="h-6 w-6 text-gray-300 transition-colors duration-200 group-hover:text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    );
  };

  if (isBot) {
    return (
      <div className="mb-6 w-full">
        <div className="w-full bg-transparent py-6">
          <div className="mx-auto max-w-4xl px-6">
            <div className="flex items-start space-x-4">
              <div className="flex-1 leading-relaxed text-gray-800">
                {/* 기본 콘텐츠 */}
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                    {messageObj.content}
                  </ReactMarkdown>
                </div>

                {/* 타입별 추가 콘텐츠 */}
                {messageObj.type === 'RESULT' && messageObj.ids && messageObj.ids.length > 0 && (
                  <div className="mt-6">
                    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                      {messageObj.ids.map((id) => {
                        const property = properties.find((p) => p.propertyId === id);
                        return property ? renderPropertyCard(property) : null;
                      })}
                    </div>
                  </div>
                )}

                {messageObj.type === 'POLICY' && (
                  <div className="mt-4 rounded-xl border-l-4 border-blue-500 bg-blue-50 p-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-blue-800">정책 정보</p>
                      </div>
                    </div>
                  </div>
                )}

                {messageObj.type === 'EVALUATION' && renderEvaluationButtons()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mb-6 flex justify-end">
        <div className="mx-auto flex w-full max-w-4xl justify-end">
          <div className="flex max-w-[85%] items-start space-x-4">
            <div
              className={`rounded-2xl px-5 py-4 leading-relaxed ${
                isPending ? 'bg-gray-200 text-gray-700 opacity-70' : 'bg-gray-200 text-gray-800'
              }`}
            >
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                  {messageObj.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
