<template>
  <div class="correspondent-list-container">
    <SearchArea grid @search="onSearch" @form-reset="onReset">
      <AppSelect
        v-model="criteria.criteria"
        :options="criteriaOptions"
        :initial-value="criteria.criteria"
        label="검색어"
        label-position="left"
        full-width
      />
      <AppInputText v-model="criteria.keyword" placeholder="검색어 입력" class="criteria keyword" />
    </SearchArea>

    <AppTable
      :columns="columns"
      :paginated-data="paginatedCorrespondents"
      :rows-per-page="pageSize"
      :total-elements="totalElements"
      show-excel-export
      @reload="onReload"
      @change-page="onChangePage"
      @export-excel="onExportToExcel"
    />

    <DynamicDialog />
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { computed, defineAsyncComponent, onMounted, ref } from 'vue';
import XLSX from 'xlsx';

import AppTable from '@/components/common/AppTable.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import AppSelect from '@/components/common/form/AppSelect.vue';
import SearchArea from '@/components/common/SearchArea.vue';
import { useModal } from '@/hooks/useModal';
import HQCorrespondentApi from '@/utils/api/HQCorrespondentApi';
import { CRITERIA_CORRESPONDENT_LIST, SEARCH_CRITERIA } from '@/utils/constant';
import ExcelManager from '@/utils/ExcelManager';
import { formatKoSearchCriteria } from '@/utils/format';
import { makeSelectOption } from '@/utils/helper';

const CorrespondentItemsModalBody = defineAsyncComponent(
  () => import('@/components/headQuarter/CorrespondentItemsModalBody.vue'),
);

const { openModal } = useModal();

const page = ref(1);
const pageSize = ref(15);
const paginatedCorrespondents = ref([]);
const totalElements = ref(0);

const getInitialCriteria = () => ({
  criteria: SEARCH_CRITERIA.CORRESPONDENT_NAME,
  keyword: '',
});
const criteria = ref(getInitialCriteria());
const criteriaOptions = computed(() => {
  return CRITERIA_CORRESPONDENT_LIST.map(e => makeSelectOption(formatKoSearchCriteria(e), e));
});

const hqCorrespondentApi = new HQCorrespondentApi();

const viewItems = data => {
  openModal({
    component: CorrespondentItemsModalBody,
    header: `[${data.correspondentName}] 품목 조회`,
    data: {
      correspondentCode: data.correspondentCode,
    },
  });
};

const columns = [
  {
    field: 'correspondentCode',
    header: '거래처코드',
  },
  {
    field: 'correspondentName',
    header: '거래처명',
  },
  {
    field: 'managerName',
    header: '담당자명',
  },
  {
    field: 'address',
    header: '주소',
  },
  {
    field: 'contact',
    header: '연락처',
  },
  {
    field: 'email',
    header: '이메일',
  },
  {
    field: '',
    header: '',
    template: {
      button: [
        {
          getLabel: () => '정보수정',
        },
        {
          getLabel: () => '품목조회',
          clickHandler: viewItems,
        },
        {
          getLabel: () => '삭제',
        },
      ],
    },
  },
];

const getCorrespondents = () => {
  hqCorrespondentApi
    .getCorrespondents({
      page: page.value,
      pageSize: pageSize.value,
      correspondentCode:
        criteria.value.criteria === SEARCH_CRITERIA.CORRESPONDENT_CODE ? criteria.value.keyword : undefined,
      correspondentName:
        criteria.value.criteria === SEARCH_CRITERIA.CORRESPONDENT_NAME ? criteria.value.keyword : undefined,
    })
    .then(data => {
      paginatedCorrespondents.value = data.data.map(e => ({
        correspondentCode: e.correspondentCode,
        correspondentName: e.correspondentName,
        managerName: e.managerName,
        address: `${e.address} ${e.detailAddress}`, // address는 하나로 표시하기 위해
        contact: e.contact,
        email: e.email,
      }));
      totalElements.value = data.totalCount;
    });
};

const onSearch = () => {
  getCorrespondents();
};

const onReset = () => {
  criteria.value = getInitialCriteria();
  page.value = 1;
  getCorrespondents();
};

const onReload = () => {
  getCorrespondents();
};

const onChangePage = event => {
  page.value = event.page + 1;
  getCorrespondents();
};

const onExportToExcel = () => {
  // TODO 엑셀용 데이터 API
  const rows = [...paginatedCorrespondents.value];

  const tableColumnFields = columns.filter(e => e.field).map(e => e.field);
  const tableColumnHeaders = columns.filter(e => e.field).map(e => e.header);
  const worksheet = XLSX.utils.json_to_sheet(rows, { header: tableColumnFields }); // 현재 테이블 컬럼 순서로 설정
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, '거래처 목록');
  XLSX.utils.sheet_add_aoa(worksheet, [tableColumnHeaders], { origin: 'A1' }); // 헤더명 변경

  // cell width 설정
  const cellWidths = [];
  tableColumnFields.forEach(field => {
    if (field === 'address') {
      const maxAddressWidth = rows.reduce((acc, r) => Math.max(acc, r.address.length), 10);
      cellWidths.push(maxAddressWidth);
    } else {
      cellWidths.push(10);
    }
  });
  worksheet['!cols'] = cellWidths.map(cellWidth => ({ wch: cellWidth }));

  XLSX.writeFile(workbook, `거래처목록${dayjs().format('YYMMDD')}.xlsx`, { compression: true }); // export
};

onMounted(() => {
  getCorrespondents();
});
</script>

<style scoped>
.correspondent-list-container {
  .criteria.keyword {
    grid-column: 2 / 4;
  }
}
</style>
