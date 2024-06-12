<script setup>
const splitterModel = ref(40);
const selected = ref(false);

const props = [
  {
    label: 'Satisfied customers',
    avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
    children: [
      {
        label: 'Good food',
        icon: 'restaurant_menu',
        children: [
          { label: 'Quality ingredients' },
          { label: 'Good recipe' },
        ],
      },
      {
        label: 'Good service',
        icon: 'room_service',
        children: [
          { label: 'Prompt attention' },
          { label: 'Professional waiter' },
        ],
      },
      {
        label: 'Pleasant surroundings',
        icon: 'photo',
        children: [
          {
            label: 'Happy atmosphere',
          },
          {
            label: 'Good table presentation',
          },
          {
            label: 'Pleasing decor',
          },
        ],
      },
      {
        label: 'Pleasant surroundings',
        icon: 'photo',
        children: [
          {
            label: 'Happy atmosphere',
          },
          {
            label: 'Good table presentation',
          },
          {
            label: 'Pleasing decor',
          },
        ],
      },
      {
        label: 'Pleasant surroundings',
        icon: 'photo',
        children: [
          {
            label: 'Happy atmosphere',
          },
          {
            label: 'Good table presentation',
          },
          {
            label: 'Pleasing decor',
          },
        ],
      },
    ],
  },
];

const regSeq = ref({});
const menu_rules = (v) => {
  if (!v) return '필수 값 입니다.';
  return true;
};
const menu_non_rules = () => {
  return true;
};
</script>

<template>
  <div>
    <q-splitter
      v-model="splitterModel"
    >
      <template #before>
        <q-card-section class="mT20">
          <q-btn
            class="btn-black"
            :disable="(!targetDeps && targetDeps !== 0) || targetDeps > 3"
            square
            flat
            @click="addTree"
          >
            하위 메뉴 추가
          </q-btn>
          <q-btn
            flat
            class="move-btn top mL10"
            :disable="selected && prevSelected ? false : true"
            :class="selected && prevSelected ? '' : 'disable'"
            @click="sortObject('up')"
          />
          <q-btn
            flat
            class="move-btn bottom"
            :disable="selected && nextSelected ? false : true"
            :class="selected && nextSelected ? '' : 'disable'"
            @click="sortObject('down')"
          />
        </q-card-section>
        <div class="q-ma-md">
          <q-scroll-area
            style="height: 600px"
          >
            <q-tree
              v-model:selected="selected"
              :nodes="props"
              node-key="label"
              selected-color="primary"
              default-expand-all
            />
          </q-scroll-area>
        </div>
      </template>

      <template #after>
        <q-card
          flat
          class="full-height q-pa-md q-ma-lg"
        >
          <q-card-section class="flex align-center">
            <p class="title text-weight-bold">
              메뉴 정보
            </p>
            <q-btn
              class="btn-border mL10"
              :disable="Object?.keys(regSeq)?.length < 1"
              square
              flat
              @click="emit('save-data')"
            >
              저장
            </q-btn>
          </q-card-section>
          <q-card-section class="row q-mt-lg">
            <q-form
              class="full-width"
              @submit="join"
            >
              <q-input
                class="mT10"
                outlined
                :rules="[menu_rules]"
                label="메뉴명"
              />
              <q-input
                class="mT10"
                outlined
                disable
                :rules="[menu_non_rules]"
                label="메뉴아이디"
              />
              <q-input
                class="mT10"
                outlined
                :rules="[menu_rules]"
                label="상위메뉴아이디"
              />
              <q-input
                class="mT10"
                outlined
                :rules="[menu_non_rules]"
                label="URL"
              />
              <q-input
                class="mT10"
                outlined
                :rules="[menu_rules]"
                label="메뉴레벨"
              />
              <q-input
                class="mT10"
                outlined
                label="정렬순서"
              />
              <div class="flex justify-between mT10 ">
                <!-- Wrap 메뉴타입 section in a div tag -->
                <div class="q-mr-md flex ">
                  <div class="self-center text-weight-bold">
                    메뉴타입
                  </div>
                  <div>
                    <q-radio
                      :rules="[menu_rules]"
                      label="메뉴"
                    />
                    <q-radio
                      :rules="[menu_rules]"
                      label="실행"
                    />
                  </div>
                </div>
                <!-- Wrap 정렬순서 section in a div tag -->
                <div class="q-mr-md flex ">
                  <div class="self-center text-weight-bold">
                    정렬순서
                  </div>
                  <div>
                    <q-radio
                      val="Y"
                      :rules="[menu_rules]"
                      label="사용"
                    />
                    <q-radio
                      val="Y"
                      :rules="[menu_rules]"
                      label="사용 안함"
                    />
                  </div>
                </div>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </template>
    </q-splitter>
  </div>
</template>

<style lang="scss" scoped>
.move-btn {
  width: 4rem;
  height: 4rem;
  border: 1px solid #dfdfdf;
  border-radius: 0.4rem;
  background-repeat: no-repeat;
  background-position: center;
  &.btn-black {
    width: 12.5rem;
    color: #fff;
    font-size: 1.4rem;
  }
  &.top {
    background-image: url("~/assets/images/icon_move_top.svg");
    &.disable {
      background-image: url("~/assets/images/icon_move_top_disable.svg");
    }
  }
  &.bottom {
    background-image: url("~/assets/images/icon_move_bottom.svg");
    &.disable {
      background-image: url("~/assets/images/icon_move_bottom_disable.svg");
    }
  }
  &.disable {
    background-color: #f8f8f8;
  }
}
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
