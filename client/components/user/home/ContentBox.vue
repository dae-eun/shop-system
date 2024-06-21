<script setup>
import ContentDialog from '~/components/user/board/dialog/BoardContent';
import ImageDialog from '~/components/user/board/dialog/BoardImage';
import ImgCard from '~/components/user/items/ImgCard';
import { getUserBoardDetailStore } from '~/stores/user/userBoardDetailStore';

const dayjs = useDayjs();
const boardList = defineModel('boardList', {
  type: Array,
  default: () => [],
});

const componentDialog = ref(null);
const isShow = ref(false);
const selectItem = ref(null);
const modalReset = () => {
  componentDialog.value = null;
  selectItem.value = null;
  isShow.value = false;
};
const callDialog = async (id, type) => {
  const query = {
    boardId: id,
  };
  await getUserBoardDetailStore().getDetailData(query);
  if (type === 'Image') {
    componentDialog.value = ImageDialog;
  } else {
    componentDialog.value = ContentDialog;
  }
  selectItem.value = getUserBoardDetailStore().getBoardDetailInfo;
  isShow.value = true;
};
</script>

<template>
  <div
    class="q-pa-md row items-start justify-center"
  >
    <div
      v-for="board in boardList"
      :key="board.id"
      :class="board.boardType === 'Image' ? 'col-12' : 'col-6'"
      class="mT30"
    >
      <div class="q-pa-md tC mAuto title wd_per50 underBar text-h4 relative-position">
        {{ board.menuNm }}
        <q-btn
          flat
          icon="more_horiz"
          size="16px"
          class="absolute-right"
          @click="navigateTo(board.url)"
        />
      </div>
      <template v-if="board.boardType==='Image'">
        <q-card-section>
          <q-list
            class="q-pa-md row items-start q-gutter-md justify-center"
            separator
          >
            <template v-if="!board.boardInfo.length">
              <div class="q-pa-md text-h6 row items-center">
                <q-icon
                  name="info"
                  size="1.6rem"
                />
                등록된 게시물이 없습니다.
              </div>
            </template>
            <template v-else>
              <ImgCard
                v-for="(item) of board.boardInfo"
                :key="item.boardId"
                :img-card-item="item"
                style="width: 190px;"
                @click="callDialog(item.boardId, board.boardType)"
              />
            </template>
          </q-list>
        </q-card-section>
      </template>
      <template v-else-if="board.boardType='Content'">
        <q-card-section>
          <q-list
            class="q-pa-md items-start q-gutter-md"
            separator
            @click="callDialog(board.boardInfo.boardId, board.boardInfo.boardType)"
          >
            <template v-if="!board.boardInfo.length">
              <div class="q-pa-md text-h6 row items-center">
                <q-icon
                  name="info"
                  size="1.6rem"
                />
                등록된 게시물이 없습니다.
              </div>
            </template>
            <template v-else>
              <div
                v-for="item of board.boardInfo"
                :key="item.boardId"
              >
                <nuxt-link
                  to="/board/1"
                >
                  <div class="row justify-between q-py-sm boardUnderBar">
                    <p
                      class="ellipsis mB0"
                      style="max-width: 270px;"
                    >

                      {{ item.title }}
                    </p>
                    <p
                      class="ellipsis mB0"
                      style="max-width: 72px;"
                    >
                      {{ dayjs(item.regDate).format('YYYY-MM-DD') }}
                    </p>
                  </div>
                </nuxt-link>
              </div>
            </template>
          </q-list>
        </q-card-section>
      </template>
    </div>
    <component
      :is="componentDialog"
      v-model:isShow="isShow"
      :select-item="selectItem"
      :modal-reset="modalReset"
    />
  </div>
</template>

<style lang="scss" scoped>
.underBar {
    border-bottom: 2px solid #e0e0e0;
  }
  .boardUnderBar {
    border-bottom: 1px solid #e0e0e0;
  }
</style>
