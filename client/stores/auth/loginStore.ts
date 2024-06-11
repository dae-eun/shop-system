import { defineStore } from 'pinia';

interface User {
  userName: string
  email: string
  password: string
  phoneNumber: string
  postNum: string
  addr1: string
  addr2: string
}
interface SystemError {
  code: string
  message: string
}
export const useAuthStore = defineStore('login', {
  state: () => ({
    user: {},
    error: '',
    status: '',
    isLogin: false,
    token: '',
  }),
  actions: {
    async login(userInfo: User) {
      try {
        const response = await $fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userInfo),
        }) as Response;

        this.user = response.user;
        this.token = response.token;
        useCookie('token').value = response.token;
        this.isLogin = true;
        this.status = 'success';
      } catch (error) {
        const err = error as SystemError;
        this.status = 'error';
        this.error = err.message;
      }
    },
    logout() {
      this.user = {};
      useCookie('token').value = null;
      this.isLogin = false;
      this.status = '';
    },
    async checkAuth() {
      const token = useCookie('token').value;
      if (token) {
        try {
          console.debug('token: ' + token);
          const response = await $fetch('/api/auth/verifyToken', {
            method: 'POST',
            body: JSON.stringify({ token }),
          }) as Response;

          this.user = response.user;
          this.token = response.token;
          this.isLogin = true;
          this.status = 'success';
        } catch (error) {
          console.debug(error);
          this.logout();
        }
      }
    },
  },
});
