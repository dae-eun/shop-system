<script setup>
import ImageCard from '~/components/items/ImageCard.vue';

const imageCardUseConfig = ref({
  width: 280,
  btn: [
    {
      color: 'teal',
      icon: 'arrow_back',
      label: 'arrow_back',
      btnfunction: (itemInfo) => {
        imageCardItems.value.findIndex((item, index) => {
          if (item.filePath === itemInfo.filePath) {
            if (index === 0) return;
            const temp = imageCardItems.value[index - 1];
            imageCardItems.value[index - 1] = item;
            imageCardItems.value[index] = temp;
          }
        });
      },
    },
    {
      color: 'teal',
      icon: 'arrow_forward',
      label: 'arrow_forward',
      btnfunction: (itemInfo) => {
        imageCardItems.value.findIndex((item, index) => {
          if (item.filePath === itemInfo.filePath) {
            if (index === imageCardItems.value.length - 1) return;
            const temp = imageCardItems.value[index + 1];
            imageCardItems.value[index + 1] = item;
            imageCardItems.value[index] = temp;
          }
        });
      },
    },
    {
      color: 'red',
      icon: 'arrow_downward',
      label: 'arrow_downward',
      btnfunction: (itemInfo) => {
        itemInfo.useAt = false;
      },
    },
  ],
});
const imageCardUnusedConfig = ref({
  width: 280,
  btn: [
    {
      color: 'gray',
      icon: 'delete',
      label: 'delete',
      btnfunction: (itemInfo) => {
        imageCardItems.value.findIndex((item, index) => {
          if (item.filePath === itemInfo.filePath) {
            imageCardItems.value.splice(index, 1);
          }
        });
      },
    },
    {
      color: 'blue',
      icon: 'arrow_upward',
      label: 'arrow_upward',
      btnfunction: (itemInfo) => {
        itemInfo.useAt = true;
      },
    },
  ],
});
const imageCardItems = ref([
  {
    filePath: 'shop-sys-bucket/__.jpg',
    title: 'title',
    useAt: true,
    sortOrdr: 1,
  },
  {
    filePath: 'shop-sys-bucket/__.jpg',
    title: 'title',
    useAt: true,
    sortOrdr: 1,
  },
  {
    filePath: 'shop-sys-bucket/____.PNG',
    title: 'title',
    useAt: true,
    sortOrdr: 2,
  },
  {
    filePath: 'shop-sys-bucket/__.jpg',
    title: 'title',
    useAt: true,
    sortOrdr: 3,
  },
  {
    filePath: 'shop-sys-bucket/__.jpg',
    title: 'title',
    useAt: false,
    sortOrdr: 3,
  },
  {
    filePath: 'shop-sys-bucket/__.jpg',
    title: 'title',
    useAt: true,
    sortOrdr: 3,
  },
]);

const isShow = ref(false);
const thumbnailItem = ref({
  title: '',
});
</script>

<template>
  <q-card-section class="q-pa-lg row items-start q-gutter-md">
    <div class="row justify-between full-width">
      <div class="text-h5">
        활성화 된 썸네일
      </div>
      <q-btn-group
        flat
        class="row justify-end mB20"
      >
        <q-btn
          flat
          square
          class="bg-primary text-white w-150"
          @click="isShow = true"
        >
          썸네일 추가
        </q-btn>
        <q-btn
          flat
          square
          class="bg-secondary text-white w-150 mL10"
        >
          적용
        </q-btn>
      </q-btn-group>
    </div>
    <q-card
      v-if="!imageCardItems.filter((item) => item.useAt).length"
      flat
      class="full-width q-ma-md"
    >
      <p class="fs-22 bold mT20 mB12 tc">
        <q-icon
          name="info"
          size="1.6rem"
        />
        활성화 된 썸네일이 없습니다.
      </p>
    </q-card>
    <q-scroll-area
      v-else
      :visible="true"
      class="full-width"
      style="height: 300px;"
    >
      <q-card
        class="row no-wrap"
        flat
      >
        <ImageCard
          v-for="(item) in imageCardItems.filter((item) => item.useAt)"
          :key="item.filePath"
          v-model:imageCardConfig="imageCardUseConfig"
          :image-card-item="item"
          style="border: 1px solid #ccc;"
        />
      </q-card>
    </q-scroll-area>
  </q-card-section>
  <q-card-section class="q-pa-md row items-start q-gutter-md">
    <div class="text-h5">
      비활성화 된 썸네일
    </div>
    <q-card
      v-if="!imageCardItems.filter((item) => !item.useAt).length"
      flat
      class="full-width q-ma-md"
    >
      <p class="fs-22 bold mT20 mB12 tc">
        <q-icon
          name="info"
          size="1.6rem"
        />
        비활성화 된 썸네일이 없습니다.
      </p>
    </q-card>
    <q-scroll-area
      v-else
      :visible="true"
      class="full-width"
      style="height: 300px;"
    >
      <q-card
        flat
        class="row no-wrap"
      >
        <ImageCard
          v-for="(item) in imageCardItems.filter((item) => !item.useAt)"
          :key="item.filePath"
          v-model:imageCardConfig="imageCardUnusedConfig"
          :image-card-item="item"
          style="border: 1px solid #ccc;"
        />
      </q-card>
    </q-scroll-area>
  </q-card-section>
  <!-- <ThumbnailUploader
    v-model:isShow="isShow"
    v-modle:thumbnailItem="thumbnailItem"
  /> -->
</template>

<style lang="scss" scoped>

</style>
