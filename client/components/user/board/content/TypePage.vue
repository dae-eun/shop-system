<script setup>
const dayjs = useDayjs();
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
  <div class="board-area mT20">
    <q-markup-table
      flat
      bordered
    >
      <caption>
        게시판 제목
      </caption>
      <colgroup>
        <col style="width: 10%">
        <col style="width: 60%">
        <col style="width: 10%">
        <col style="width: 20%">
      </colgroup>
      <thead class="bg-teal">
        <tr
          class="text-center text-white "
          clickable
        >
          <th>
            번호
          </th>
          <th>
            제목
          </th>
          <th>
            작성자
          </th>
          <th>
            작성일
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item) of boardInfo"
          :key="item.boardId"
          class="text-center cursor-pointer"
          @click="props.callDialog(item.boardId)"
        >
          <td>
            {{ item.boardId }}
          </td>
          <td>
            {{ item.title }}
          </td>
          <td>
            {{ item.writer }}
          </td>
          <td>
            {{ dayjs(item.regDate).format('YYYY-MM-DD') }}
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <q-card
      v-if="!boardInfo.length"
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
  </div>
</template>

<style lang="scss" scoped>

</style>
