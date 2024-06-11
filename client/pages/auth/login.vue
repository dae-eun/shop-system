<script setup>
import { useAuthStore } from '~/stores/auth/loginStore';

const { $event } = useNuxtApp()

const user = ref({
  email: '',
  password: '',
})

const checkVali = () => {
  if (!user.value.email) {
    $event('onAlertModal', { contentVal: '아이디를 입력해주세요.' })
    return false
  }
  if (!user.value.password) {
    $event('onAlertModal', { contentVal: '비밀번호를 입력해주세요.' })
    return false
  }
  return true
}

const login = async () => {
  if (!checkVali()) { return }
  await useAuthStore().login(user.value)
  if (useAuthStore().status === 'error') { return $event('onAlertModal', { contentVal: '로그인에 실패했습니다.' }) }
  await navigateTo('/')
}
</script>

<template>
  <div class="flex mT60 justify-center items-center h-screen bg-gray-200">
    <q-card class="my-16 max-w-sm w-600">
      <q-card-section class="login-ipt">
        <div class="text-h6 text-center q-mb-md">
          로그인
        </div>
        <q-form @submit="login">
          <q-input
            v-model="user.email"
            class="mT10"
            outlined
            label="이메일"
            autofocus
          />
          <q-input
            v-model="user.password"
            class="mT10"
            outlined
            label="비밀번호"
            type="password"
          />
          <div class="btn-center">
            <q-btn
              label="로그인"
              type="submit"
              color="primary"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<style lang="scss" scoped>
.w-600 {
  width: 600px;
}

.login-ipt {
  display: flex;
  flex-direction: column;
  padding: 5.4rem 4.4rem 3rem;

  .q-btn {
    font-size: 2rem;
    border-radius: 5px;
    height: 7rem;
    margin-top: 1.5rem;

    &:before {
      border-radius: 5px;
    }
  }

  .btn-center {
    display: flex;
    justify-content: center;
  }
}
</style>
