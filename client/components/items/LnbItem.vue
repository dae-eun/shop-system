<script setup>
const route = useRoute();
const menuTree = defineModel('menuTree', { type: Array, required: true });

const selectActive = (...path) => {
  const folder = route.path;
  return !!path.find((v) => {
    return folder.includes(v);
  });
};
</script>

<template>
  <q-card-section
    v-for="menu of menuTree"
    :key="menu.menuId"
    class="R0 L0 T0 B0"
    :class="[
      { active: selectActive(menu?.url) },
      menu.level===1?'':'mL10',
      menu.level?`depth${menu.level}`:'',
    ]"
  >
    <q-list>
      <template v-if="menu.children">
        <q-expansion-item
          :label="menu.menuNm"
          class="active"
        >
          <LnbItem v-model:menuTree="menu.children" />
        </q-expansion-item>
      </template>
      <template v-else>
        <q-item class="row items-center">
          <nuxt-link
            class="full-height"
            :to="menu.url+'/'+menu.menuId"
          >
            {{ menu.menuNm }}
          </nuxt-link>
        </q-item>
      </template>
    </q-list>
  </q-card-section>
</template>

<style lang="scss" scoped>
.depth1{
  margin-left: 0px;
}
</style>
