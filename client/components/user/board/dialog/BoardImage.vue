<script setup>
const dayjs = useDayjs();
const config = useRuntimeConfig().public;
const isShow = defineModel('isShow', {
  type: Boolean,
  default: false,
});
const props = defineProps({
  selectItem: {
    type: Object,
    default: () => ({}),
  },
  modalReset: Function,
});
const splitterModel = ref(60);
const slide = ref(props.selectItem.attachment[0].filePath);
const autoplay = ref(true);
</script>

<template>
  <q-dialog
    v-model="isShow"
    full-width
    full-height
    @hide="modalReset"
  >
    <q-card>
      <q-card-section
        class="row justify-between items-center"
        style="height: 7%"
      >
        <q-space />
        <q-btn
          v-close-popup
          flat
          round
          dense
          icon="close"
        />
      </q-card-section>
      <q-splitter
        v-model="splitterModel"
        style="height: 93%;"
      >
        <template #before>
          <q-carousel
            v-model="slide"
            animated
            navigation
            infinite
            :autoplay="autoplay"
            arrows
            control-color="secondary"
            transition-prev="slide-right"
            transition-next="slide-left"
            class="full-width full-height "
            style=" object-fit: cover; object-position: center;"
            @mouseenter="autoplay = false"
            @mouseleave="autoplay = true"
          >
            <q-carousel-slide
              v-for="(item, index) of props.selectItem.attachment"
              :key="index"
              :name="item.filePath"
              :img-src="config.SUPABASE_IMAGES_BUCKET+item.filePath"
            />
          </q-carousel>
        </template>
        <template #after>
          <q-card-section style="height: 10%;">
            <p class="text-h4 text-center mB0">
              {{ props.selectItem.title }}
            </p>
            <p class="text-grey text-right mB0">
              {{ props.selectItem.writer }} {{ dayjs(props.selectItem.regDate).format('YYYY-MM-DD') }}
            </p>
          </q-card-section>
          <q-card-section style="height: 90%;">
            <q-scroll-area
              :visible="true"
              class="full-width full-height"
            >
              <p v-dompurify-html="props.selectItem.content" />
            </q-scroll-area>
          </q-card-section>
        </template>
      </q-splitter>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>

</style>
