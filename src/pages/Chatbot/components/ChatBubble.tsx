/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatBubbleProps {
  message: string;
  isBot: boolean;
  isPending?: boolean;
}

export default function ChatBubble({ message, isBot, isPending = false }: ChatBubbleProps) {
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

  if (isBot) {
    return (
      <div className="mb-6 w-full">
        <div className="w-full bg-transparent py-6">
          <div className="mx-auto max-w-4xl px-6">
            <div className="flex items-start space-x-4">
              <div className="flex-1 leading-relaxed text-gray-800">
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                    {message}
                  </ReactMarkdown>
                </div>
                {isPending && <span className="ml-2 inline-block h-2 w-2 animate-pulse rounded-full bg-gray-400" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    // 사용자 메시지 - ChatGPT 스타일 버블
    return (
      <div className="mb-6 flex justify-end">
        <div className="mx-auto flex w-full max-w-4xl justify-end">
          <div className="flex max-w-[85%] items-start space-x-4">
            {/* 사용자 메시지 */}
            <div
              className={`rounded-2xl px-5 py-4 leading-relaxed ${
                isPending ? 'bg-gray-200 text-gray-700 opacity-70' : 'bg-gray-200 text-gray-800'
              }`}
            >
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                  {message}
                </ReactMarkdown>
              </div>
              {isPending && <span className="ml-2 inline-block h-2 w-2 animate-pulse rounded-full bg-gray-500" />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
