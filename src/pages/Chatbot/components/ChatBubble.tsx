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
        <div className="bg-gray-800 text-gray-100 rounded-md p-3 my-2 overflow-x-auto">
          <div className="text-xs text-gray-400 mb-2">{match[1]}</div>
          <code className="text-sm" {...props}>
            {children}
          </code>
        </div>
      ) : (
        <code 
          className={`${
            isBot 
              ? 'bg-gray-100 text-red-600 px-1 py-0.5 rounded text-sm' 
              : 'bg-white bg-opacity-20 px-1 py-0.5 rounded text-sm'
          }`} 
          {...props}
        >
          {children}
        </code>
      );
    },
    
    // 헤딩 스타일링
    h1: ({ children }: any) => (
      <h1 className="text-xl font-bold mb-2 mt-4 first:mt-0">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-lg font-bold mb-2 mt-3 first:mt-0">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-md font-bold mb-1 mt-2 first:mt-0">{children}</h3>
    ),
    
    // 리스트 스타일링
    ul: ({ children }: any) => (
      <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>
    ),
    
    // 링크 스타일링
    a: ({ children, href }: any) => (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`${
          isBot 
            ? 'text-blue-600 hover:text-blue-800 underline' 
            : 'text-blue-200 hover:text-white underline'
        }`}
      >
        {children}
      </a>
    ),
    
    // 인용구 스타일링
    blockquote: ({ children }: any) => (
      <blockquote className={`border-l-4 pl-4 italic my-2 ${
        isBot ? 'border-gray-300' : 'border-white border-opacity-50'
      }`}>
        {children}
      </blockquote>
    ),
    
    // 테이블 스타일링
    table: ({ children }: any) => (
      <div className="overflow-x-auto my-2">
        <table className="min-w-full border-collapse">{children}</table>
      </div>
    ),
    th: ({ children }: any) => (
      <th className={`border px-3 py-2 font-semibold text-left ${
        isBot ? 'border-gray-300 bg-gray-50' : 'border-white border-opacity-50'
      }`}>
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className={`border px-3 py-2 ${
        isBot ? 'border-gray-300' : 'border-white border-opacity-50'
      }`}>
        {children}
      </td>
    ),
    
    // 문단 간격
    p: ({ children }: any) => (
      <p className="mb-2 last:mb-0">{children}</p>
    ),
  };

  return (
    <div className={`mb-6 ${isBot ? 'flex justify-start' : 'flex justify-end'}`}>
      <div className={`flex items-start max-w-[85%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        {isBot && (
          <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 flex-shrink-0 mt-1">
            AI
          </div>
        )}
        <div className={`px-5 py-4 rounded-2xl ${
          isBot 
            ? 'bg-white border border-gray-200 shadow-sm text-gray-800' 
            : isPending
              ? 'bg-blue-400 text-white ml-3 shadow-sm opacity-70'
              : 'bg-blue-600 text-white ml-3 shadow-sm'
        }`}>
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {message}
            </ReactMarkdown>
          </div>
          {isPending && (
            <span className="ml-2 inline-block w-2 h-2 bg-white rounded-full opacity-50 animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
};