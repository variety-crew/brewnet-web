<template>
  <div class="company-info-container">
    <div class="button-area">
      <Button v-if="!editMode" size="small" label="수정" @click="clickEdit" />
      <template v-else>
        <Button size="small" label="취소" variant="outlined" severity="secondary" @click="clickCancel" />
        <Button size="small" label="저장" @click="clickSave" />
      </template>
    </div>

    <AppTableStyled>
      <tbody>
        <tr>
          <th>상호명</th>
          <td v-if="!editMode">{{ companyInfo.name }}</td>
          <td v-else>
            <AppInputText v-model="name" />
          </td>
          <th>사업자등록번호</th>
          <td v-if="!editMode">{{ companyInfo.businessNum }}</td>
          <td v-else><AppInputText v-model="businessNum" /></td>
          <th>법인등록번호</th>
          <td v-if="!editMode">{{ companyInfo.corporateNum }}</td>
          <td v-else>
            <AppInputText v-model="corporateNum" />
          </td>
        </tr>
        <tr>
          <th>대표자명</th>
          <td v-if="!editMode">{{ companyInfo.ceo }}</td>
          <td v-else>
            <AppInputText v-model="ceo" />
          </td>
          <th>주소</th>
          <td v-if="!editMode" colspan="3">{{ companyInfo.address }}</td>
          <td v-else colspan="3">
            <AppInputText v-model="address" />
          </td>
        </tr>
        <tr>
          <th>업종/업태</th>
          <td v-if="!editMode">{{ companyInfo.businessType }}</td>
          <td v-else>
            <AppInputText v-model="businessType" />
          </td>
          <th>대표번호</th>
          <td v-if="!editMode">{{ companyInfo.contact }}</td>
          <td v-else>
            <AppInputText v-model="contact" />
          </td>
          <th>설립일</th>
          <td v-if="!editMode">{{ companyInfo.establishDate }}</td>
          <td v-else>
            <AppInputText v-model="establishDate" />
          </td>
        </tr>
      </tbody>
    </AppTableStyled>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';

import AppTableStyled from '@/components/common/AppTableStyled.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';

const companyInfo = ref({
  name: '',
  businessNum: '',
  corporateNum: '',
  ceo: '',
  address: '',
  businessType: '',
  contact: '',
  establishDate: '',
});

const name = ref('');
const businessNum = ref('');
const corporateNum = ref('');
const ceo = ref('');
const address = ref('');
const businessType = ref('');
const contact = ref('');
const establishDate = ref('');
const editMode = ref(false);

const clickEdit = () => {
  editMode.value = true;
};

const clickCancel = () => {
  editMode.value = false;
};

const clickSave = () => {
  editMode.value = false;
};

onMounted(() => {
  companyInfo.value = {
    name: '주식회사 메가가가가커피',
    businessNum: '111-11-11111',
    corporateNum: '',
    ceo: '김대표',
    address: '서울 동작구 보라매로 87, 3층 플레이데이터',
    businessType: '일반소매업',
    contact: '1688-0000',
    establishDate: '2021-11-11',
  };
});

watch(editMode, newVal => {
  if (newVal) {
    name.value = companyInfo.value.name;
    businessNum.value = companyInfo.value.businessNum;
    corporateNum.value = companyInfo.value.corporateNum;
    ceo.value = companyInfo.value.ceo;
    address.value = companyInfo.value.address;
    businessType.value = companyInfo.value.businessType;
    contact.value = companyInfo.value.contact;
    establishDate.value = companyInfo.value.establishDate;
  }
});
</script>

<style scoped>
.company-info-container {
  .button-area {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }

  table {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
