import { defineStore } from 'pinia';

interface User {
  userName: string
  email: string
  phoneNumber: string
  postNum: string
  addr1: string
  addr2: string
}
interface UserCheckResponse {
  statusCode: number
  message: string
  userInfo?: User
}

interface SystemError {
  code: string
  message: string
}
export const getUserInfoStore = defineStore('getUserInfo', {
  state: () => ({
    userInfo: null as User | null,
    statusCode: null as Number | null,
    message: '',
    error: '',
    isLogin: false,
    isMiddlewareLoaded: false,
  }),
  actions: {
    async getUserInfo() {
      try {
        const { statusCode, message, userInfo } = await $fetch('/api/auth/getUserInfo', {
          method: 'POST',
        }) as UserCheckResponse;

        this.statusCode = statusCode;
        this.message = message;
        if (statusCode === 200) {
          this.userInfo = userInfo || null;
          this.isLogin = true;
        }
        return this.$state;
      } catch (error) {
        const err = error as SystemError;
        this.error = err.message;
      }
    },
    logout() {
      this.userInfo = null;
      this.statusCode = null;
      this.message = '';
      this.error = '';
      this.isLogin = false;
    },
  },
});
