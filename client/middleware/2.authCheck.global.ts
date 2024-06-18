import { getUserInfoStore } from '~/stores/auth/loginStore';

export default defineNuxtRouteMiddleware(async () => {
  const user = useSupabaseUser();
  const authStore = getUserInfoStore();
  authStore.isMiddlewareLoaded = false;
  console.log(!user.value);
  console.log(!authStore.isLogin);
  if (!user.value) return authStore.isMiddlewareLoaded = true;
  if (!authStore.isLogin) {
    await authStore.getUserInfo();
    authStore.isMiddlewareLoaded = true;
  }
});
