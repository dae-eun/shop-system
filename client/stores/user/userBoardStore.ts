import { defineStore } from 'pinia';
import { useFetchBase } from '~/composables/api/index';

export const getUserBoardStore = defineStore('getUserBoardStore', {
  state: () => ({
    boardInfo: [],
    statusCode: null,
    message: '',
    error: '',
  }),
  actions: {
    async getData(query) {
      try {
        const { statusCode, message, boardInfo } = await useFetchBase(`/api/user/userBoard?menuId=${query}`, {
          method: 'GET',
        });
        this.statusCode = statusCode;
        this.message = message;
        if (statusCode === 200) {
          this.boardInfo = boardInfo || [];
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
  },
});
