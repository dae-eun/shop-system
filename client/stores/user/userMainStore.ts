import { defineStore } from 'pinia';
import { useFetchBase } from '~/composables/api/index';

interface Menu {
  boardInfo?: []
  label?: String
  menuId: Number
  menuNm: String
  upperMenuId: Number
  level: Number
  url: String
  menuType: String
  pageType: String
  boardType: String
  sortOrdr: Number
  useAt: Boolean
  header?: String
}
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
  link: String
}

interface Response {
  statusCode: Number
  message: String
  menuInfo?: Menu[]
  thumbInfo?: ThumbData[]
}

interface SystemError {
  code: String
  message: String
}

export const getUserMainStore = defineStore('getUserMainStore', {
  state: () => ({
    menuInfo: [] as Menu[],
    thumbInfo: [] as ThumbData[],
    statusCode: null as number | null,
    message: '',
    error: '',
  }),
  actions: {
    async getData() {
      try {
        const { statusCode, message, menuInfo, thumbInfo } = await useFetchBase('/api/user/userMain', {
          method: 'GET',
        }) as Response;
        this.statusCode = statusCode;
        this.message = message;
        if (statusCode === 200) {
          this.menuInfo = menuInfo || [];
          this.thumbInfo = thumbInfo || [];
        }
        return this.$state;
      } catch (error) {
        const err = error as SystemError;
        this.error = err.message;
      }
    },
  },
  getters: {
    getThumbInfo(state) {
      return state.thumbInfo;
    },
    getMenuMainContent(state) {
      const arr = state.menuInfo.filter((menu: Menu) => menu.boardInfo.length > 0);
      const result = [];
      const typeContent = arr.filter((menu: Menu) => menu.boardType === 'Content');
      const typeOther = arr.filter((menu: Menu) => menu.boardType !== 'Content');
      if (!typeContent.length || !typeOther.length) return arr;

      let contentQueue: Menu[] = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].boardType === 'Content') {
          if (contentQueue.length < 2) {
            contentQueue.push(arr[i]);
          }
          if (contentQueue.length >= 2) {
            result.push(...contentQueue);
            contentQueue = [];
          }
        } else if (arr[i].boardType !== 'Content') {
          result.push(arr[i]);
        }
      }

      if (contentQueue.length > 0) {
        result.push(...contentQueue);
      }

      return result;
    },
  },
});
