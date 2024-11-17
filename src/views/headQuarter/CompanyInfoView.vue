<template>
  <div class="company-info-container">
    <div class="button-area">
      <Button size="small" label="수정" />
    </div>

    <table>
      <tbody>
        <tr>
          <th>상호명</th>
          <td>{{ name }}</td>
          <th>사업자등록번호</th>
          <td>{{ businessNum }}</td>
          <th>법인등록번호</th>
          <td>{{ corporateNum }}</td>
        </tr>
        <tr>
          <th>대표자명</th>
          <td>{{ ceo }}</td>
          <th>주소</th>
          <td colspan="3">{{ address }}</td>
        </tr>
        <tr>
          <th>업종/업태</th>
          <td>{{ businessType }}</td>
          <th>대표번호</th>
          <td>{{ contact }}</td>
          <th>설립일</th>
          <td>{{ establishDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const name = ref('');
const businessNum = ref('');
const corporateNum = ref('');
const ceo = ref('');
const address = ref('');
const businessType = ref('');
const contact = ref('');
const establishDate = ref('');

onMounted(() => {
  name.value = '주식회사 메가가가가커피';
  businessNum.value = '111-11-11111';
  corporateNum.value = '-';
  ceo.value = '김대표';
  address.value = '서울 동작구 보라매로 87, 3층 플레이데이터';
  businessType.value = '일반소매업';
  contact.value = '1688-0000';
  establishDate.value = '2021-11-11';
});
</script>

<style scoped>
.company-info-container {
  .button-area {
    display: flex;
    justify-content: flex-end;
  }

  table {
    width: 100%;
    margin-top: 20px;
    border-spacing: 0;
    border-collapse: collapse;

    th {
      background-color: var(--p-surface-100);
    }

    th,
    td {
      padding: 5px 10px;
      border: 1px solid var(--p-surface-200);
    }
  }
}
</style>
