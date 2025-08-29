export default function LoadingSpinner() {
  return (
    <div className="inset-0 z-50 flex h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center space-y-6">
        {/* 로고 */}
        <div className="text-2xl font-bold text-gray-900">Geo-Fit</div>

        {/* 스피너 컨테이너 */}
        <div className="relative">
          {/* 외부 원 */}
          <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>

          {/* 회전하는 내부 원 - 블루 그라데이션 */}
          <div className="absolute top-0 left-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-400"></div>

          {/* 중앙 아이콘 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-6 w-6 rotate-45 transform rounded-sm bg-gradient-to-br from-blue-500 to-green-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
