import { apiClient } from '..';

interface GetPresignedUrlResponse {
  url: string;
  key: string;
}

interface UploadFileResponse {
  url: string;
}

export const filesApi = {
  getPresignedUrl: async (file: File) =>
    await apiClient.get<GetPresignedUrlResponse>('files/presign-upload', {
      params: {
        filename: file.name,
        contentType: file.type,
      },
      headers: {
        'Content-Type': file.type,
      },
    }),
  uploadFile: async (url: string, file: File): Promise<UploadFileResponse> =>
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    }),

  downloadFile: async (key: string) => await apiClient.get<{ url: string }>(`files/presign-download?key=${key}`),
};
