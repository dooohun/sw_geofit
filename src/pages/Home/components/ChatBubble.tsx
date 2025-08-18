export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: React.ReactNode;
  timestamp: Date;
}

interface ChatBubbleProps {
  message: ChatMessage;
  isBot: boolean;
}

export default function ChatBubble({ message, isBot }: ChatBubbleProps) {
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
            : 'bg-blue-600 text-white ml-3 shadow-sm'
        }`}>
          {message.content}
        </div>
      </div>
    </div>
  );
};