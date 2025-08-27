import { useState } from 'react';

interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

export default function PropertyRegistration() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [contractFile, setContractFile] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = 5 - images.length;
    const filesToAdd = files.slice(0, remainingSlots);

    const newImages: ImageFile[] = filesToAdd.map((file) => ({
      id: Date.now() + Math.random().toString(),
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const imageToRemove = prev.find((img) => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  const handleContractUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setContractFile(file);
    }
  };

  const removeContract = () => {
    setContractFile(null);
  };

  const getImageGridClass = () => {
    const count = images.length;
    if (count <= 1) return 'grid-cols-1';
    if (count <= 2) return 'grid-cols-2';
    if (count <= 4) return 'grid-cols-2';
    return 'grid-cols-3';
  };

  const getImageSize = () => {
    const count = images.length;
    if (count === 1) return 'aspect-video';
    if (count <= 4) return 'aspect-square';
    return 'aspect-[4/3]';
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">매물 등록</h1>
          <p className="text-gray-600">AI가 최적의 창업자를 찾아드립니다</p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <div className="space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="mb-6 text-lg font-semibold text-gray-900">기본 정보</h2>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  주소 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="relative">
                    <select className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      <option>시/도 선택</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div className="relative">
                    <select className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      <option>시/군/구 선택</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div className="relative">
                    <select className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      <option>동/읍/면 선택</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="상세주소 (건물명, 호수 등)"
                  className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Property Type */}
            <div>
              <h2 className="mb-6 text-lg font-semibold text-gray-900">건물 유형</h2>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input type="radio" name="buildingType" className="mr-2" />
                  <span>근린상가</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="buildingType" className="mr-2" />
                  <span>오피스·업무</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="buildingType" className="mr-2" />
                  <span>주상복합·오피스텔 상가</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="buildingType" className="mr-2" />
                  <span>단독·다가구 1층 상가</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="buildingType" className="mr-2" />
                  <span>기타 복합·몰</span>
                </label>
              </div>
            </div>

            {/* Area and Floor */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  면적 <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="예: 30"
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <span className="text-gray-500">㎡</span>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  층수 <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <select className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      <option value="">선택</option>
                      <option value="지상">지상</option>
                      <option value="지하">지하</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <input
                    type="number"
                    placeholder="층수"
                    min="1"
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <span className="text-gray-500">층</span>
                </div>
              </div>
            </div>

            {/* Price Information */}
            <div>
              <h2 className="mb-6 text-lg font-semibold text-gray-900">가격 정보</h2>
              <div className="mb-6 grid grid-cols-2 gap-8">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    월세 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="예: 200"
                      className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <span className="text-gray-500">만원</span>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    보증금 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="예: 1000"
                      className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <span className="text-gray-500">만원</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">관리비</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    placeholder="예: 10"
                    className="rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <span className="text-gray-500">만원</span>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">협의 가능</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h2 className="mb-6 text-lg font-semibold text-gray-900">연락처</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    담당자명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="홍길동"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="010-0000-0000"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Property Photos */}
            <div>
              <h2 className="mb-6 text-lg font-semibold text-gray-900">매물 사진</h2>

              <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-gray-400">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  disabled={images.length >= 5}
                />
                <label
                  htmlFor="image-upload"
                  className={`cursor-pointer ${images.length >= 5 ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                  <svg
                    className="mx-auto mb-4 h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <p className="mb-2 text-gray-600">클릭하여 사진을 업로드하세요</p>
                  <p className="text-sm text-gray-500">최대 {5 - images.length}장까지 업로드 가능 (JPG, PNG)</p>
                </label>
              </div>
              {images.length > 0 && (
                <div className={`grid ${getImageGridClass()} mt-6 mb-6 justify-items-center gap-6`}>
                  {images.map((image) => (
                    <div
                      key={image.id}
                      className={`relative h-[200px] w-[200px] ${getImageSize()} overflow-hidden rounded-lg`}
                    >
                      <img src={image.preview} alt="Property" className="h-full w-full object-cover" />
                      <button
                        onClick={() => removeImage(image.id)}
                        className="absolute top-2 right-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contract Document */}
            <div>
              <h2 className="mb-6 text-lg font-semibold text-gray-900">임대차계약서</h2>

              <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-gray-400">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.hwp"
                  onChange={handleContractUpload}
                  className="hidden"
                  id="contract-upload"
                />
                <label htmlFor="contract-upload" className="cursor-pointer">
                  <svg
                    className="mx-auto mb-4 h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="mb-2 text-gray-600">임대차계약서를 업로드하세요</p>
                  <p className="text-sm text-gray-500">PDF, DOC, DOCX, HWP 형식의 파일 가능</p>
                </label>
              </div>
              {contractFile && (
                <div className="mt-6 mb-6 rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                        <svg className="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{contractFile.name}</p>
                        <p className="text-xs text-gray-500">{(contractFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button
                      onClick={removeContract}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 pt-6">
              <button className="flex-1 rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-300">
                취소
              </button>
              <button className="flex-1 rounded-lg bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800">
                매물 등록하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
