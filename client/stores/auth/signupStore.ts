import { defineStore } from 'pinia';

interface User {
  userName: string
  email: string
  phoneNumber: string
  postNum: string
  addr1: string
  addr2: string
}
interface SystemError {
  code: string
  message: string
}
export const useSignupStore = defineStore('signup', {
  state: () => ({
    userInfo: {},
    statusCode: null,
    message: '',
    error: '',
  }),
  actions: {
    async signup(userInfo: User) {
      try {
        const { statusCode, message, userInfo: resUserInfo } = await $fetch('/api/auth/signUp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userInfo),
        });

        this.statusCode = statusCode;
        this.message = message;
        if (statusCode === 201) this.userInfo = resUserInfo;
        return this.$state;
      } catch (error) {
        const err = error as SystemError;
        this.error = err.message;
      }
    },
  },
});
