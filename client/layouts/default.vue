<script setup>
import HamburgerIsLogin from '~/components/layouts/HamburgerIsLogin.vue';
import HamburgerIsLogout from '~/components/layouts/HamburgerIsLogout.vue';
import HamburgerSubMenu from '~/components/layouts/HamburgerSubMenu.vue';
import { getUserInfoStore } from '~/stores/auth/loginStore.ts';

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
      <q-toolbar class="relative-position">
        <q-toolbar-title class="text-center">
          <nuxt-link
            clickable
            class="text-white"
            to="/"
          >
            BIGGATE
          </nuxt-link>
        </q-toolbar-title>

        <q-btn
          class="absolute-right"
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
        class="text-white"
        indicator-color="yellow"
        active-color="yellow"
      >
        <q-route-tab
          to="/cms"
          label="home"
          class="text-white"
        />
        <q-route-tab
          to="/cms/contentManage/thumbnail"
          label="thumbnail"
          class="text-white"
        />
        <q-route-tab
          to="/cms/contentManage/menu"
          label="menu"
          class="text-white"
        />
        <q-route-tab
          to="/cms/contentManage/board"
          label="board"
          class="text-white"
        />
        <!-- <q-route-tab
          to="/cms/order"
          label="order"
          class="text-white"
        /> -->
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

    <q-page-container
      :class="route.path.includes('/cms') || route.path.includes('/board') ?'inner':''"
    >
      <slot />
    </q-page-container>

    <q-footer
      bordered
      class="bg-grey-8 text-white"
    >
      <q-toolbar>
        <q-card-section>
          <div class="text-weight-thin mB5">
            제작 : Biggate
          </div>
          <div class="text-weight-thin mB5">
            Github :
            <nuxt-link
              to="https://github.com/dae-eun"
              class="text-white"
            >
              https://github.com/dae-eun
            </nuxt-link>
          </div>
          <div class="text-weight-thin mB5">
            OpenKakao :
            <nuxt-link
              to="https://open.kakao.com/o/sCLU5xwg"
              class="text-white"
            >
              메세지하기
            </nuxt-link>
          </div>
        </q-card-section>
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
