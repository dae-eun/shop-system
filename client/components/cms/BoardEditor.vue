<script setup>
import FileList from '~/components/module/file/CommonFileList';
import Uploader from '~/components/module/file/CommonUploader';
import { controllBoardStore } from '~/stores/board/boardStore';

const { showConfirmModal, showAlertModal } = useModal();
const isShow = defineModel ('isShow', {
  type: Boolean,
  default: false,
});
const isEdit = defineModel ('isEdit', {
  type: Boolean,
  default: false,
});
const targetMenu = defineModel ('targetMenu', {
  type: Object,
  default: () => ({}),
});
const boardItem = defineModel ('boardItem', {
  type: Object,
  default: () => ({
    title: '',
    content: '',
    useAt: true,
    pin: false,
    attachmentData: [],
    uploadList: [],
    deleteList: [],
  }),
});
const emit = defineEmits(['reset']);

const editorReset = () => {
  delete boardItem.value.boardId;
  boardItem.value.title = '';
  boardItem.value.content = '';
  boardItem.value.useAt = false;
  boardItem.value.attachmentData = [];
  boardItem.value.deleteList = [];
  boardItem.value.uploadList = [];
  isEdit.value = false;
};
const rules = () => {
  if (!boardItem.value.content) {
    showAlertModal('입력된 컨텐츠 내용이 없습니다.');
    return false;
  }
  return true;
};

const createOrUpdateData = () => {
  if (rules() === false) return;
  if (!isEdit.value) {
    showConfirmModal('게시글을 작성하시겠습니까?', async () => {
      boardItem.value.menuId = targetMenu.value.menuId;
      await controllBoardStore().insertData(boardItem.value).then(() => {
        if (controllBoardStore().statusCode !== 201) throw controllBoardStore().error;
        showAlertModal(controllBoardStore().message, () => {
          emit('reset');
          isShow.value = false;
        });
      }).catch((error) => {
        console.error('Insert menu failed:', error);
        showAlertModal(error);
      });
    });
  } else {
    showConfirmModal('게시글을 수정하시겠습니까?', async () => {
      console.log(boardItem.value);
      await controllBoardStore().updateData(boardItem.value).then(() => {
        if (controllBoardStore().statusCode !== 200) throw controllBoardStore().message;
        showAlertModal(controllBoardStore().message, () => {
          emit('reset');
          isShow.value = false;
        });
      }).catch((error) => {
        console.error('Insert menu failed:', error);
        showAlertModal(error);
      });
    });
  }
};

// 에디터 이미지 추가
const insertImg = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.png, .jpg';
  let file;
  input.onchange = (_) => {
    const files = Array.from(input.files);
    file = files[0];

    const reader = new FileReader();
    let dataUrl = '';
    reader.onloadend = () => {
      dataUrl = reader.result;
      boardItem.value.content += '<div><img src="' + dataUrl + '" /></div>';
    };
    reader.readAsDataURL(file);
  };
  input.click();
};
const definitions = {
  insert_img: {
    tip: '사진 첨부',
    label: '사진넣기',
    icon: 'photo',
    handler: insertImg,
  },
};

const board_not_null_rules = (v) => {
  if (!v) return '필수 값 입니다.';
  return true;
};
</script>

<template>
  <q-dialog
    v-model="isShow"
    full-width
    full-height
    @hide="editorReset"
  >
    <q-card>
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
          v-model="boardItem.title"
          :rules="[board_not_null_rules]"
          outlined
          label="제목"
        />
      </q-card-section>
      <template v-if="targetMenu.boardType==='Image'">
        <q-card-section
          flat
          class="row justify-start items-center"
        >
          <q-card
            flat
            class="col-1"
          >
            기존 첨부 파일
          </q-card>
          <q-card class="col-11">
            <FileList
              v-model:attachmentData="boardItem.attachmentData"
              v-model:deleteList="boardItem.deleteList"
            />
          </q-card>
        </q-card-section>
        <q-card-section
          flat
          class="row justify-start items-center"
        >
          <q-card
            flat
            class="col-1"
          >
            파일 첨부
          </q-card>
          <q-card class="col-11">
            <Uploader
              v-model:uploadList="boardItem.uploadList"
              :multi="true"
              :max-files="5"
              :board-id="boardItem.boardId"
            />
          </q-card>
        </q-card-section>
      </template>

      <q-separator />

      <q-card-section
        class="scroll"
      >
        <q-editor
          v-model="boardItem.content"
          :min-height="targetMenu.boardType==='Image'?'28rem':'36rem'"
          :definitions="definitions"
          :toolbar="[['left', 'center', 'right', 'justify'], ['bold', 'italic', 'underline', 'strike'], ['undo', 'redo'], ['insert_img']]"
        />
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-toggle
          v-model="boardItem.pin"
          label="상단 고정"
          left-label
        />
        <q-toggle
          v-model="boardItem.useAt"
          label="노출 여부"
          left-label
        />

        <!-- <q-btn
          flat
          label="미리보기"
          color="primary"
        /> -->
        <q-btn
          flat
          :label="isEdit?'수정하기':'게시하기'"
          color="primary"
          @click="createOrUpdateData"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>

</style>
