<script setup>
import { v4 as uuid } from 'uuid';
import { fileStore } from '~/stores/common/fileStore';

const { showAlertModal } = useModal();

const props = defineProps({
  multi: {
    type: Boolean,
  },
  boardId: {
    type: Number,
  },
});
const uploadList = defineModel('uploadList', {
  type: Array,
  default: () => [],
});
const isUploadComplete = defineModel('isUploadComplete', {
  type: Boolean,
  default: false,
});
const supabase = useSupabaseClient();
const uploadFilesSequentially = async (files) => {
  const results = [];

  for (const file of files) {
    const newFileName = uuid();
    const currentFileData = {
      boardId: props.boardId,
      attachmentType: file.type,
      fileName: file.name,
      filePath: '',
      size: file.size,
      fileUid: newFileName,
    };

    const { data: supabaseData, error: supabaseError } = await supabase
      .storage
      .from('shop-sys-bucket')
      .upload(newFileName, file);

    if (supabaseError) throw supabaseError;

    currentFileData.filePath = supabaseData.fullPath;
    results.push(currentFileData);
  }

  return results;
};

const factoryFn = async (files) => {
  try {
    const uploadedFilesInfo = await uploadFilesSequentially(files);
    for (const fileInfo of uploadedFilesInfo) {
      await fileStore().insertFile(fileInfo).then(() => {
        if (fileStore().statusCode !== 201) throw fileStore().message;
        uploadList.value.push(fileStore().attachmentData);
        isUploadComplete.value = true;
      }).catch((error) => {
        console.error('파일 첨부에 실패하였습니다.:', error);
        showAlertModal(error);
      });
    }
  } catch (error) {
    showAlertModal(error);
  }
};
const onRejected = () => {
  showAlertModal(`5MB 이하의 이미지 파일만 업로드 가능합니다.`);
};
</script>

<template>
  <div>
    <q-uploader
      :factory="factoryFn"
      class="full-width"
      :multiple="props.multi"
      accept=".jpg, image/*"
      :hide-upload-btn="false"
      :max-files="props.multi ? 5 : 1"
      max-file-size="5242880"
      @rejected="onRejected"
      @added="isUploadComplete = false"
    >
      <template #list="scope">
        <q-list
          separator
          class="flex flex-wrap"
        >
          <q-item
            v-for="file in scope.files"
            :key="file.__key"
            class="row items-center rounded-borders q-ma-md"
            style="border: 1px solid #ccc; width: 300px;"
          >
            <q-item-section>
              <q-item-label class="full-width ellipsis">
                {{ file.name }}
              </q-item-label>
              <q-item-label caption>
                {{ file.__sizeLabel }}
              </q-item-label>
            </q-item-section>

            <q-item-section
              v-if="file.__img"
              thumbnail
              class="gt-xs"
            >
              <img :src="file.__img.src">
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
                @click="scope.removeFile(file)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </template>
    </q-uploader>
  </div>
</template>
