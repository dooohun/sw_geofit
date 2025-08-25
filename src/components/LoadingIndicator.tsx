export default function LoadingIndicator() {
  return (
    <div className="mb-6 flex justify-start">
      <div className="flex items-start">
        <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-1">
          AI
        </div>
        <div className="bg-white border border-gray-200 px-5 py-4 rounded-2xl shadow-sm">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};