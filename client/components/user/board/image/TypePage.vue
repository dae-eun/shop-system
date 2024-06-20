<script setup>
import ImgCard from '~/components/user/items/ImgCard';

const boardInfo = defineModel('boardInfo', {
  type: Array,
  default: [],
});
</script>

<template>
  <q-card-section class="row justify-start">
    <ImgCard
      v-for="(item) of boardInfo.boardInfo"
      :key="item.boardId"
      class="q-ma-md"
      :img-card-item="item"
      style="width: 280px;"
    />
  </q-card-section>
  <q-pagination
    v-model="current"
    class="justify-center mT40 default-pagi"
    boundary-links
    max="100"
    max-pages="10"
    direction-links
    flat
    color="grey"
    active-color="primary"
    :boundary-numbers="false"
  />
</template>

<style lang="scss" scoped>

</style>
