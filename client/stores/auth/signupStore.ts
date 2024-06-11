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
export const useAuthStore = defineStore('signup', {
  state: () => ({
    user: {},
    status: '',
    error: '',
  }),
  actions: {
    async signup(userInfo: User) {
      this.status = 'loading';
      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userInfo),
        });

        if (!response.ok) throw new Error(response.statusText);

        const data = await response.json();
        this.user = data.user;
        this.status = 'success';
      } catch (error) {
        const err = error as SystemError;
        this.error = err.message;
        this.status = 'error';
      }
    },
  },
});
