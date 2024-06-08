<script setup>
const set = async () => {
  const payload = {
    menuNm: 'Sample Menu',
    upperMenuId: 1,
    level: 1,
    url: '/sample-url',
    menuType: 'productBoard',
    pageType: 'infinite',
    sortOrdr: 1,
    useAt: true
  };

  const { data, error } = await useFetch('http://localhost:4000/api/menu', {
    method: 'POST',
    body: payload
  });

  if (error.value) {
    console.error('Failed to create menu:', error.value);
  } else {
    console.log('Menu created:', data.value);
  }
};

const getMenuInfo = async () => {
  const { data } = await $fetch('/api/getMenu')
  console.log(data)
}
const data = await $fetch('/api/getMenu')
console.log(data)
</script>
<q-btn @click="set"> 버튼 </q-btn>
<q-btn @click="getMenuInfo"> 불러오기 </q-btn>
</template>
<style lang="scss" scoped></style>
