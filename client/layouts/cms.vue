<script setup>
import HamburgerIsLogin from '~/components/layouts/HamburgerIsLogin';
import HamburgerIsLogout from '~/components/layouts/HamburgerIsLogout';
import HamburgerSubMenu from '~/components/layouts/HamburgerSubMenu';
import { useAuthStore } from '~/stores/auth/loginStore';

const rightDrawerOpen = ref(false);
</script>

<template>
  <q-layout view="hHh lpR ffr">
    <q-header class="bg-primary text-white">
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

      <q-tabs align="left">
        <q-route-tab
          to="/cms"
          label="home"
        />
        <q-route-tab
          to="/cms/menu"
          label="menu"
        />
        <q-route-tab
          to="/cms/board"
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
      <HamburgerIsLogout v-if="!useAuthStore().isLogin" />
      <HamburgerIsLogin v-else />
      <HamburgerSubMenu />
      <!-- drawer content -->
    </q-drawer>

    <q-page-container class="inner">
      <slot />
    </q-page-container>

    <q-footer
      bordered
      class="bg-grey-8 text-white"
    >
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style lang="scss" scoped>
  .inner {
    width: 1024px;
    margin: 0 auto;
  }
</style>
