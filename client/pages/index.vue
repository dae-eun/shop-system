<script setup>
import ProductList from '~/components/board/product/ProductList.vue';
import VisualImgBox from '~/components/layouts/VisualImgBox.vue';

const supabase = useSupabaseClient();

const callApi = async () => {
  const { data } = await $fetch('/api/hello', {
    method: 'POST',
    body: JSON.stringify({ userId: 'test@gmail.com' }),
  });

  console.log(data);
};

onMounted(async () => {
  console.log(supabase);
  const { data: dbData, error: dbError } = await supabase.from('information_schema.tables').select('*').limit(1);

  if (dbError) {
    error.value = dbError.message;
  } else {
    data.value = dbData;
  }
});
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
