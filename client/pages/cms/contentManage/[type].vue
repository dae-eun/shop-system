<script setup>
import ContentManageOfThumbnail from '~/components/cms/ContentManageOfThumbnail.vue';
import ContentManageOnMenu from '~/components/cms/ContentManageOnMenu.vue';

const route = useRoute();
const pageType = route.params.type;
</script>

<template>
  <div>
    <ContentManageOfThumbnail v-if="pageType==='thumbnail'" />
    <ContentManageOnMenu v-if="pageType==='menu'||pageType==='board'" />
  </div>
</template>

<style lang="scss" scoped>
</style>
