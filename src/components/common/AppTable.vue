<template>
  <div>
    <DataTable
      ref="dt"
      :value="paginatedData"
      size="small"
      :pt="{
        header: {
          style: {
            'border-top': 'none',
          },
        },
        column: {
          headerCell: {
            style: {
              'background-color': '#FAFAFA',
            },
          },
        },
        tableContainer: {
          style: {
            'border-bottom': '1px solid var(--p-datatable-border-color)',
          },
        },
      }"
      removable-sort
      scrollable
      scroll-height="400px"
    >
      <template #header>
        <div class="table-header">
          <p>총 {{ totalElements || 0 }}건</p>

          <div class="right">
            <Button
              icon="pi pi-refresh"
              variant="outlined"
              aria-label="새로고침"
              severity="secondary"
              size="small"
              @click="emit('reload')"
            />
            <Button
              v-if="showExcelExport"
              icon="pi pi-download"
              label="엑셀 다운로드"
              size="small"
              variant="outlined"
              severity="secondary"
              @click="exportCSV($event)"
            />
            <Button
              v-if="addButton"
              icon="pi pi-plus"
              :label="addButton.label"
              size="small"
              @click="addButton.clickHandler"
            />
          </div>
        </div>
      </template>
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        :sortable="col.sortable"
        :pt="{
          columnHeaderContent: {
            style: {
              'justify-content': 'center',
            },
          },
          bodyCell: {
            style: {
              'text-align': col.alignment || 'center',
            },
          },
        }"
      >
        <!-- 태그로 표시할 경우 -->
        <template v-if="col.template?.tag" #body="{ data }">
          <Tag
            :value="col.render ? col.render(data[col.field]) : data[col.field]"
            :severity="col.template.tag.getSeverity(data)"
          />
        </template>

        <!-- 버튼 리스트를 표시할 경우 -->
        <template v-else-if="col.template?.button" #body="{ data }">
          <div>
            <Button
              v-for="button in col.template.button"
              :key="button.label"
              :label="button.label"
              size="small"
              :severity="button.severity || 'info'"
              :variant="button.variant || 'text'"
              @click="button.clickHandler(data)"
            />
          </div>
        </template>

        <!-- 
        
        다른 템플릿을 넣고 싶으면 여기 사이에 넣어주세요
        
        -->

        <!-- template은 따로 없지만 render가 있는 경우 -->
        <template v-else-if="col.render" #body="{ data }">
          {{ col.render(data[col.field]) }}
        </template>
      </Column>
    </DataTable>

    <!-- 페이지네이션 -->
    <Paginator :rows="rowsPerPage" :total-records="totalElements" @page="emit('changePage', $event)"></Paginator>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const { paginatedData, columns, rowsPerPage, totalElements, addButton, showExcelExport } = defineProps({
  paginatedData: {
    type: Array,
    required: true,
  },
  totalElements: {
    type: Number,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  /**
   * columns: [{
   *   field: string               // 테이블 데이터의 필드명
   *   header: string              // 테이블 컬럼명
   *   sortable: boolean           // 정렬(ASC/DESC) 가능 여부
   *   render: (data: T) => string // render 될 내용 (서버에서 보낸 데이터와 표시할 데이터 형태가 다를 때 사용)
   *   template: {                 // 다른 뷰를 띄울 경우 셋팅
   *     tag: {                    // 태그 뷰를 사용할 경우 셋팅
   *       getSeverity: (data: T) => string // 태그 뷰 색상 설정(메소드의 return 값은 프라임뷰 tag의 severity 값이어야 함)
   *     },
   *     button: {[
   *       {
   *         label: string                   // 버튼 label
   *         clickHandler: (data: T) => void // 버튼 클릭 시 동작할 handler 메소드
   *         severity: string                // 프라임뷰 버튼 severity 값
   *         variant: string                 // 프라임뷰 버튼 variant 값
   *       }
   *     ]}
   *   }
   *   alignment: string            // 정렬 ('left', 'center', 'right')
   * }]
   */
  rowsPerPage: {
    type: Number,
    required: false,
    default: 15,
  },
  addButton: {
    type: Object,
    required: false,
    default: () => {
      return undefined;
    },
  },
  /**
   * addButton: {
   *   label: string             // 버튼 label
   *   clickHandler: () => void  // 버튼 클릭 핸들러 메소드
   * }
   */
  showExcelExport: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(['changePage', 'reload']);

const dt = ref();
const exportCSV = () => {
  dt.value.exportCSV();
};
</script>

<style scoped>
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .right {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>
