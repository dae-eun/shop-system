<script setup>
import BoardInfoViewer from '~/components/cms/BoardInfoViewer.vue';
import MenuController from '~/components/cms/MenuController.vue';
import MenuInfoViewer from '~/components/cms/MenuInfoViewer.vue';
import { controllMenuStore } from '~/stores/menu/menuStore';

const route = useRoute();
const splitterModel = ref(30);

const menuTree = ref([]);
const selected = ref(null);
const targetMenu = ref({});
const prevMenu = ref({}); // 메뉴타겟 이전 아이템
const nextMenu = ref({}); // 메뉴타겟 다음 아이템
const targetDeps = ref(null);

// 트리 조회
const findTreeTarget = (tree, targetId) => {
  if (tree.menuId === targetId) {
    return tree;
  }
  if (tree.children) {
    for (const child of tree.children) {
      const result = findTreeTarget(child, targetId);
      if (result) {
        return result;
      }
    }
  }
  return null;
};
// 트리 정보 조회
const getTreeTargetInfo = (menuId) => {
  if (!menuId) {
    targetMenu.value = {};
    targetDeps.value = null;
    prevMenu.value = {};
    nextMenu.value = {};
    return;
  }
  const targetItem = findTreeTarget(menuTree.value[0], menuId);
  const upperItem = findTreeTarget(menuTree.value[0], targetItem.upperMenuId);
  const targetIndex = upperItem?.children.findIndex(item => item === targetItem);
  // const targetArrayIndexLength = upperItem.children.length;
  prevMenu.value = upperItem?.children?.[targetIndex - 1];
  nextMenu.value = upperItem?.children?.[targetIndex + 1];
  targetDeps.value = targetItem.level;
  targetMenu.value = targetItem;
};

const reset = () => {
  menuTree.value = controllMenuStore().getMenuTree;
  selected.value = null;
  targetMenu.value = {};
  prevMenu.value = {};
  nextMenu.value = {};
  targetDeps.value = null;
};

const render = ref(false);
const callMenuTree = async () => {
  await controllMenuStore().getData().then(() => {
    if (controllMenuStore().statusCode !== 200) throw controllMenuStore().error;
    reset();
  });
  render.value = true;
};

onMounted(async () => {
  await callMenuTree();
});
</script>

<template>
  <div v-if="render">
    <q-splitter
      v-model="splitterModel"
    >
      <template #before>
        <q-card-section class="mT20">
          <template v-if="route?.params.type==='menu'">
            <MenuController
              v-model:menuTree="menuTree"
              v-model:targetMenu="targetMenu"
              v-model:selected="selected"
            />
          </template>
        </q-card-section>
        <div class="q-ma-md">
          <q-scroll-area
            style="height: 600px"
          >
            <q-tree
              v-model:selected="selected"
              :nodes="menuTree"
              default-expand-all
              node-key="menuId"
              selected-color="primary"
              @update:selected="getTreeTargetInfo"
            >
              <template #header-board="prop">
                <div>
                  {{ prop.node.label }} (게시판)
                </div>
              </template>
            </q-tree>
          </q-scroll-area>
        </div>
      </template>

      <template #after>
        <template v-if="route?.params.type==='menu'">
          <MenuInfoViewer
            v-model:menuTree="menuTree"
            v-model:targetMenu="targetMenu"
            v-model:selected="selected"
          />
        </template>
        <template v-if="route?.params.type==='board'">
          <BoardInfoViewer
            v-model:targetMenu="targetMenu"
          />
        </template>
      </template>
    </q-splitter>
  </div>
</template>

<style lang="scss" scoped>
</style>
