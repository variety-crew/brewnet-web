<template>
  <div>
    <SearchArea grid @search="onSearch" @form-reset="onReset">
      <AppInputText v-model="criteria.franchiseNameKeyword" label="지점명" />
      <AppAutoComplete
        v-model="criteria.addressKeyword"
        label="시/도"
        :suggestions="addressSuggestions"
        full-width
        @complete-input="onChangeAddressKeyword"
      />
    </SearchArea>

    <AppTable
      :paginated-data="paginatedFranchises"
      :columns="columns"
      :total-elements="totalElements"
      :rows-per-page="pageSize"
      @change-page="onChangePage"
      @reload="reload"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import AppTable from '@/components/common/AppTable.vue';
import AppAutoComplete from '@/components/common/form/AppAutoComplete.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import SearchArea from '@/components/common/SearchArea.vue';
import { useAppConfirmModal } from '@/hooks/useAppConfirmModal';
import HQFranchiseApi from '@/utils/api/HQFranchiseApi';
import { makeAutocompleteSuggestion } from '@/utils/helper';

const { showConfirm } = useAppConfirmModal();
const router = useRouter();

const page = ref(0);
const paginatedFranchises = ref([]);
const pageSize = ref(15);
const totalElements = ref(0);
const getInitialCriteria = () => ({
  franchiseNameKeyword: '',
  addressKeyword: null,
});
const criteria = ref(getInitialCriteria());
const allAddress = [
  '서울',
  '부산',
  '인천',
  '대구',
  '대전',
  '광주',
  '울산',
  '세종특별자치시',
  '경기',
  '충북',
  '충남',
  '전남',
  '경북',
  '경남',
  '강원특별자치도',
  '전북특별자치도',
  '제주특별자치도',
].map(e => makeAutocompleteSuggestion(e, e));
const addressSuggestions = ref([]);

const hqFranchiseApi = new HQFranchiseApi();

const clickEdit = data => {
  router.push({ name: 'hq:partner:franchise:edit', params: { franchiseCode: data.franchiseCode } });
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
  { field: 'franchiseCode', header: '가맹점코드' },
  { field: 'franchiseName', header: '지점명', sortable: true },
  { field: 'address', header: '주소' },
  { field: 'contact', header: '연락처' },
  { field: 'businessNumber', header: '사업자등록번호' },
  { field: 'name', header: '대표자명' },
  {
    field: '',
    header: '',
    template: {
      button: [
        { getLabel: () => '정보수정', clickHandler: clickEdit },
        { getLabel: () => '삭제', clickHandler: clickRemove },
      ],
    },
  },
];

const getFranchiseList = () => {
  hqFranchiseApi
    .getFranchiseList({
      page: page.value,
      pageSize: pageSize.value,
      franchiseName: criteria.value.franchiseNameKeyword,
      citys: criteria.value.addressKeyword ? [criteria.value.addressKeyword.label] : undefined,
    })
    .then(data => {
      paginatedFranchises.value = data.content;
      totalElements.value = data.totalElements;
    })
    .catch(e => {
      // 조건에 맞는 가맹점이 없는 경우
      paginatedFranchises.value = [];
      totalElements.value = 0;
    });
};

const onChangePage = event => {
  page.value = event.page;
  getFranchiseList();
};

const reload = () => {
  getFranchiseList();
};

const onChangeAddressKeyword = event => {
  if (!event.query) {
    addressSuggestions.value = allAddress;
    return;
  }

  addressSuggestions.value = allAddress.filter(e => e.includes(event.query));
};

const onSearch = () => {
  getFranchiseList();
};

const onReset = () => {
  criteria.value = getInitialCriteria();
  page.value = 0;
  getFranchiseList();
};

onMounted(() => {
  getFranchiseList();
});
</script>

<style scoped></style>
