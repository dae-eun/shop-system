<script setup>
import ContentInfinite from '~/components/user/board/content/TypeInfinite';
import ContentPage from '~/components/user/board/content/TypePage';
import ImageInfinite from '~/components/user/board/image/TypeInfinite';
import ImagePage from '~/components/user/board/image/TypePage';
import { getUserBoardStore } from '~/stores/user/userBoardStore';

const route = useRoute();
const componentToRender = ref(null);

onMounted(async () => {
  await getUserBoardStore().getData(route.params.menuId);
  if (route.params.boardType === 'content') {
    componentToRender.value = route.params.pageType === 'page' ? ContentPage : ContentInfinite;
  } else if (route.params.boardType === 'image') {
    componentToRender.value = route.params.pageType === 'page' ? ImagePage : ImageInfinite;
  }
});
</script>

<template>
  <div>
    <div class="title-area mT50">
      <q-card-section class="row justify-center">
        <div class="text-h4">
          게시판 제목
        </div>
      </q-card-section>

      <q-breadcrumbs
        active-color="secondary"
        class="row justify-end"
      >
        <template #separator>
          <q-icon
            name="chevron_right"
            size="1.5rem"
          />
        </template>
        <q-breadcrumbs-el>
          <q-icon
            name="home"
            size="1.5rem"
          />
        </q-breadcrumbs-el>
        <q-breadcrumbs-el label="게시판 제목" />
      </q-breadcrumbs>
    </div>
    <component :is="componentToRender" />
  </div>
</template>

<style lang="scss" scoped>

</style>
