import { filesApi } from '@/api/files';
import { useState } from 'react';

export const useUploadImages = () => {
  const [keys, setKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { getPresignedUrl, uploadFile } = filesApi;

  const uploadImages = async (files: File[]) => {
    setLoading(true);
    setError(null);

    try {
      const uploadPromises = files.map(async (file) => {
        // 1. Presigned URL 요청
        const presignedResponse = await getPresignedUrl(file);
        const { url: presignedUrl, key } = presignedResponse;

        // 2. S3에 파일 업로드
        await uploadFile(presignedUrl, file);
        return key;
      });

      const uploadKeys = await Promise.all(uploadPromises);
      setKeys((prev) => [...prev, ...uploadKeys]);

      return uploadKeys;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadSingleImage = async (file: File) => {
    const [url] = await uploadImages([file]);
    return url;
  };

  const clearUrls = () => setKeys([]);
  const removeUrl = (index: number) => {
    setKeys((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    keys,
    loading,
    error,
    uploadImages,
    uploadSingleImage,
    clearUrls,
    removeUrl,
  };
};
