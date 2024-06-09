<script setup>
const props = defineProps({
  swiper: {
    type: Object,
    default: () => {}
  }
});
const isAutoplayPaused = ref(false);

const toggleAutoplay = () => {
  console.log(props.swiper)
  if (isAutoplayPaused.value) {
    props.swiper.autoplay.start();
  } else {
    props.swiper.autoplay.stop();
  }
  isAutoplayPaused.value = !isAutoplayPaused.value;
};
</script>

<template>
  <div class="swiper-controller">
    <q-btn class="prev" square flat @click="props.swiper.slidePrev()">이전</q-btn>
    <q-btn square flat @click="toggleAutoplay()">
      <span v-if="isAutoplayPaused" class="play">재생</span>
      <span v-else class="pause">일시정지</span>
    </q-btn>
    <q-btn class="next" square flat @click="props.swiper.slideNext()">다음</q-btn>
  </div>
</template>
