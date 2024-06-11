<script setup>
const visualSwiper = defineModel('visualSwiper', {
  type: Object,
  default: () => {},
});

const toggleAutoplay = () => {
  if (visualSwiper.value.isAutoplayPaused) {
    visualSwiper.value.autoplay.start();
  } else {
    visualSwiper.value.autoplay.stop();
  }
  visualSwiper.value.isAutoplayPaused = !visualSwiper.value.isAutoplayPaused;
};
</script>

<template>
  <div
    v-if="visualSwiper"
    class="swiper-controller"
  >
    <q-btn
      class="prev"
      square
      flat
      @click="visualSwiper.slidePrev()"
    >
      이전
    </q-btn>
    <q-btn
      square
      flat
      @click="toggleAutoplay()"
    >
      <span
        v-if="visualSwiper.isAutoplayPaused"
        class="play"
      >재생</span>
      <span
        v-else
        class="pause"
      >일시정지</span>
    </q-btn>
    <q-btn
      class="next"
      square
      flat
      @click="visualSwiper.slideNext()"
    >
      다음
    </q-btn>
  </div>
</template>
