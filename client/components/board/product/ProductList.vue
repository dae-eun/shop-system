<script setup>
import Card from "~/components/board/product/Card.vue";
import SwiperLoopList from "~/components/module/swiper/SwiperLoopList.vue";
const showSwiperCnt = ref(4);
const swiperCard = ref([]);
const maxSize = 6;

for (let i = 0; i < maxSize; i++) {
  swiperCard.value.push({ i });
}
</script>
<template>
  <div class="tC mT30 title">게시판 이름</div>
  <SwiperLoopList
    v-model:swiperCard="swiperCard"
    v-model:showSwiperCnt="showSwiperCnt"
  >
    <template #item>
      <Card />
    </template>
  </SwiperLoopList>
</template>
<style scoped>
.title {
  font-family:
    Helvetica Neue,
    Verdana,
    Arial,
    sans-serif;
  font-size: 16px;
  font-weight: 700;
}
</style>
