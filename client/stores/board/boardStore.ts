import { defineStore } from 'pinia';

interface BoardData {
  menuId: Number
  title: String
  content: String
  writer: String
  useAt: Boolean
};
interface boardResponse {
  statusCode: number
  message: string
  boardInfo?: []
}

interface SystemError {
  code: string
  message: string
}

export const controllBoardStore = defineStore('controllBoardStore', {
  state: () => ({
    boardInfo: [],
    statusCode: null as number | null,
    message: '',
    error: '',
  }),
  actions: {
    async getData(menuId: number) {
      try {
        const { statusCode, message, boardInfo } = await $fetch(`/api/cms/board?menuId=${menuId}`, {
          method: 'GET',
        }) as boardResponse;
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
    async insertData(boardInfo: BoardData) {
      try {
        const response = await $fetch('/api/cms/board', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(boardInfo),
        }) as boardResponse;

        const { statusCode, message } = response;
        this.statusCode = statusCode;
        this.message = message;
        return this.$state;
      } catch (error) {
        const err = error as SystemError;
        this.error = err.message;
      }
    },
    async updateData(boardInfo: BoardData) {
      try {
        const response = await $fetch('/api/cms/board', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(boardInfo),
        }) as boardResponse;

        const { statusCode, message } = response;
        this.statusCode = statusCode;
        this.message = message;
        return this.$state;
      } catch (error) {
        const err = error as SystemError;
        this.error = err.message;
      }
    },
    async deleteData(boardId: number) {
      try {
        const { statusCode, message } = await $fetch(`/api/cms/board`, {
          method: 'DELETE',
          body: JSON.stringify({ boardId }),
        }) as boardResponse;
        this.statusCode = statusCode;
        this.message = message;
        return this.$state;
      } catch (error) {
        const err = error as SystemError;
        this.error = err.message;
      }
    },
  },
  getters: {
    getBoard(state) {
      return state.boardInfo;
    },
  },
});
