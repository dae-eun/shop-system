import { getUserInfoStore } from '~/stores/auth/loginStore';

export default defineNuxtRouteMiddleware(async () => {
  const user = useSupabaseUser();
  const authStore = getUserInfoStore();
  authStore.isMiddlewareLoaded = false;
  if (!user.value) return authStore.isMiddlewareLoaded = true;
  if (!authStore.isLogin) {
    await authStore.getUserInfo();
    authStore.isMiddlewareLoaded = true;
  }
});
