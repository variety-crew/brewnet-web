<template>
  <div>
    <!-- 검색 area -->
    <SearchArea grid class="exchange-search" @search="onSearch" @form-reset="onReset">
      <AppDateRangePicker
        v-model:start="criteria.startDate"
        v-model:end="criteria.endDate"
        label="작성일자"
        class="criteria created-at"
      />
      <AppSelect
        v-model="criteria.criteria"
        label="검색조건"
        :options="searchOptions"
        :initial-value="criteria.criteria"
      />
      <AppInputText id="input_name_keyword" v-model="criteria.keyword" label="검색어" />
    </SearchArea>

    <AppTable
      :paginated-data="paginatedExchanges"
      :columns="columns"
      :total-elements="totalElements"
      :rows-per-page="size"
      show-excel-export
      @reload="reloadData"
      @change-page="onChangePage"
      @export-excel="onExportExcel"
    />

    <DynamicDialog />
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { useToast } from 'primevue';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

import AppTable from '@/components/common/AppTable.vue';
import AppDateRangePicker from '@/components/common/form/AppDateRangePicker.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import SearchArea from '@/components/common/SearchArea.vue';
import HQExchangeApi from '@/utils/api/HQExchangeApi';
import { CRITERIA_HQ_EXCHANGE_LIST, SEARCH_CRITERIA } from '@/utils/constant';
import ExcelManager from '@/utils/ExcelManager';
import { formatKoConfirmedStatus, formatKoExchangeOtherStatus, formatKoSearchCriteria } from '@/utils/format';
import { getConfirmedStatusSeverity, getExchangeOtherStatusSeverity, makeSelectOption } from '@/utils/helper';

const router = useRouter();
const toast = useToast();

const totalElements = ref(0);
const page = ref(0);
const size = ref(15);

const nameKeyword = ref('');
const paginatedExchanges = ref([]);

const startDate = ref(dayjs().subtract(1, 'year').toDate());
const endDate = ref(new Date());

const getInitialCriteria = () => ({
  startDate: dayjs().subtract(1, 'year').toDate(),
  endDate: new Date(),
  criteria: SEARCH_CRITERIA.EXCHANGE_CODE,
  keyword: '',
});

const criteria = ref(getInitialCriteria());
const hqExchangeApi = new HQExchangeApi();
const searchOptions = computed(() => {
  return CRITERIA_HQ_EXCHANGE_LIST.map(e => makeSelectOption(formatKoSearchCriteria(e), e));
});

function clickGoDetail(data) {
  router.push({
    name: 'hq:order:exchange:other-detail',
    params: { exchangeStockHistoryCode: data.exchangeStockHistoryCode },
  });
}

const columns = [
  {
    field: 'status',
    header: '처리상태',
    render: data => formatKoExchangeOtherStatus(data.status),
    template: {
      tag: {
        getSeverity: data => getExchangeOtherStatusSeverity(data.status),
      },
    },
  },
  { field: 'exchangeStockHistoryCode', header: '처리번호', sortable: true },
  { field: 'manager', header: '처리담당자' },
  { field: 'createdAt', header: '처리완료일자' },
  {
    field: 'confirmed',
    header: '내역확인여부',
    render: data => formatKoConfirmedStatus(data.confirmed),
    template: {
      tag: {
        getSeverity: data => getConfirmedStatusSeverity(data.confirmed),
      },
    },
  },
  { field: 'exchangeCode', header: '교환번호' },
  { field: 'exchangeManager', header: '교환담당자' },
  {
    field: '',
    header: '',
    template: {
      button: [
        {
          getLabel: () => '상세보기',
          clickHandler: clickGoDetail,
        },
      ],
    },
  },
];

const getExchangesOther = () => {
  hqExchangeApi
    .searchOtherExchanges({
      page: page.value,
      size: size.value,
      startDate: criteria.value.startDate,
      endDate: criteria.value.endDate,
      criteria: criteria.value.criteria,
      keyword: criteria.value.keyword,
    })
    .then(data => {
      totalElements.value = data.totalElements;
      paginatedExchanges.value = data.content;
    });
};

const reloadData = () => {
  getExchangesOther();
};

const onChangePage = event => {
  page.value = event.page;
  getExchangesOther();
};

const onSearch = () => {
  getExchangesOther();
};

const onReset = () => {
  criteria.value = getInitialCriteria();
  page.value = 0;
  getExchangesOther();
};

// const onExportExcel = () => {
//   hqExchangeApi
//     .getAllExchangeList({
//       // startDate: criteria.value.startDate,
//       // endDate: criteria.value.endDate,
//       // criteria: criteria.value.criteria,
//       // keyword: criteria.value.keyword,
//     })
//     .then(rows => {
//       const orderedFields = columns.filter(e => e.field).map(e => e.field); // 엑셀 컬럼 순서
//       const headerNames = columns.filter(e => e.field).map(e => e.header); // 헤더명

//       const excelManager = new ExcelManager(rows, orderedFields);
//       excelManager.setHeaderNames(headerNames);
//       excelManager.export(`교환목록${dayjs().format('YYMMDD')}`);
//     })
//     .catch(e => {
//       toast.add({ severity: 'error', summary: '처리 실패', detail: e.message, life: 3000 });
//     });
// };

onMounted(() => {
  getExchangesOther();
});
</script>

<style scoped>
.exchange-search {
  .criteria.use-date {
    grid-column: 1 / 7;
  }
}
</style>
