<script setup>
import { getUserInfoStore } from '~/stores/auth/loginStore';

const { showAlertModal } = useModal();

onMounted(async () => {
  const data = await getUserInfoStore().getUserInfo();
  if (data.statusCode === 200) return navigateTo('/');
  else if (data.statusCode === 201) return showAlertModal('등록된 회원정보가 없습니다. 회원정보를 등록해주세요.', () => { navigateTo('/auth/sign-up'); });
  showAlertModal('로그인에 실패하였습니다.');
});
</script>

<template>
  <div class="flex mT60 justify-center items-center h-screen bg-gray-200">
    <q-card
      class="my-16 max-w-sm w-600 text-center"
      flat
    >
      계정정보 확인 중...
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
