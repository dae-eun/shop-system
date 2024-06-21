<script setup>
import BoardEditor from '~/components/cms/BoardEditor';
import Board from '~/components/cms/BoardList';
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
  visibleColumns: ['boardId', 'title', 'writer', 'editor', 'modDate', 'pin', 'regDate', 'useAt'],
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
    { name: 'pin', label: '상단고정', align: 'center', field: 'pin' },
    { name: 'useAt', label: '노출여부', align: 'center', field: 'useAt' },
  ],
  rows: [],
  handleRowClick: (evt, row) => {
    boardItem.value.menuId = row.menuId;
    boardItem.value.boardId = row.boardId;
    boardItem.value.title = row.title;
    boardItem.value.content = row.content;
    boardItem.value.attachmentData = row.attachmentData;
    boardItem.value.pin = row.pin === '고정' ? true : false;
    boardItem.value.useAt = row.useAt === '노출' ? true : false;
    isEdit.value = true;
    isShow.value = true;
  },
});

// 팝업
const isShow = ref(false);
const isEdit = ref(false);
const boardItem = ref({
  menuId: '',
  title: '',
  content: '',
  useAt: false,
  pin: false,
  attachmentData: [],
  deleteList: [],
  uploadList: [],
});

const getData = async () => {
  try {
    await controllBoardStore().getData(targetMenu.value.menuId).then(() => {
      if (controllBoardStore().statusCode !== 200) throw controllBoardStore().message;
      controllBoardStore().boardInfo.map((el) => {
        el.pin = el.pin ? '고정' : '미고정';
        el.useAt = el.useAt ? '노출' : '미노출';
        el.modDate = dayjs(el.modDate).format('YYYY-MM-DD HH:mm');
        el.regDate = dayjs(el.regDate).format('YYYY-MM-DD HH:mm');
      });
      // const boardData = controllBoardStore().boardInfo.filter((el) => !el.attachmentData)
      // const attachmentData = controllBoardStore().boardInfo.filter((el) => el.attachmentData)
      configOfBoard.value.rows = controllBoardStore().boardInfo;
    });
  } catch (error) {
    showAlertModal(error);
  }
};

const deleteData = () => {
  showConfirmModal('삭제하시겠습니까? 삭제한 데이터는 복구가 불가능합니다.', async () => {
    await controllBoardStore().deleteData(configOfBoard.value.selectedBoard[0].boardId).then(() => {
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
  if (Object.keys(targetMenu.value) && targetMenu.value.menuType === 'Board') {
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
        {{ targetMenu.menuType==='Board'? targetMenu.menuNm :'' }} 정보
      </p>
      <q-btn-group
        v-if="targetMenu.menuType==='Board'"
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
          @click="isShow = true"
        >
          게시글 작성
        </q-btn>
      </q-btn-group>
    </q-card-section>
    <q-card-section class="row">
      <template v-if="targetMenu.menuType==='Board'">
        <Board v-model:configOfBoard="configOfBoard" />
      </template>
      <template v-else-if="targetMenu.menuType==='Thumbnail'">
        <Board v-model:configOfBoard="configOfBoard" />
      </template>
      <template v-else>
        편집하실 게시판을 선택해주세요.
      </template>
    </q-card-section>
  </q-card>
  <BoardEditor
    v-model:targetMenu="targetMenu"
    v-model:isShow="isShow"
    v-model:boardItem="boardItem"
    v-model:is-edit="isEdit"
    @reset="getData"
  />
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
