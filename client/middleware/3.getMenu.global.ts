import { getUserMenuStore } from '~/stores/user/userMenuStore';

export default defineNuxtRouteMiddleware(async () => {
  try {
    if (!getUserMenuStore().menuInfo.length) {
      await getUserMenuStore().getData();
    }
  } catch (error) {
    console.error('Failed to get user menu:', error);
  }
});
