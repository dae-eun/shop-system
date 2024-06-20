import { getUserInfoStore } from '~/stores/auth/loginStore';

export default defineNuxtRouteMiddleware((to) => {
  const nuxtApp = useNuxtApp();
  if (to.path.includes('/cms') && getUserInfoStore().userInfo?.auth !== 'admin') {
    return nuxtApp.runWithContext(() => navigateTo('/'));
  }
});
