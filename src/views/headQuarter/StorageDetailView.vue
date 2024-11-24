<template>
  <div class="storage-detail-container">
    <template v-if="storageDetail">
      <div class="top-buttons">
        <Button
          label="목록으로"
          icon="pi pi-arrow-left"
          variant="text"
          severity="secondary"
          size="small"
          @click="clickBack"
        />

        <Button label="재고 확인" icon="pi pi-external-link" size="small" />
      </div>

      <AppTableStyled full-width>
        <tr>
          <th>창고코드</th>
          <td>{{ storageDetail.storageCode }}</td>
          <th>창고명</th>
          <td>{{ storageDetail.storageName }}</td>
          <th>등록일시</th>
          <td>{{ storageDetail.createdAt }}</td>
        </tr>
        <tr>
          <th>가동상태</th>
          <td><Tag rounded :value="storageDetail.active ? '정상' : '비가동'" /></td>
          <th>연락처</th>
          <td colspan="3">{{ storageDetail.contact }}</td>
        </tr>
        <tr>
          <th>주소</th>
          <td colspan="5">{{ storageDetail.address }}</td>
        </tr>
      </AppTableStyled>

      <div class="bottom-buttons">
        <Button size="small" variant="outlined" severity="secondary" label="수정" />
        <Button size="small" variant="outlined" severity="danger" label="삭제" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import AppTableStyled from '@/components/common/AppTableStyled.vue';
import HQStorageApi from '@/utils/api/HQStorageApi';

const route = useRoute();
const router = useRouter();

const storageDetail = ref(null);

const hqStorageApi = new HQStorageApi();

const getStorage = () => {
  const { storageCode } = route.params;
  if (!storageCode) return;

  hqStorageApi.getStorage(storageCode).then(data => {
    storageDetail.value = data;
  });
};

const clickBack = () => {
  router.back();
};

onMounted(() => {
  getStorage();
});
</script>

<style scoped>
.storage-detail-container {
  .top-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .bottom-buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  }
}
</style>
