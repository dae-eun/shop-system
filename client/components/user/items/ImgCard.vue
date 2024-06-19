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
    <nuxt-link to="/board/1">
      <q-img :src="config.SUPABASE_IMAGES_BUCKET+props.imgCardItem.attachment[0].filePath" />

      <q-card-section>
        <!-- <div class="text-overline text-orange-9">
          {{ imgCardItem }}
        </div> -->
        <div class="text-h5 q-mt-sm q-mb-xs">
          {{ props.imgCardItem.title }}
        </div>
        <div class="text-caption text-grey">
          {{ dayjs(props.imgCardItem.regDate).format('YYYY-MM-DD') }}
        </div>
      </q-card-section>
    </nuxt-link>
  </q-card>
</template>

<style lang="scss" scoped>

</style>
