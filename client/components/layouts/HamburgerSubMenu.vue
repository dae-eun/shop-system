<script setup>
import LnbItem from '~/components/items/LnbItem.vue';
import { getUserMenuStore } from '~/stores/user/userMenuStore';

const render = ref(false);
const menuTree = ref([]);
const callMenuTree = async () => {
  await getUserMenuStore().getData().then(() => {
    if (getUserMenuStore().statusCode !== 200) throw getUserMenuStore().error;
    menuTree.value = getUserMenuStore().getMenuTree?.[0].children;
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
