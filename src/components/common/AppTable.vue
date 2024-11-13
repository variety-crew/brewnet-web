<template>
  <div>
    <DataTable
      :value="data"
      size="small"
      paginator
      :rows-per-page-options="[10, 15, 20]"
      :rows="15"
      :pt="{
        header: {
          style: {
            'border-top': 'none',
          },
        },
        pcPaginator: {
          paginatorContainer: {
            style: {
              'border-bottom': 'none',
            },
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
          <p>총 {{ data.length }}건</p>

          <div class="right">
            <Button icon="pi pi-refresh" variant="outlined" aria-label="새로고침" severity="secondary" size="small" />
            <Button icon="pi pi-plus" label="직원 등록" size="small" />
          </div>
        </div>
      </template>
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        :sortable="col.sortable"
      />
    </DataTable>
  </div>
</template>

<script setup>
const { data, columns } = defineProps({
  data: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
});
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
