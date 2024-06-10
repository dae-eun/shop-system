<script setup>
import HamburgerSubMenu from "~/components/layouts/HamburgerSubMenu";
import HamburgerLogin from "~/components/layouts/HamburgerLogin";
import HamburgerLogout from "~/components/layouts/HamburgerLogout";
const rightDrawerOpen = ref(false);
</script>

<template>
  <q-layout view="hHh lpR ffr">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          <nuxt-link clickable to="/"> Platform Name </nuxt-link>
        </q-toolbar-title>

        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="rightDrawerOpen = !rightDrawerOpen"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      overlay
      behavior="mobile"
      elevated
    >
      <HamburgerLogout />
      <HamburgerLogin />
      <HamburgerSubMenu />
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <slot />
    </q-page-container>

    <q-footer bordered class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
