<script setup>
const visible = ref(false);
let content = null;
let callback = null;
let cancel = null;
let confirm = null;
let cancelCallback = null;

const { $listen } = useNuxtApp();
onMounted(() => {
  $listen('onConfirmModal', ({ contentVal, cancelVal, confirmVal, callbackFunc, cancelCallbackFunc }) => {
    visible.value = true;
    content = contentVal;
    cancel = cancelVal;
    confirm = confirmVal;
    if (callbackFunc) callback = callbackFunc;
    if (cancelCallbackFunc) cancelCallback = cancelCallbackFunc;
  });
});

const confirmClose = (isCallback) => {
  visible.value = false;
  if (isCallback) {
    callback();
  } else if (cancelCallback) cancelCallback();
  callback = null;
  cancelCallback = null;
};
</script>

<template>
  <q-dialog
    v-model="visible"
    persistent
  >
    <q-card class="T0 B0">
      <q-card-section
        class="row items-center"
        style="min-width: 300px;"
      >
        <span class="q-ml-sm">{{ content }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          v-close-popup
          flat
          :label="confirm"
          color="primary"
          @click="confirmClose(true)"
        />
        <q-btn
          v-close-popup
          flat
          :label="cancel"
          color="primary"
          @click="confirmClose(false)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
