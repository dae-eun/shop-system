<script setup>
const splitterModel = ref(30);
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

definePageMeta({
  layout: 'cms',
});
</script>

<template>
  <div>
    <q-splitter
      v-model="splitterModel"
    >
      <template #before>
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

      <template #after />
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
</style>
