<script setup>
const { showConfirmModal } = useModal();
const attachmentData = defineModel('attachmentData', {
  type: Array,
  default: () => [],
});
const deleteList = defineModel('deleteList', {
  type: Array,
  default: () => [],
});

const calcKb = (size) => {
  if (!size) return 0;
  return (size / 1024).toFixed(1);
};

const deleteFile = (file) => {
  showConfirmModal('파일을 삭제하시겠습니까?', () => {
    const index = attachmentData.value.findIndex(item => item.fileUid === file.fileUid);
    deleteList.value.push(attachmentData.value.splice(index, 1)[0]);
  });
};
</script>

<template>
  <q-list
    separator
    class="flex flex-wrap q-pa-sm"
  >
    <q-item
      v-for="file in attachmentData"
      :key="file.fileUid"
      class="row items-center rounded-borders q-ma-md"
      style="border: 1px solid #ccc; width: 300px;"
    >
      <q-item-section
        top
        thumbnail
        class="q-ml-none"
      >
        <img :src="'https://dubayntsleiixttxekog.supabase.co/storage/v1/object/public/'+file.filePath">
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ file.fileName }}</q-item-label>
        <q-item-label caption>
          {{ calcKb(file.size) }} KB
        </q-item-label>
      </q-item-section>

      <q-item-section
        top
        side
      >
        <q-btn
          class="gt-xs"
          size="12px"
          flat
          dense
          round
          icon="delete"
          @click="deleteFile(file)"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<style lang="scss" scoped>

</style>
