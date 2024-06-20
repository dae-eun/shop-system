<script setup>
import { getUserInfoStore } from '~/stores/auth/loginStore';

const supabase = useSupabaseClient();
const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) return;
  getUserInfoStore().logout();
  navigateTo('/');
};
</script>

<template>
  <div class="greeting-container">
    <p class="greeting">
      안녕하세요.<br>{{ getUserInfoStore().userInfo.userName }} 님
    </p>
    <ul class="menu-list">
      <!-- <li>
        <a
          href="#"
          class="cart"
        ><q-icon
          size="18px"
          name="shop"
        /></a>
      </li> -->
      <li v-if="getUserInfoStore().userInfo?.auth === 'admin'">
        <nuxt-link
          to="/cms"
          class="settings"
        ><q-icon
          size="18px"
          name="settings"
        /></nuxt-link>
      </li>
      <li>
        <a
          class="logout"
          @click="signOut"
        ><q-icon
          size="18px"
          name="logout"
        /></a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.greeting-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #f5f5f5;
}

.greeting {
  font-size: 18px;
  font-weight: bold;
}

.menu-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;

  li {
    margin-left: 15px;
  }

  a {
    text-decoration: none;
    color: #333;
    &:hover {
      color: #007bff;
    }
  }
}
</style>
