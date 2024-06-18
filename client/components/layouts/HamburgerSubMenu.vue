<script setup>
import LnbItem from '~/components/items/LnbItem.vue';
import { controllMenuStore } from '~/stores/user/menuStore';

const render = ref(false);
const menuTree = ref([]);
const callMenuTree = async () => {
  await controllMenuStore().getData().then(() => {
    if (controllMenuStore().statusCode !== 200) throw controllMenuStore().error;
    menuTree.value = controllMenuStore().getMenuTree?.[0].children;
  });
  render.value = true;
};
onMounted(async () => {
  await callMenuTree();
});
</script>

<template>
  <div>
    <LnbItem v-model:menuTree="menuTree" />
  </div>
</template>

<style lang="scss" scoped>
.q-expansion-item {
  &.active {
    >*{
    }
    .q-item__section--side > .q-icon {
      color: white;
      font-size: 24px;
    }
  }
}
</style>
