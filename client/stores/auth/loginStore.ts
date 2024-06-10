import { defineStore } from "pinia";
interface User {
  email: string;
  password: string;
}
interface SystemError {
  code: string;
  message: string;
}
export const useAuthStore = defineStore("login", {
  state: () => ({
    user: {},
    token: '',
    status: "",
    error: '',
  }),
  actions: {
    async login(userInfo: User) {
      this.status = "loading";
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        });

        if (!response.ok) throw new Error(response.statusText);

        const data = await response.json();
        this.user = data.user;
        this.token = data.token;
        localStorage.setItem('token', this.token);
        this.status = "success";
      } catch (error) {
        const err = error as SystemError;
        this.error = err.message;
        this.status = "error";
      }
    },
    logout() {
      this.token = '';
      this.user = {};
      localStorage.removeItem('token');
    },
    async checkAuth() {
      // 로컬 스토리지에서 토큰을 가져옵니다.
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // 서버에 토큰 검증 요청을 보냅니다.
          const response = await fetch('/api/verify-token', {
            method: 'POST',
            body: JSON.stringify({ token })
          });
          
          if (!response.ok) throw new Error(response.statusText);
          const data = await response.json();
          this.user = data.user;
          this.token = data.token;
        } catch (error) {
          this.logout();
        }
      }
    }
  },
});
