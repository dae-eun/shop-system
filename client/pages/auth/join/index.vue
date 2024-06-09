<script setup>
const user = ref({
    email: '',
    password: '',
    userName:'',
    phoneNumber:'',
    postNum:'',
    addr1:'',
    addr2:'',
});

const join = async () => {
    // TODO send user Data to the join endpoint and redirect if  successful 
    console.log(123)
};
</script>

<template>
    <div class="flex mT60 justify-center items-center h-screen bg-gray-200">
    <q-card class="my-16 max-w-sm w-600">
      <q-card-section class="join-ipt">
        <div class="text-h6 text-center q-mb-md">회원가입</div>
        <q-form @submit="join">
          <q-input v-model="user.email" class="mT10" outlined label="이메일" autofocus />
          <q-input v-model="user.password" class="mT10" outlined label="비밀번호" type="password" />
          <q-input v-model="user.userName" class="mT10" outlined label="이름" />
          <q-input v-model="user.phoneNumber" class="mT10" outlined label="연락처" />

          <div class="row justify-between items-stretch col-xs-12 mT10">
            <div class="col-6">
                <q-input v-model="user.postNum" readonly outlined label="우편번호" />
            </div>
            <div class="col-6 flex align-center">
                <q-btn label="주소찾기" class="mL10" />
            </div>
          </div>
          <div class="row justify-between items-start col-xs-12 mT10">
            <div class="col-6 ">
                <q-input v-model="user.addr1" readonly outlined label="주소" />
            </div>
            <div class="col-6 detail-address">
                <q-input v-model="user.addr2" outlined label="상세주소" />
            </div>
          </div>
          <div class="btn-center">
            <q-btn class="sign-in" label="회원가입" type="submit" color="primary" />
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
.join-ipt{
  display: flex;
  flex-direction: column;
  padding: 5.4rem 4.4rem 3rem;
  .sign-in {
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
  .detail-address {
    flex-grow: 1; /* 상세주소 필드가 가능한 한 많이 확장되도록 */
    text-align: right; /* 텍스트를 우측 정렬 */
  }
}
</style>