<script setup>
const configOfBoard = defineModel('configOfBoard', {
  type: Object,
  default: () => {},
});
const pagesNumber = computed(() => Math.ceil(configOfBoard.value.rows.length / configOfBoard.value.pagination.rowsPerPage));
</script>

<template>
  <div class="full-width">
    <q-table
      v-model:pagination="configOfBoard.pagination"
      v-model:selected="configOfBoard.selectedBoard"
      class="full-width"
      selection="single"
      flat
      bordered
      title="Treats"
      :rows="configOfBoard.rows"
      :columns="configOfBoard.columns"
      :filter="configOfBoard.filter"
      row-key="boardId"
      :visible-columns="configOfBoard.visibleColumns"
      :hide-pagination="!configOfBoard.isFullscreen"
      @update:fullscreen="configOfBoard.isFullscreen=!configOfBoard.isFullscreen"
      @row-click="configOfBoard.handleRowClick"
    >
      <template #top="props">
        <q-space />
        <q-input
          v-model="configOfBoard.filter"
          borderless
          dense
          debounce="300"
          placeholder="Search"
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          class="q-ml-md"
          @click="props.toggleFullscreen"
        />
      </template>
    </q-table>
    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="configOfBoard.pagination.page"
        color="grey-8"
        :max="pagesNumber"
        size="sm"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
