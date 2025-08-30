import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SuccessModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* 모달 내용 */}
      <div className="relative mx-4 w-full max-w-md transform rounded-2xl bg-white shadow-2xl transition-all">
        <div className="p-8 text-center">
          {/* 성공 아이콘 */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* 제목과 설명 */}
          <h2 className="mb-2 text-2xl font-bold text-gray-900">등록 완료!</h2>
          <p className="mb-8 text-gray-600">
            매물이 성공적으로 등록되었습니다.
            <br />
            AI 분석 리포트가 생성되었습니다.
          </p>

          {/* 버튼 그룹 */}
          <div className="space-y-3">
            <button
              onClick={() => navigate('/property-search')}
              className="w-full rounded-lg bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
            >
              매물 조회하기
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full rounded-lg bg-gray-100 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              메인으로 돌아가기
            </button>
          </div>
        </div>

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
