<script setup>
import { Autoplay, Controller } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperControls from '~/components/module/swiper/SwiperControls.vue';
import { getUserthumbStore } from '~/stores/user/userThumbStore';

const { showAlertModal } = useModal();

const thumbInfo = ref([]);
const getThumbInfo = async () => {
  const { statusCode, message, thumbInfo: resData } = await getUserthumbStore().getData();
  if (statusCode !== 200) {
    console.error('데이터 조회에 실패하였습니다.:', message);
    showAlertModal(message);
  }
  thumbInfo.value = resData;
};

const config = useRuntimeConfig().public;

const showSwiperCnt = ref(1);
const modules = [Autoplay, Controller];
const visualSwiper = ref(null);
const isAutoplayPaused = ref(false);

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
onMounted(async () => {
  await getThumbInfo();
});
</script>

<template>
  <div>
    <Swiper
      :slides-per-view="showSwiperCnt"
      :loop="true"
      :autoplay="{
        delay: 8000,
      }"
      :modules="modules"
      class="parent-div-relative"
      @swiper="onSwiper"
    >
      <SwiperSlide
        v-for="(slide, index) in thumbInfo"
        :key="index"
        @mouseenter="showSwiperCnt > 1 && onMouseEnter"
        @mouseleave="showSwiperCnt > 1 && onMouseLeave"
      >
        <q-img
          class="q-layout"
          :src="config.SUPABASE_IMAGES_BUCKET+slide.filePath"
        />
      </SwiperSlide>
      <SwiperControls
        v-model:visualSwiper="visualSwiper"
        :class="showSwiperCnt < 2 ? 'swiper-controls' : ''"
        class="row justify-end"
      />
    </Swiper>
  </div>
</template>

<style scoped>
.q-layout {
  height: 580px;
}
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
