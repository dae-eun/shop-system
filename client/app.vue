<script setup>
import ModalAlert from '~/components/eventBus/ModalAlert.vue';
import ModalConfirm from '~/components/eventBus/ModalConfirm.vue';
import { useLoading } from '~/stores/common/isLoading';
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
      <q-inner-loading
        :showing="useLoading().isLoading"
        label="Please wait..."
        label-class="text-teal"
        label-style="font-size: 1.1em"
        style="z-index: 99999"
      />
      <ModalAlert />
      <ModalConfirm />
    </NuxtLayout>
  </div>
</template>
