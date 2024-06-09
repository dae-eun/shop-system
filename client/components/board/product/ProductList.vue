<script setup>
  import Card from "~/components/board/product/Card.vue";
  import SwiperItem from "~/components/module/swiper/SwiperLoopList.vue";
  const maxSize = 6
  const swiperCard = ref([])
  
  for (let i = 0; i < maxSize; i++) {
    swiperCard.value.push({i})
  }
</script>
<template>
  <div>
    게시판 이름
  </div>
  <Swiper-item v-model:swiperCard="swiperCard">
    <template #item>
      <Card />
    </template>
  </swiper-item>
    <!-- <q-virtual-scroll -->
        <!-- v-slot="{ item, index }" -->
        <!-- :items="heavyList" -->
        <!-- virtual-scroll-horizontal -->
    <!-- > -->
        <!-- <card /> -->
    <!-- </q-virtual-scroll> -->
</template>