import { defineStore } from 'pinia';
import { useFetchBase } from '~/composables/api/index';

interface ThumbData {
  thumbId?: Number
  title: String
  attachmentType: String
  fileName: String
  filePath: String
  size: String
  uploadDate?: String
  fileUid: String
  useAt: Boolean
  sortOrdr: Number
}
interface ThumbResponse {
  statusCode: number
  message: string
  thumbInfo?: []
}
interface SystemError {
  code: string
  message: string
}

export const thumbStore = defineStore('thumbStore', {
  state: () => ({
    thumbInfo: [] as ThumbData[],
    statusCode: null as number | null,
    message: '',
    error: '',
  }),
  actions: {
    async getData() {
      try {
        const { statusCode, message, thumbInfo } = await useFetchBase('/api/cms/thumb', {
          method: 'GET',
        }) as ThumbResponse;
        this.statusCode = statusCode;
        this.message = message;
        if (statusCode === 200) {
          this.thumbInfo = thumbInfo || [];
        }
        return this.$state;
      } catch (error) {
        const err = error as SystemError;
        this.error = err.message;
      }
    },
    async insertData(thumbInfo: ThumbData) {
      try {
        const { statusCode, message } = await useFetchBase('/api/cms/thumb', {
          method: 'POST',
          body: JSON.stringify(thumbInfo),
        }) as ThumbResponse;

        this.statusCode = statusCode;
        this.message = message;
        return this.$state;
      } catch (error) {
        const err = error as SystemError;
        this.error = err.message;
      }
    },
    async deleteData(thumbId: number) {
      try {
        const { statusCode, message } = await useFetchBase('/api/cms/thumb', {
          method: 'DELETE',
          body: JSON.stringify({ thumbId }),
        }) as ThumbResponse;
        this.statusCode = statusCode;
        this.message = message;
        return this.$state;
      } catch (error) {
        const err = error as SystemError;
        this.error = err.message;
      }
    },
  },
});
