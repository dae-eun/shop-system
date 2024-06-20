<script setup>
const config = useRuntimeConfig().public;
const dayjs = useDayjs();
const props = defineProps({
  imgCardItem: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <q-card
    class="my-card "
    bordered
  >
    <q-img
      style="max-width: 100%; height: 15rem;"
      :src="config.SUPABASE_IMAGES_BUCKET+props.imgCardItem.attachment[0].filePath"
    />

    <q-card-section>
      <!-- <div class="text-overline text-orange-9">
          {{ imgCardItem }}
        </div> -->
      <div class="text-h5 q-mt-sm q-mb-xs">
        {{ props.imgCardItem.title }}
      </div>
      <div class="text-caption text-grey text-right">
        {{ dayjs(props.imgCardItem.regDate).format('YYYY-MM-DD') }}
      </div>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>

</style>
