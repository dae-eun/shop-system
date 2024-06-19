<script setup>
import { controllMenuStore } from '~/stores/menu/menuCmsStore';

const { showConfirmModal, showAlertModal } = useModal();

const targetMenu = defineModel('targetMenu', {
  type: Object,
  default: () => {},
});
const menuTree = defineModel('menuTree', {
  type: Array,
  default: () => [],
});
const selected = defineModel('selected', {
  type: Number,
  default: null,
});

const resetData = async () => {
  await controllMenuStore().getData();
  targetMenu.value = {};
  menuTree.value = controllMenuStore().getMenuTree;
  selected.value = null;
};

const createOrUpdateData = () => {
  if (menu_type_menu_rules() === false) return;
  showConfirmModal('저장하시겠습니까?', async () => {
    if (typeof targetMenu.value.menuId === 'string' && targetMenu.value.menuId?.includes('new')) {
      try {
        await controllMenuStore().insertMenu(targetMenu.value);
        if (controllMenuStore().statusCode !== 201) throw controllMenuStore().error;
        showAlertModal(controllMenuStore().message, async () => {
          await resetData();
        });
      } catch (error) {
        console.error('Insert menu failed:', error);
        showAlertModal(error);
      };
    } else {
      try {
        await controllMenuStore().updateMenu(targetMenu.value);
        if (controllMenuStore().statusCode !== 200) throw controllMenuStore().error;
        showAlertModal(controllMenuStore().message, async () => {
          await resetData();
        });
      } catch (error) {
        console.error('Update menu failed:', error);
        showAlertModal(error);
      }
    }
  });
};

const deleteData = () => {
  try {
    showConfirmModal('삭제하시겠습니까? 삭제한 데이터는 복구가 불가능합니다.', async () => {
      if (typeof targetMenu.value.menuId === 'string' && targetMenu.value.menuId?.includes('new')) {
        return await resetData();
      } else {
        try {
          await controllMenuStore().deleteData(targetMenu.value.menuId);
          if (controllMenuStore().statusCode !== 200) throw controllMenuStore().error;
          showAlertModal(controllMenuStore().message, async () => {
            return await resetData();
          });
        } catch (error) {
          console.error('Delete menu failed:', error);
          showAlertModal(error);
        };
      }
    });
  } catch (error) {
    showAlertModal(error);
  }
};
const menu_rules = (v) => {
  if (!v) return '필수 값 입니다.';
  return true;
};
const menu_upperMenu_rules = (v) => {
  if (!v && targetMenu.value.level !== 1) return '필수 값 입니다.';
  return true;
};
const menu_non_rules = () => {
  return true;
};
const menu_type_menu_rules = () => {
  if (targetMenu.value.menuType === 'Board' && !targetMenu.value.boardType) {
    showAlertModal('게시판 타입을 선택해주세요.');
    return false;
  }
  if (targetMenu.value.menuType === 'Board' && !targetMenu.value.pageType) {
    showAlertModal('페이지 형태를 선택해주세요.');
    return false;
  }
  return true;
};

watchEffect(() => {
  if (targetMenu.value.menuType === 'Menu') {
    targetMenu.value.boardType = '';
    targetMenu.value.pageType = '';
  }
});
</script>

<template>
  <q-card
    flat
    class="full-height q-pa-md B0"
  >
    <q-card-section class="flex align-center B0">
      <p class="title text-weight-bold mB0">
        메뉴 정보
      </p>
    </q-card-section>
    <q-card-section class="row">
      <template v-if="Object.keys(targetMenu).length">
        <q-form
          class="full-width"
          @submit="createOrUpdateData"
        >
          <q-input
            v-model="targetMenu.menuNm"
            class="mT10"
            outlined
            :rules="[menu_rules]"
            label="메뉴명"
          />
          <q-input
            v-model="targetMenu.menuId"
            class="mT10"
            outlined
            disable
            :rules="[menu_rules]"
            label="메뉴아이디"
          />
          <q-input
            v-model="targetMenu.upperMenuId"
            class="mT10"
            outlined
            :rules="[menu_upperMenu_rules]"
            label="상위메뉴아이디"
          />
          <q-input
            v-model="targetMenu.url"
            class="mT10"
            outlined
            disable
            :rules="[menu_non_rules]"
            label="URL"
          />
          <q-input
            v-model="targetMenu.level"
            class="mT10"
            outlined
            :rules="[menu_rules]"
            label="메뉴레벨"
          />
          <q-input

            v-model="targetMenu.sortOrdr"
            class="mT10"
            outlined
            label="정렬순서"
          />
          <div class="flex justify-between mT10 ">
            <!-- Wrap 메뉴타입 section in a div tag -->
            <div class="q-mr-md flex">
              <div class="self-center text-weight-bold">
                메뉴타입
              </div>
              <div>
                <q-radio
                  v-model="targetMenu.menuType"
                  val="Menu"
                  label="메뉴"
                />
                <q-radio
                  v-model="targetMenu.menuType"
                  val="Board"
                  label="게시판"
                />
              </div>
            </div>
            <template v-if="targetMenu.menuType==='Board'">
              <div class="q-mr-md flex">
                <div class="self-center text-weight-bold">
                  게시판 타입
                </div>
                <div>
                  <q-radio
                    v-model="targetMenu.boardType"
                    val="Product"
                    label="제품"
                  />
                  <q-radio
                    v-model="targetMenu.boardType"
                    val="Text"
                    label="텍스트"
                  />
                  <q-radio
                    v-model="targetMenu.boardType"
                    val="Image"
                    label="이미지"
                  />
                  <q-radio
                    v-model="targetMenu.boardType"
                    val="Content"
                    label="컨텐츠"
                  />
                </div>
              </div>
              <div class="q-mr-md flex">
                <div class="self-center text-weight-bold">
                  페이지 형태
                </div>
                <div>
                  <q-radio
                    v-model="targetMenu.pageType"
                    val="Infinite"
                    label="무한스크롤"
                  />
                  <q-radio
                    v-model="targetMenu.pageType"
                    val="Page"
                    label="페이지네이션"
                  />
                </div>
              </div>
            </template>
            <div class="q-mr-md flex">
              <div class="self-center text-weight-bold">
                사용여부
              </div>
              <div>
                <q-checkbox
                  v-model="targetMenu.useAt"
                  :rules="[menu_rules]"
                />
              </div>
            </div>
          </div>
          <div class="q-mt-md flex justify-end">
            <q-btn
              class="btn-border mL10"
              color="black"
              :disable="!targetMenu || targetMenu.menuId===1"
              flat
              type="submit"
            >
              저장
            </q-btn>
            <q-btn
              class="btn-border mL10"
              color="deep-orange"
              :disable="!targetMenu || targetMenu.menuId===1"
              flat
              @click="deleteData"
            >
              메뉴 삭제
            </q-btn>
          </div>
        </q-form>
      </template>
      <template v-else>
        메뉴의 추가, 삭제, 변경을 원하실 경우 좌측의 메뉴를 선택해 주세요.
      </template>
    </q-card-section>
  </q-card>
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
</style>
