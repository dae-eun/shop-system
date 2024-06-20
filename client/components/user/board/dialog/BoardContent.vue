<script setup>
const dayjs = useDayjs();
const isShow = defineModel('isShow', {
  type: Boolean,
  default: false,
});
const props = defineProps({
  selectItem: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <q-dialog
    v-model="isShow"
    full-width
    full-height
  >
    <q-card>
      <q-card-section class="row justify-between items-center">
        <q-space />
        <q-btn
          v-close-popup
          flat
          round
          dense
          icon="close"
        />
      </q-card-section>
      <q-card-section>
        <p class="text-h4 text-center mB0">
          {{ props.selectItem.title }}
        </p>
        <p class="text-grey text-right mB0">
          {{ props.selectItem.writer }} {{ dayjs(props.selectItem.regDate).format('YYYY-MM-DD') }}
        </p>
      </q-card-section>

      <q-separator />

      <q-card-section
        class="scroll"
      >
        <p v-dompurify-html="props.selectItem.content" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>

</style>
