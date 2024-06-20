<script setup>
import { getUserBoardStore } from '~/stores/user/userBoardStore';

const route = useRoute();
await getUserBoardStore().getData(route.params.menuId);
</script>

<template>
  <div>
    <div class="title-area mT50">
      <q-card-section class="row justify-center">
        <div class="text-h4">
          게시판 제목
        </div>
      </q-card-section>

      <q-breadcrumbs
        active-color="secondary"
        class="row justify-end"
      >
        <template #separator>
          <q-icon
            name="chevron_right"
            size="1.5rem"
          />
        </template>
        <q-breadcrumbs-el>
          <q-icon
            name="home"
            size="1.5rem"
          />
        </q-breadcrumbs-el>
        <q-breadcrumbs-el label="게시판 제목" />
      </q-breadcrumbs>
    </div>

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
              게시글 번호
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
          <tr class="text-center">
            <td>
              Frozen Yogurt
            </td>
            <td>
              159
            </td>
            <td>
              6
            </td>
            <td>
              24
            </td>
          </tr>
        </tbody>
      </q-markup-table>
      <q-card class="q-pa-md text-center">
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
        @update:model-value=""
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
