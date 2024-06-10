<script setup>
import { addressSearch } from "@/composables/utils/addressSearch.js";

const user = ref({
  email: "",
  password: "",
  chkPassword: "",
  userName: "",
  phoneNumber: "",
  postNum: "",
  addr1: "",
  addr2: "",
});

const join = async () => {
  try {
    const response = await $fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(user.value),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      // 성공 시 로직 구현
    } else {
      console.error("회원가입 실패:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const findAddress = () => {
  addressSearch((data) => {
    user.value.postNum = data.zonecode;
    user.value.addr1 = data.address;
  });
};

const user_id_rules = (v) => {
  if (!v) {
    return "아이디를 입력해주세요.";
  }
  const form = !v.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);
  if (form) {
    return "이메일 형식을 입력해주세요.";
  }
  return true;
};
const user_pw_rules = (v) => {
  if (!v) return "패스워드를 입력해주세요.";
  const form = !v.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/);
  if (form) {
    return "숫자, 소문자, 대문자, 특수문자를 모두 포함하여 입력해주세요.";
  }
  if (v.length < 8 || v.length > 21)
    return "비밀번호는 8글자 이상 20글자 이하로 입력해주세요.";
  return true;
};
const user_pw_check_rules = (v) => {
  if (v !== user.value.password)
    return "입력하신 비밀번호와 일치하지 않습니다.";
  return true;
};
const user_name_rules = (v) => {
  if (!v) return "이름을 입력해주세요.";
  const special = v.match(/[^a-zA-Z가-힣\s]/g);
  if (special) {
    return "특수문자는 입력할 수 없습니다.";
  }
  return true;
};
const user_phone_rules = (v) => {
  if (!v) return "전화번호를 입력해주세요.";
  const number = v.match(/\D/g);
  if (number) {
    return "문자와 특수문자를 제외한 숫자만 입력해주세요.";
  }
  return true;
};
const user_detail_rules = (v) => {
  if (!v) return "상세주소를 입력해주세요..";
  return true;
};
</script>

<template>
  <div class="flex mT60 justify-center items-center h-screen bg-gray-200">
    <q-card class="my-16 max-w-sm w-600">
      <q-card-section class="join-ipt">
        <div class="text-h6 text-center q-mb-md">회원가입</div>
        <q-form @submit="join">
          <q-input
            v-model="user.email"
            class="mT10"
            :rules="[user_id_rules]"
            outlined
            label="이메일"
            autofocus
            autocomplete="username"
          />
          <q-input
            v-model="user.password"
            class="mT10"
            :rules="[user_pw_rules]"
            outlined
            label="비밀번호"
            type="password"
            autocomplete="current-password"
            @update:model-value="user.chkPassword = ''"
          />
          <q-input
            v-model="user.chkPassword"
            class="mT10"
            :rules="[user_pw_check_rules]"
            outlined
            label="비밀번호 확인"
            type="password"
            autocomplete="current-password"
          />
          <q-input
            v-model="user.userName"
            class="mT10"
            :rules="[user_name_rules]"
            outlined
            label="이름"
          />
          <q-input
            v-model="user.phoneNumber"
            class="mT10"
            :rules="[user_phone_rules]"
            outlined
            label="연락처"
          />

          <div class="row justify-between items-stretch col-xs-12 mT10">
            <div class="col-6">
              <q-input
                v-model="user.postNum"
                readonly
                outlined
                label="우편번호"
              />
            </div>
            <div class="col-6 flex align-center">
              <q-btn label="주소찾기" class="mL10" @click="findAddress" />
            </div>
          </div>
          <div class="row justify-between items-start col-xs-12 mT10">
            <div class="col-6">
              <q-input v-model="user.addr1" readonly outlined label="주소" />
            </div>
            <div class="col-6 detail-address">
              <q-input
                v-model="user.addr2"
                :rules="[user_detail_rules]"
                outlined
                label="상세주소"
                class="mL10"
              />
            </div>
          </div>
          <div class="btn-center">
            <q-btn
              class="sign-in"
              label="회원가입"
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

.join-ipt {
  display: flex;
  flex-direction: column;
  padding: 5.4rem 4.4rem 3rem;

  .sign-in {
    font-size: 1.6rem;
    border-radius: 5px;
    height: 4rem;
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
    flex-grow: 1;
    /* 상세주소 필드가 가능한 한 많이 확장되도록 */
    text-align: right;
    /* 텍스트를 우측 정렬 */
  }
}
</style>
