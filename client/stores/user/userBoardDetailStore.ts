import { defineStore } from 'pinia';
import type { RequestOptions } from '~/composables/api/index';
import { useFetchBase } from '~/composables/api/index';

interface SystemError {
  code: string
  message: string
}
interface QueryData {
  boardId: number
}
export const getUserBoardDetailStore = defineStore('getUserBoardDetailStore', {
  state: () => ({
    boardInfo: {},
    statusCode: null,
    message: '',
    error: '',
  }),
  actions: {
    async getDetailData(query: QueryData) {
      try {
        const { statusCode, message, boardInfo } = await useFetchBase('/api/user/userBoard', {
          method: 'GET',
          query,
        } as RequestOptions);
        this.statusCode = statusCode;
        this.message = message;
        if (statusCode === 200) {
          this.boardInfo = boardInfo || {};
        }
        return this.$state;
      } catch (error) {
        const err = error as SystemError;
        this.error = err.message;
      }
    },
  },
  getters: {
    getBoardDetailInfo(): any {
      return this.boardInfo;
    },
  },
});
