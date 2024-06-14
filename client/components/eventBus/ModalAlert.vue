<script setup>
const visible = ref(false);
let content = null;
let callback = null;

const { $listen } = useNuxtApp();
onMounted(() => {
  $listen('onAlertModal', ({ contentVal, callbackFunc }) => {
    visible.value = true;
    content = contentVal;
    if (callbackFunc) callback = callbackFunc;
  });
});

const closeDialog = () => {
  visible.value = false;
  if (callback) callback();
  callback = null;
};
</script>

<template>
  <q-dialog
    v-model="visible"
    persistent
  >
    <q-card class="T20">
      <q-card-section
        class="q-pt-none"
        style="min-width: 300px;"
      >
        {{ content }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          v-close-popup
          flat
          label="OK"
          color="primary"
          @click="closeDialog"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
