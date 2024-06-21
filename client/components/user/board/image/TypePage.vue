<script setup>
import ImgCard from '~/components/user/items/ImgCard';

const boardInfo = defineModel('boardInfo', {
  type: Array,
  default: [],
});
const query = defineModel('query', {
  type: Object,
  default: () => {
    return {
      page: 1,
      pageSize: 8,
    };
  },
});
const props = defineProps({
  getData: Function,
  callDialog: Function,
});
</script>

<template>
  <q-card-section class="row justify-start">
    <ImgCard
      v-for="(item) of boardInfo"
      :key="item.boardId"
      class="q-ma-md cursor-pointer"
      :img-card-item="item"
      style="width: 280px;"
      @click="props.callDialog(item.boardId)"
    />
  </q-card-section>
  <q-card
    v-if="!boardInfo.length"
    flat
    class="q-pa-md text-center"
  >
    <q-icon
      name="info "
      size="1.6rem"
    />
    작성된 게시글이 없습니다.
  </q-card>
  <q-pagination
    v-model="query.page"
    class="justify-center mT40 default-pagi"
    boundary-links
    :max="query.max"
    :max-pages="query.pageSize"
    direction-links
    flat
    color="grey"
    active-color="primary"
    :boundary-numbers="false"
    @update:model-value="props.getData()"
  />
</template>

<style lang="scss" scoped>

</style>
