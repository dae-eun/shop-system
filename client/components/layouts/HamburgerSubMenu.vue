<script setup></script>

<template>
  <div>
    <q-list bordered>
      <q-expansion-item
        label="가나다"
        class="active"
      >
        <q-card>
          <q-card-section> 123 </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-item>
        <nuxt-link>이동</nuxt-link>
      </q-item>
    </q-list>
  </div>
</template>

<style lang="scss" scoped>
.active {
  background: #3769e7;
  color: white;
}
</style>
