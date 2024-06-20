<script setup>
const dayjs = useDayjs();
const boardInfo = defineModel('boardInfo', {
  type: Array,
  default: [],
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
        <tr class="text-center text-white">
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
          v-for="(item) of boardInfo.boardInfo"
          :key="item.boardId"
          class="text-center"
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
      v-if="!boardInfo.boardInfo.length"
      class="q-pa-md text-center"
    >
      <q-icon
        name="info "
        size="1.6rem"
      />
      작성된 게시글이 없습니다.
    </q-card>
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
  </div>
</template>

<style lang="scss" scoped>

</style>
