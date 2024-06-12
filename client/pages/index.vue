<script setup>
import ProductList from '~/components/board/product/ProductList.vue';
import VisualImgBox from '~/components/layouts/VisualImgBox.vue';

const callApi = async () => {
  const { data } = await $fetch('/api/hello', {
    method: 'POST',
    body: JSON.stringify({ userId: 'test@gmail.com' }),
  });

  console.log(data);
};
</script>

<template>
  <div>
    <q-btn
      label="123"
      @click="callApi"
    />
    <div id="visual">
      <VisualImgBox />
    </div>
    <div id="container">
      <product-list />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
