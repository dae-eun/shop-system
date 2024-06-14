<script setup>
import HamburgerIsLogin from '~/components/layouts/HamburgerIsLogin';
import HamburgerIsLogout from '~/components/layouts/HamburgerIsLogout';
import HamburgerSubMenu from '~/components/layouts/HamburgerSubMenu';
import { getUserInfoStore } from '~/stores/auth/loginStore';

const route = useRoute();
const rightDrawerOpen = ref(false);
const isLoaded = ref(false);
onMounted(() => {
  if (getUserInfoStore().isMiddlewareLoaded) {
    isLoaded.value = true;
  }
});
</script>

<template>
  <q-layout view="hHh lpR ffr">
    <q-header class="bg-secondary text-white">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          <nuxt-link
            clickable
            to="/"
          >
            Platform Name
          </nuxt-link>
        </q-toolbar-title>

        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="rightDrawerOpen = !rightDrawerOpen"
        />
      </q-toolbar>
      <q-tabs
        v-if="route.path.includes('/cms')"
        align="left"
      >
        <q-route-tab
          to="/cms"
          label="home"
        />
        <q-route-tab
          to="/cms/contentManage/menu"
          label="menu"
        />
        <q-route-tab
          to="/cms/contentManage/board"
          label="board"
        />
        <q-route-tab
          to="/cms/order"
          label="order"
        />
      </q-tabs>
    </q-header>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      overlay
      behavior="mobile"
      elevated
    >
      <template v-if="isLoaded">
        <HamburgerIsLogout v-if="!getUserInfoStore().isLogin" />
        <HamburgerIsLogin v-else />
        <HamburgerSubMenu />
      </template>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container :class="route.path.includes('/cms')?'inner':''">
      <slot />
    </q-page-container>

    <q-footer
      bordered
      class="bg-grey-8 text-white"
    >
      <q-toolbar>
        <q-toolbar-title>
          <div>작업 중...</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style lang="scss" scoped>
  .inner {
    width: 1280px;
    margin: 0 auto;
  }
</style>
