<script setup>
import ContentBox from '~/components/user/home/ContentBox.vue';
import VisualImgBox from '~/components/user/home/VisualImgBox.vue';
import { thumbStore } from '~/stores/user/userThumbStore';

const { showAlertModal } = useModal();

const thumbInfo = ref([]);
const getThumbInfo = async () => {
  const { statusCode, message, thumbInfo: resData } = await thumbStore().getData();
  if (statusCode !== 200) {
    console.error('데이터 조회에 실패하였습니다.:', message);
    showAlertModal(message);
  }
  thumbInfo.value = resData;
};

onMounted(async () => {
  await getThumbInfo();
});
</script>

<template>
  <div>
    <div
      v-if="thumbInfo.length"
      id="visual"
    >
      <VisualImgBox

        v-model:thumbInfo="thumbInfo"
      />
    </div>

    <div
      id="container"
    >
      <ContentBox />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .underBar {
    border-bottom: 2px solid #e0e0e0;
  }
  .boardUnderBar {
    border-bottom: 1px solid #e0e0e0;
  }
</style>
