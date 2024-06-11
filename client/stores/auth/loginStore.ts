import { defineStore } from "pinia";

interface User {
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  postNum: string;
  addr1: string;
  addr2: string;
}
interface SystemError {
  code: string;
  message: string;
}
export const useAuthStore = defineStore("login", {
  state: () => ({
    user: {},
    error: '',
    status: '',
    token: '',
  }),
  actions: {
    async login(userInfo: User) {
      try {
        const response = await $fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        }) as Response;
    
        this.user = response.user;
        this.token = response.token;
        useCookie("token").value = response.token;
        this.status = 'success'

      } catch (error) {
        const err = error as SystemError;
        this.status = 'error'
        this.error = err.message;
      }
    },
    logout() {
      this.user = {};
      useCookie("token").value = null;
      this.status = ''
    },
    async checkAuth() {
      const token = useCookie("token").value;
      if (token) {
        try {
          console.log('token: '+ token)
          const response = await $fetch("/api/auth/verifyToken", {
            method: "POST",
            body: JSON.stringify({ token }),
          }) as Response;

          this.user = response.user;
          this.token = response.token;
          this.status = 'success'

        } catch (error) {
          console.log(error);
          // this.logout();
        }
      }
    }
  },
});
