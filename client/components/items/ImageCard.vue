<script setup>
const config = useRuntimeConfig().public;
const props = defineProps({
  imageCardItem: {
    type: Object,
    default: () => ({}),
  },
});
const imageCardConfig = defineModel('imageCardConfig', {
  type: Object,
  default: () => ({}),
});
</script>

<template>
  <q-card
    class="my-card q-ma-sm"
    flat
    bordered
    :style="'width: '+imageCardConfig.width+'px'"
  >
    <q-img
      class="auto-height"
      :src="config.SUPABASE_IMAGES_BUCKET+props.imageCardItem.filePath"
      :ratio="16/9"
    />

    <div class="text-h6 q-ma-sm ">
      {{ props.imageCardItem.title }}
    </div>

    <q-card-actions align="right">
      <q-btn
        v-for="(btn) in imageCardConfig.btn"
        :key="btn.label"
        flat
        round
        :color="btn.color"
        :icon="btn.icon"
        @click="btn.btnfunction(props.imageCardItem)"
      >
        {{ btn.icon?'':btn.label }}
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<style lang="scss" scoped>

</style>
