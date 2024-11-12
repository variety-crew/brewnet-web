<template>
  <Toolbar class="hq-topbar">
    <template #start>
      <!-- <Button icon="pi pi-plus" class="mr-2" severity="secondary" text />
      <Button icon="pi pi-print" class="mr-2" severity="secondary" text />
      <Button icon="pi pi-upload" severity="secondary" text /> -->
    </template>

    <template #center>
      <!-- <IconField>
        <InputIcon>
          <i class="pi pi-search" />
        </InputIcon>
        <InputText placeholder="Search" />
      </IconField> -->
    </template>

    <template #end>
      <nav>
        <Button
          v-for="menu in menus"
          :key="menu.label"
          :label="menu.label"
          text
          plain
          as="router-link"
          :to="{ name: menu.routerName }"
        />
      </nav>
      <!-- <SplitButton label="Save" :model="items"></SplitButton> -->
      <div>마이페이지</div>
    </template>
  </Toolbar>
</template>

<script setup>
import { ref } from 'vue';

const menus = ref([
  { label: '대시보드', routerName: 'hq:home' },
  {
    label: '발주',
    routerName: 'hq:order-out',
  },
  {
    label: '주문/교환/반품',
    routerName: 'hq:order-in',
  },
  {
    label: '가맹점/거래처',
    routerName: 'hq:partner',
  },
  {
    label: '창고/품목',
    routerName: 'hq:stock',
  },
  { label: '전자결재', routerName: 'hq:approval' },
  { label: '게시판', routerName: 'hq:board' },
  { label: '시스템설정', routerName: 'hq:settings' },
]);
</script>

<style scoped>
.hq-topbar {
  margin-bottom: 10px;
}
</style>
