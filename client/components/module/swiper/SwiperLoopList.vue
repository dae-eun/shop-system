<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Controller } from 'swiper';
import SwiperControls from "~/components/module/swiper/SwiperControls.vue";
import 'swiper/css';
const modules = [Autoplay, Controller];
const visualSwiper = ref(null);
const swiperCard = defineModel('swiperCard',{
    type: Array
})
const onSwiper = (swiperInstance) => {
    visualSwiper.value = swiperInstance;
};
// 마우스 호버 시 자동 재생 일시 중지
const onMouseEnter = () => {
    if (visualSwiper.value && visualSwiper.value.autoplay) {
        visualSwiper.value.autoplay.stop();
    }
};

// 마우스 이탈 시 자동 재생 재개
const onMouseLeave = () => {
    if (visualSwiper.value && visualSwiper.value.autoplay) {
        visualSwiper.value.autoplay.start();
    }
};
</script>
<template>
    <Swiper
      :slides-per-view="4"
      :loop="true"
      :autoplay="{
        delay: 1000,
        disableOnInteraction: true,
      }"
      :modules="modules"
      @swiper="onSwiper"
      @mouseenter="onMouseEnter" 
      @mouseleave="onMouseLeave"
    >
      <SwiperSlide v-for="(slide, index) in swiperCard" :key="index">
        <!-- {{slide}} -->
          <slot name="item"/>
      </SwiperSlide>
      <SwiperControls :swiper="visualSwiper" />
    </Swiper>
</template>
<style>
.content {
  background-color: #ddd;
  text-align: center;
}
</style>
