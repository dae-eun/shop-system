<script setup>
  import ProductList from "~/components/board/product/ProductList.vue";
  import VisualImgBox from "~/components/layouts/VisualImgBox.vue";
</script>
<template>
  <div>
    <div id="visual">
      <VisualImgBox/>
    </div>
    <div id="container">
      <product-list />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
