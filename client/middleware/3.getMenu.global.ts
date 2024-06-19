import { getUserMenuStore } from '~/stores/user/userMenuStore';

export default defineNuxtRouteMiddleware(async () => {
  try {
    await getUserMenuStore().getData();
  } catch (error) {
    console.error('Failed to get user menu:', error);
  }
});
