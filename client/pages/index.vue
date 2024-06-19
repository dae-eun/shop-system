<script setup>
import ContentBox from '~/components/user/home/ContentBox.vue';
import VisualImgBox from '~/components/user/home/VisualImgBox.vue';
import { getUserMainStore } from '~/stores/user/userMainStore';

const boardList = ref([]);
const thumbInfo = ref([]);
onMounted(async () => {
  await getUserMainStore().getData();
  boardList.value = getUserMainStore().getMenuMainContent;
  thumbInfo.value = getUserMainStore().getThumbInfo;
});
</script>

<template>
  <div>
    <div id="visual">
      <VisualImgBox v-model:thumbInfo="thumbInfo" />
    </div>

    <div
      id="container"
    >
      <ContentBox v-model:boardList="boardList" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
