import { apiClient } from '..';

interface UploadFileParams {
  filename: string;
  contentType: string;
}

export const filesApi = {
  getPresignedUrl: async (file: UploadFileParams) =>
    await apiClient.get('files/presign-upload', {
      params: {
        filename: file.filename,
        contentType: file.contentType,
      },
      headers: {
        'Content-Type': file.contentType,
      },
    }),
  uploadFile: async (url: string, file: File) => {
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/pdf',
      },
      body: file,
    });
  },
};
