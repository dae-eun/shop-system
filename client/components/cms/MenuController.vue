<script setup>
const targetMenu = defineModel('targetMenu', {
  type: Object,
  default: () => {},
});

const newItem = ref(0);
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class MenuItem {
  constructor(upperMenuId, level, length) {
    this.menuId = `new${newItem.value}`;
    this.label = `새 메뉴 ${newItem.value}`;
    this.menuNm = '';
    this.upperMenuId = upperMenuId;
    this.level = level + 1;
    this.url = '';
    this.menuType = 'Menu';
    this.boardType = null;
    this.pageType = null;
    this.sortOrdr = length + 1;
    this.useAt = true;
  }
}
const addTreeItem = () => {
  const newMenu = new MenuItem(targetMenu.value.menuId, targetMenu.value.level, targetMenu.value.children?.length ?? 1);
  if (!targetMenu.value?.children) targetMenu.value.children = [];
  targetMenu.value.children.push(newMenu);
  newItem.value++;
};
const sortObject = (type) => {
  if (type === 'up') {
    // const params = {
    //   fromMenuId: regSeq.value.menuId,
    //   fromSortOrdr: regSeq.value.sortOrdr,
    //   toMenuId: prevSelected.value.menuId,
    //   toSortOrdr: prevSelected.value.sortOrdr,
    // };
    // const { code } = await useMenuMngAPI().changeMenuSort(params);
    // if (code !== '200') return;
  } else if (type === 'down') {
    // const params = {
    //   fromMenuId: regSeq.value.menuId,
    //   fromSortOrdr: regSeq.value.sortOrdr,
    //   toMenuId: nextSelected.value.menuId,
    //   toSortOrdr: nextSelected.value.sortOrdr,
    // };
    // const { code } = await useMenuMngAPI().changeMenuSort(params);
    // if (code !== '200') return;
  }
};
</script>

<template>
  <div>
    <q-btn
      class="btn-border"
      :disable="(!targetMenu.level && targetMenu.level !== 0)"
      square
      flat
      @click="addTreeItem"
    >
      하위 메뉴 추가
    </q-btn>
    <!-- <q-btn
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
    /> -->
  </div>
</template>

<style lang="scss" scoped>
.btn-border {
  border: 1px solid #666666;
  color: #333333;
  border-radius: 1rem;
}
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
