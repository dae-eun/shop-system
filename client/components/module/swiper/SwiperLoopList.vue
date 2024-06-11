<script setup>
import { Autoplay, Controller } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperControls from '~/components/module/swiper/SwiperControls.vue';

const modules = [Autoplay, Controller];
const visualSwiper = ref(null);
const isAutoplayPaused = ref(false);
const swiperCard = defineModel('swiperCard', {
  type: Array,
});
const showSwiperCnt = defineModel('showSwiperCnt', {
  type: Number,
});

const onSwiper = (swiperInstance) => {
  visualSwiper.value = swiperInstance;
  visualSwiper.value.isAutoplayPaused = isAutoplayPaused.value;
};
// 마우스 호버 시 자동 재생 일시 중지
const onMouseEnter = () => {
  if (visualSwiper.value && visualSwiper.value.autoplay) {
    visualSwiper.value.autoplay.stop();
    visualSwiper.value.isAutoplayPaused = true;
  }
};
// 마우스 이탈 시 자동 재생 재개
const onMouseLeave = () => {
  if (visualSwiper.value && visualSwiper.value.autoplay) {
    visualSwiper.value.autoplay.start();
    visualSwiper.value.isAutoplayPaused = false;
  }
};
</script>

<template>
  <Swiper
    :slides-per-view="showSwiperCnt"
    :loop="true"
    :autoplay="{
      delay: 4000,
    }"
    :modules="modules"
    :class="showSwiperCnt === 1 ? 'parent-div-relative' : ''"
    @swiper="onSwiper"
  >
    <SwiperSlide
      v-for="(slide, index) in swiperCard"
      :key="index"
      @mouseenter="showSwiperCnt > 1 && onMouseEnter"
      @mouseleave="showSwiperCnt > 1 && onMouseLeave"
    >
      <!-- {{slide}} -->
      <slot name="item" />
    </SwiperSlide>
    <SwiperControls
      v-model:visualSwiper="visualSwiper"
      :class="showSwiperCnt < 2 ? 'swiper-controls' : ''"
      class="row justify-end"
    />
  </Swiper>
</template>

<style lang="scss" scoped>
.parent-div-relative {
  position: relative;
}
.swiper-controls {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: inherit;
}
</style>
