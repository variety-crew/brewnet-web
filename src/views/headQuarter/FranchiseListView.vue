<template>
  <div>
    <SearchArea>
      <AppInputText v-model="franchiseNameKeyword" label="지점명" />
      <AppFormField label="시/도">
        <AutoComplete
          v-model="addressKeyword"
          :suggestions="addressSuggestions"
          size="small"
          complete-on-focus
          @complete="onChangeAddressKeyword"
        />
      </AppFormField>
    </SearchArea>

    <AppTable
      :paginated-data="paginatedFranchises"
      :columns="columns"
      :total-elements="franchises.length"
      show-excel-export
      @change-page="onChangePage"
      @reload="reload"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import AppTable from '@/components/common/AppTable.vue';
import AppFormField from '@/components/common/form/AppFormField.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import SearchArea from '@/components/common/SearchArea.vue';
import { useAppConfirmModal } from '@/hooks/useAppConfirmModal';
import { mockupFranchises } from '@/utils/mockup';

const { showConfirm } = useAppConfirmModal();
const router = useRouter();

const franchises = ref([]);
const paginatedFranchises = computed(() => {
  return franchises.value.slice(0, 15);
});
const franchiseNameKeyword = ref('');
const addressKeyword = ref(null);
const allAddress = [
  '서울',
  '부산',
  '인천',
  '대구',
  '대전',
  '광주',
  '울산',
  '세종특별자치시',
  '경기도',
  '충청북도',
  '충청남도',
  '전라북도',
  '전라남도',
  '경상북도',
  '경상남도',
  '제주',
  '강원도',
];
const addressSuggestions = ref([]);

const clickEdit = data => {
  router.push({ name: 'hq:partner:franchise:edit', params: { franchiseCode: data.code } });
};

const onRemove = targetCode => {
  console.log(targetCode, '가맹점 삭제 API');
};

const clickRemove = data => {
  showConfirm({
    header: '가맹점 삭제',
    message: `[${data.franchiseName}] 가맹점을 삭제하시겠습니까?`,
    acceptLabel: '네, 삭제합니다.',
    danger: true,
    onAccept: () => onRemove(data.code),
  });
};

const columns = [
  { field: 'code', header: '가맹점코드' },
  { field: 'franchiseName', header: '지점명', sortable: true },
  { field: 'address', header: '주소' },
  { field: 'detailAddress', header: '상세주소' },
  { field: 'contact', header: '연락처' },
  { field: 'businessNumber', header: '사업자등록번호' },
  { field: 'ceo', header: '대표자명' },
  {
    field: '',
    header: '',
    template: {
      button: [
        { label: '정보수정', clickHandler: clickEdit },
        { label: '삭제', clickHandler: clickRemove },
      ],
    },
  },
];

const onChangePage = event => {
  const { page } = event;
  console.log(page, '페이지로 변경되었다!');
};

const reload = () => {
  console.log('reload 테이블');
};

const onChangeAddressKeyword = event => {
  if (!event.query) addressSuggestions.value = allAddress;
  addressSuggestions.value = allAddress.filter(e => e.includes(event.query));
};

onMounted(() => {
  franchises.value = [...mockupFranchises];
});
</script>

<style scoped></style>
