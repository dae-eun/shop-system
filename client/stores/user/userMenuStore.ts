import { defineStore } from 'pinia';
import { useFetchBase } from '~/composables/api/index';

interface Menu {
  children?: Menu[]
  label?: string
  menuId: number
  menuNm: string
  upperMenuId: number
  level: number
  url: string
  menuType: string
  pageType: string
  boardType: string
  sortOrdr: number
  useAt: boolean
  header?: string
}

interface MenuResponse {
  statusCode: number
  message: string
  menuInfo?: Menu[]
}

interface SystemError {
  code: string
  message: string
}

export const controllMenuStore = defineStore('controllMenuStore', {
  state: () => ({
    menuInfo: [] as Menu[],
    statusCode: null as number | null,
    message: '',
    error: '',
  }),
  actions: {
    async getData() {
      try {
        const { statusCode, message, menuInfo } = await useFetchBase('/api/user/userMenu', {
          method: 'GET',
        }) as MenuResponse;
        this.statusCode = statusCode;
        this.message = message;
        if (statusCode === 200) {
          this.menuInfo = menuInfo || [];
          this.menuInfo.map((el) => {
            el.label = el.menuNm;
            el.header = el.menuType;
          });
        }
        return this.$state;
      } catch (error) {
        const err = error as SystemError;
        this.error = err.message;
      }
    },
  },
  getters: {
    getMenu(state) {
      return state.menuInfo;
    },
    getMenuTree(state) {
      const tree: Menu[] = [];
      const lookup: { [key: number]: Menu } = {};

      // 각 메뉴 항목을 초기화하여 lookup 객체에 저장
      state.menuInfo.forEach((menu) => {
        lookup[menu.menuId] = { ...menu };
      });

      // 트리 구조 형성
      state.menuInfo.forEach((menu) => {
        if (menu.upperMenuId) {
          const upperItem = lookup[menu.upperMenuId];
          if (!upperItem.children) {
            upperItem.children = [];
          }
          upperItem.children.push(lookup[menu.menuId]);
        } else {
          tree.push(lookup[menu.menuId]);
        }
      });

      return tree;
    },
  },
});
