<script setup>
import { v4 as uuid } from 'uuid';
import { useLoading } from '~/stores/common/isLoading';
import { thumbStore } from '~/stores/thumb/thumbStore';

const supabase = useSupabaseClient();
const { showAlertModal, showConfirmModal } = useModal();
const isShow = defineModel ('isShow', {
  type: Boolean,
  default: false,
});
const emit = defineEmits(['reset']);
const thumbnailItem = ref({
  title: '',
  link: '',
  attachmentType: '',
  fileName: '',
  filePath: '',
  size: null,
  fileUid: '',
  useAt: false,
  pin: false,
  sortOrdr: null,
});
const reset = () => {
  thumbnailItem.value.title = '';
  thumbnailItem.value.link = '';
  thumbnailItem.value.attachmentType = '';
  thumbnailItem.value.fileName = '';
  thumbnailItem.value.filePath = '';
  thumbnailItem.value.size = null;
  thumbnailItem.value.fileUid = '';
  thumbnailItem.value.useAt = false;
  thumbnailItem.value.pin = false;
  thumbnailItem.value.sortOrdr = null;
  imageFile.value = null;
  isShow.value = false;
};

const board_not_null_rules = (v) => {
  if (!v) return '필수 값 입니다.';
  return true;
};
const rules = () => {
  if (!imageFile.value) return '이미지를 첨부해주세요.';
  return true;
};
const imageFile = ref(null);
const uploadFilesSequentially = async (file) => {
  try {
    const newFileName = uuid();

    useLoading().setLoading(true);
    const { data, error } = await supabase
      .storage
      .from('shop-sys-bucket')
      .upload(newFileName, file);

    if (error) throw error;
    thumbnailItem.value.fileName = file.name;
    thumbnailItem.value.size = file.size;
    thumbnailItem.value.fileUid = newFileName;
    thumbnailItem.value.attachmentType = file.type;
    thumbnailItem.value.filePath = data.fullPath;
  } catch (error) {
    console.error('파일 첨부에 실패하였습니다.:', error);
    showAlertModal(error);
  } finally {
    useLoading().setLoading(false);
  }
};

const createData = () => {
  if (rules() === false) return;
  showConfirmModal('썸네일을 추가하시겠습니까?', async () => {
    await uploadFilesSequentially(imageFile.value);
    await thumbStore().insertData(thumbnailItem.value).then(() => {
      if (thumbStore().statusCode !== 201) throw thumbStore().message;
      showAlertModal('추가하였습니다.', () => {
        reset();
        emit('reset');
      });
    }).catch((error) => {
      console.error('파일 첨부에 실패하였습니다.:', error);
      showAlertModal(error);
    });
  });
};

const onRejected = () => {
  showAlertModal(`5MB 이하의 이미지 파일만 업로드 가능합니다.`);
};
</script>

<template>
  <q-dialog
    v-model="isShow"
    @hide="reset"
  >
    <q-card
      style="width: 500px;"
    >
      <q-form
        class="full-width"
        @submit="createData"
      >
        <q-card-section class="row justify-between items-center">
          <q-space />
          <q-btn
            v-close-popup
            flat
            round
            dense
            icon="close"
          />
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="thumbnailItem.title"
            :rules="[board_not_null_rules]"
            outlined
            class="q-mb-md"
            label="제목"
          />
          <q-input
            v-model="thumbnailItem.link"
            :rules="[board_not_null_rules]"
            outlined
            class="q-mb-md"
            label="링크"
          />
        </q-card-section>
        <q-card-section
          flat
          class="row justify-start items-center"
        >
          <q-card class="col-12">
            <q-file
              v-model="imageFile"
              color="orange"
              filled
              accept=".jpg, image/*"
              max-file-size="5242880"
              label="클릭해서 추가"
              @rejected="onRejected"
            >
              <template
                v-if="imageFile"
                #append
              >
                <q-icon
                  name="cancel"
                  class="cursor-pointer"
                  @click.stop.prevent="imageFile = null"
                />
              </template>
            </q-file>
          </q-card>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            flat
            label="썸네일 추가"
            color="primary"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>

</style>
