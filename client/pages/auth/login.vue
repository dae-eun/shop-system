<script setup>
const supabase = useSupabaseClient();
const { baseUrl } = useRuntimeConfig().public;
const signInWithOAuth = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${baseUrl}/auth/userCheck`,
    },
  });
  if (error) $event('onAlertModal', { contentVal: error });
};
</script>

<template>
  <div class="flex mT60 justify-center items-center h-screen bg-gray-200">
    <q-card class="my-16 max-w-sm w-600">
      <q-card-section class="login-ipt">
        <div class="text-h6 text-center q-mb-md">
          로그인
        </div>
        <q-btn
          class="bg-primary text-white"
          label="GitHube 로그인"
          @click="signInWithOAuth"
        />
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
