import { defineStore } from 'pinia';
import { useFetchBase } from '~/composables/api/index';

interface SystemError {
  code: string
  message: string
}
interface fileResponse {
  statusCode: number
  message: string
  uid?: string
  attachmentData?: []
}

export const fileStore = defineStore('fileStore', {
  state: () => ({
    statusCode: null as number | null,
    message: '',
    error: '',
    attachmentData: [] as [] | undefined,
  }),
  actions: {
    async insertFile(file: File) {
      try {
        const { statusCode, message, attachmentData } = await useFetchBase('/api/cms/file', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: JSON.stringify(file),
        }) as fileResponse;
        this.statusCode = statusCode;
        this.message = message;
        this.attachmentData = attachmentData;
        return this.$state;
      } catch (error) {
        const err = error as SystemError;
        this.error = err.message;
      }
    },
  },
});
