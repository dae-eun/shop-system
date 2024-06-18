<script setup>
import ThumbnailUploader from '~/components/cms/ThumbnailUploader';
import ImageCard from '~/components/cms/items/ImageCard';
import { thumbStore } from '~/stores/thumb/thumbStore';

const { showAlertModal, showConfirmModal } = useModal();

const imageCardUseConfig = ref({
  width: 280,
  btn: [
    {
      color: 'teal',
      icon: 'arrow_back',
      label: 'arrow_back',
      btnfunction: async (itemInfo) => {
        const items = imageCardItems.value.filter(item => item.useAt);
        const index = items.findIndex(item => item.filePath === itemInfo.filePath);
        if (index > 0) {
          const prev = items[index - 1].sortOrdr;
          const now = items[index].sortOrdr;

          items[index - 1].sortOrdr = now;
          items[index].sortOrdr = prev;
          await updateData();
        }
      },
    },
    {
      color: 'teal',
      icon: 'arrow_forward',
      label: 'arrow_forward',
      btnfunction: async (itemInfo) => {
        const items = imageCardItems.value.filter(item => item.useAt);
        const index = items.findIndex(item => item.filePath === itemInfo.filePath);
        if (index === imageCardItems.value.filter(item => item.useAt).length - 1) return;
        const next = items[index + 1].sortOrdr;
        const now = items[index].sortOrdr;

        items[index + 1].sortOrdr = now;
        items[index].sortOrdr = next;
        await updateData();
      },
    },
    {
      color: 'red',
      icon: 'arrow_downward',
      label: 'arrow_downward',
      btnfunction: async (itemInfo) => {
        const targetArray = imageCardItems.value.filter(item => item.useAt);
        const itemIndex = targetArray
          .findIndex(item => item.filePath === itemInfo.filePath);
        for (let i = itemIndex; i < targetArray.length - 1; i++) {
          targetArray[i + 1].sortOrdr--;
        }
        itemInfo.useAt = false;
        itemInfo.sortOrdr = null;
        await updateData();
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
            showConfirmModal('삭제하시겠습니까?', async () => {
              imageCardItems.value.splice(index, 1);
              await deleteData(itemInfo.thumbId);
            });
          }
        });
      },
    },
    {
      color: 'blue',
      icon: 'arrow_upward',
      label: 'arrow_upward',
      btnfunction: async (itemInfo) => {
        itemInfo.useAt = true;
        itemInfo.sortOrdr = imageCardItems.value.filter(item => item.useAt).length;
        await updateData();
      },
    },
  ],
});
const imageCardItems = ref([]);

const isShow = ref(false);
const getData = async () => {
  await thumbStore().getData().then(() => {
    if (thumbStore().statusCode !== 200) throw thumbStore().message;
    imageCardItems.value = thumbStore().thumbInfo;
  }).catch((error) => {
    console.error('데이터 조회에 실패하였습니다.:', error);
    showAlertModal(error);
  });
};
const updateData = async () => {
  await thumbStore().updateData(imageCardItems.value).then(async () => {
    if (thumbStore().statusCode !== 200) throw thumbStore().error;
    await getData();
  }).catch((error) => {
    console.error('업데이트에 실패하였습니다.:', error);
    showAlertModal(error);
  });
};
const deleteData = async (thumbId) => {
  try {
    await thumbStore().deleteData(thumbId);
    if (thumbStore().statusCode !== 200) throw thumbStore().error;
    showAlertModal(thumbStore().message, async () => {
      await getData();
    });
  } catch (error) {
    console.error('삭제에 실패하였습니다.:', error);
    showAlertModal(error);
  }
};
watchEffect(() => {
  imageCardItems.value.sort((a, b) => a.sortOrdr - b.sortOrdr);
});
onMounted(async () => {
  await getData();
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
        <!-- <q-btn
          flat
          square
          class="bg-secondary text-white w-150 mL10"
          @click="updateData"
        >
          적용
        </q-btn> -->
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
          v-for="(item, index) in imageCardItems.filter((item) => !item.useAt)"
          :key="index"
          v-model:imageCardConfig="imageCardUnusedConfig"
          :image-card-item="item"
          style="border: 1px solid #ccc;"
        />
      </q-card>
    </q-scroll-area>
  </q-card-section>
  <ThumbnailUploader
    v-model:isShow="isShow"
    @reset="getData"
  />
</template>

<style lang="scss" scoped>

</style>
