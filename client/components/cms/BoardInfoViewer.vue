<script setup>
import Board from '~/components/cms/Board';
import { controllBoardStore } from '~/stores/board/boardStore';

const { showConfirmModal, showAlertModal } = useModal();
const dayjs = useDayjs();

const targetMenu = defineModel('targetMenu', {
  type: Object,
  default: () => {},
});

// 게시판
const configOfBoard = ref({
  filter: '',
  isFullscreen: false,
  selectedBoard: [],
  pagination: {
    sortBy: 'boardId',
    page: 1,
    rowsPerPage: 5,
    // rowsNumber: xx if getting data from a server
  },
  visibleColumns: ['boardId', 'title', 'writer', 'editor', 'modDate', 'regDate', 'useAt'],
  columns: [
    {
      name: 'desc',
      required: true,
      label: '번호',
      align: 'center',
      field: 'boardId',
    },
    { name: 'title', align: 'left', label: '제목', field: 'title' },
    { name: 'content', label: '내용', field: 'content' },
    { name: 'modDate', label: '작성일', align: 'center', field: 'modDate' },
    { name: 'regDate', label: '수정일', align: 'center', field: 'regDate' },
    { name: 'writer', label: '작성자', align: 'center', field: 'writer' },
    { name: 'editor', label: '수정자', align: 'center', field: 'editor' },
    { name: 'useAt', label: '노출여부', align: 'center', field: 'useAt' },
  ],
  rows: [],
  handleRowClick: (evt, row) => {
    boardItem.value.menuId = row.menuId;
    boardItem.value.boardId = row.boardId;
    boardItem.value.title = row.title;
    boardItem.value.content = row.content;
    boardItem.value.useAt = row.useAt === '노출' ? true : false;
    isEdit.value = true;
    editBoard.value = true;
  },
});

// 팝업
const editBoard = ref(false);
const isEdit = ref(false);
const boardItem = ref({
  menuId: '',
  title: '',
  content: '',
  useAt: false,
});

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
const editorReset = () => {
  delete boardItem.value.boardId;
  boardItem.value.title = '';
  boardItem.value.content = '';
  boardItem.value.useAt = false;
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
        showAlertModal(controllBoardStore().message, async () => {
          await getData();
          editBoard.value = false;
        });
      }).catch((error) => {
        console.error('Insert menu failed:', error);
        showAlertModal(error);
      });
    });
  } else {
    showConfirmModal('게시글을 수정하시겠습니까?', async () => {
      await controllBoardStore().updateData(boardItem.value).then(() => {
        if (controllBoardStore().statusCode !== 200) throw controllBoardStore().message;
        showAlertModal(controllBoardStore().message, async () => {
          await getData();
          editBoard.value = false;
        });
      }).catch((error) => {
        console.error('Insert menu failed:', error);
        showAlertModal(error);
      });
    });
  }
};

const getData = async () => {
  try {
    await controllBoardStore().getData(targetMenu.value.menuId).then(() => {
      if (controllBoardStore().statusCode !== 200) throw controllBoardStore().error;
      controllBoardStore().boardInfo.map((el) => {
        el.useAt = el.useAt ? '노출' : '미노출';
        el.modDate = dayjs(el.modDate).format('YYYY-MM-DD HH:mm');
        el.regDate = dayjs(el.regDate).format('YYYY-MM-DD HH:mm');
      });
      configOfBoard.value.rows = controllBoardStore().boardInfo;
    });
  } catch (error) {
    showAlertModal(error);
  }
};

const deleteData = () => {
  showConfirmModal('삭제하시겠습니까? 삭제한 데이터는 복구가 불가능합니다.', async () => {
    await controllBoardStore().deleteData(targetMenu.value.menuId).then(() => {
      if (controllBoardStore().statusCode !== 200) throw controllBoardStore().message;
      showAlertModal(controllBoardStore().message, async () => {
        return await getData();
      });
    }).catch((error) => {
      showAlertModal(error);
    });
  });
};

watchEffect(async () => {
  if (Object.keys(targetMenu.value) && targetMenu.value.menuType === 'board') {
    await getData();
  }
});
</script>

<template>
  <q-card
    flat
    class="full-height q-pa-md"
  >
    <q-card-section class="flex align-center B0">
      <p class="title text-weight-bold mB0">
        {{ targetMenu.menuType==='board'? targetMenu.menuNm :'' }} 정보
      </p>
      <q-btn-group
        v-if="targetMenu.menuType==='board'"
        flat
        class="row justify-end full-width mB20"
      >
        <q-btn
          flat
          square
          :disable="!configOfBoard.selectedBoard.length"
          class="bg-deep-orange text-white w-150"
          @click="deleteData"
        >
          삭제
        </q-btn>
        <q-btn
          flat
          square
          class="bg-secondary text-white w-150 mL10"
          @click="editBoard = true"
        >
          게시글 작성
        </q-btn>
      </q-btn-group>
    </q-card-section>
    <q-card-section class="row">
      <template v-if="targetMenu.menuType==='board'">
        <Board v-model:configOfBoard="configOfBoard" />
      </template>
      <template v-else>
        편집하실 게시판을 선택해주세요.
      </template>
    </q-card-section>
  </q-card>
  <q-dialog
    v-model="editBoard"
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

      <q-separator />

      <q-card-section
        class="scroll"
      >
        <q-editor
          v-model="boardItem.content"
          min-height="37rem"
          :definitions="definitions"
          :toolbar="[['left', 'center', 'right', 'justify'], ['bold', 'italic', 'underline', 'strike'], ['undo', 'redo'], ['insert_img']]"
        />
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
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
.btn-border {
  border: 1px solid #dfdfdf;
  color: #dfdfdf;
  border-radius: 1rem;
}
.required {
  &:after {
    display: inline-block;
    content: "*";
    color: red;
    margin-left: 0.4rem;
  }
}
.btn {
  color: #333333;
  font-size: 1.6rem;
  height: 4.8rem;
  padding: 0 2rem;
  border: 1px solid #333333;
  text-transform: unset;
  box-sizing: border-box;}
</style>
