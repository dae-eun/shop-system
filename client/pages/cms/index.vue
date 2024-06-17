<script setup>

</script>

<template>
  <div>
    <q-card-section>
      <p class="text-h5">
        기능설명
      </p>
    </q-card-section>
    <q-card-section>
      <q-list>
        <q-item>
          <nuxt-link
            class="text-h6"
            to="/cms/contentManage/thumbnail"
          >
            THUMBNAIL
          </nuxt-link>
          메인화면의 썸네일을 관리하는 페이지입니다.
        </q-item>
        <q-item>
          <nuxt-link
            class="text-h6"
            to="/cms/contentManage/menu"
          >
            MENU
          </nuxt-link>
          사용자에게 노출되는 메뉴를 관리하는 페이지입니다.
        </q-item>
        <q-item>
          <nuxt-link
            class="text-h6"
            to="/cms/contentManage/board"
          >
            BOARD
          </nuxt-link>
          사용자에게 노출되는 메뉴의 컨텐츠를 관리하는 페이지입니다.
        </q-item>
      </q-list>
    </q-card-section>
  </div>
</template>

<style lang="scss" scoped>
</style>
