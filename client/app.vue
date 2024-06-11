<script setup>
import ModalAlert from '~/components/eventBus/ModalAlert.vue';
import ModalConfirm from '~/components/eventBus/ModalConfirm.vue';
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
      <ModalAlert />
      <ModalConfirm />
    </NuxtLayout>
  </div>
</template>
