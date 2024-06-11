<script setup>
import SwiperItem from '~/components/module/swiper/SwiperLoopList.vue';

const showSwiperCnt = ref(1);
const swiperCard = ref([]);
const maxSize = 6;

for (let i = 0; i < maxSize; i++) {
  swiperCard.value.push({ i });
}
</script>

<template>
  <div>
    <Swiper-item
      v-model:swiperCard="swiperCard"
      v-model:showSwiperCnt="showSwiperCnt"
    >
      <template #item>
        <q-img
          class="q-layout"
          src=""
        />
      </template>
    </Swiper-item>
  </div>
</template>

<style scoped>
.q-layout {
  height: calc(100vh - 50px);
}
</style>
