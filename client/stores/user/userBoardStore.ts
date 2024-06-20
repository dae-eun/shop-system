import { defineStore } from 'pinia';
import { useFetchBase } from '~/composables/api/index';

interface SystemError {
  code: String
  message: String
}
export const getUserBoardStore = defineStore('getUserBoardStore', {
  state: () => ({
    boardInfo: [],
    menuInfo: [],
    statusCode: null,
    message: '',
    error: '',
  }),
  actions: {
    async getData(query) {
      try {
        const { statusCode, message, boardInfo, menuInfo } = await useFetchBase('/api/user/userBoard', {
          method: 'GET',
          query,
        });
        this.statusCode = statusCode;
        this.message = message;
        if (statusCode === 200) {
          this.boardInfo = boardInfo || [];
          this.menuInfo = menuInfo || [];
        }
        return this.$state;
      } catch (error) {
        const err = error as SystemError;
        this.error = err.message;
      }
    },
  },
  getters: {
    getBoardInfo() {
      return this.boardInfo;
    },
    getMenuInfo() {
      return this.menuInfo;
    },
  },
});
