import { useAuthStore } from '~/stores/auth/loginStore';

export default defineNuxtRouteMiddleware(async () => {
    const authStore = useAuthStore();
    if(!authStore.isLogin){
        await authStore.checkAuth();
    }
})