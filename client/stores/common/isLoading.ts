import { defineStore } from 'pinia';

export const useLoading = defineStore('isLoading', {
  state: () => ({
    isLoading: false,
  }),
  actions: {
    setLoading(boolean: boolean) {
      this.isLoading = boolean;
    },
  },
});
