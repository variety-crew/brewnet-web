<template>
  <div class="my-info-container">
    <template v-if="memberDetail">
      <AppLabelText label="아이디" :text="memberDetail.id" />
      <AppLabelText label="성명" :text="memberDetail.name" />
      <AppLabelText label="이메일" :text="memberDetail.email" />
      <AppLabelText label="휴대폰번호" :text="memberDetail.contact" />
      <AppLabelText label="직급" :text="formatKoEmployeePosition(memberDetail.positionName)" />

      <template v-if="memberDetail.signatureUrl">
        <div class="signature">
          <AppLabel label="서명" />
          <img :src="memberDetail.signatureUrl" alt="내 서명 이미지" />
          <Button
            label="서명 삭제"
            size="small"
            severity="secondary"
            variant="outlined"
            @click="clickRemoveSignature"
          />
        </div>
      </template>
      <template v-else>
        <AppLabelText label="서명" text="등록된 서명이 없습니다." />
      </template>
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import AppLabel from '@/components/common/AppLabel.vue';
import AppLabelText from '@/components/common/AppLabelText.vue';
import MemberApi from '@/utils/api/MemberApi';
import { formatKoEmployeePosition } from '@/utils/format';

const memberDetail = ref(null);
const memberApi = new MemberApi();

const clickRemoveSignature = () => {
  console.log('서명 삭제 API');
};

onMounted(() => {
  // 내 정보 조회
  memberApi.getMyInfo().then(data => {
    memberDetail.value = data;
  });
});
</script>

<style scoped>
.my-info-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;

  .signature {
    display: flex;
    flex-direction: column;
    gap: 5px;

    img {
      width: 70px;
      height: 70px;
      object-fit: contain;
    }
  }
}
</style>
