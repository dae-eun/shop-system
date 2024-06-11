<script setup></script>

<template>
  <div class="button-container">
    <nuxt-link
      to="/auth/login"
      class="login-button"
    >
      로그인
    </nuxt-link>
    <nuxt-link
      to="/auth/sign-in"
      class="signup-button"
    >
      회원가입
    </nuxt-link>
  </div>
</template>

<style lang="scss" scoped>
.button-container {
  display: flex;
  justify-content: center;
  gap: 10px; // 버튼 간격
  padding: 20px;
  background-color: #f5f5f5;
}

.login-button,
.signup-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #007bff;
    color: white;
  }
}

.login-button {
  background-color: #007bff;
  color: white;
}

.signup-button {
  background-color: #acadf3;
  color: white;
}
</style>
