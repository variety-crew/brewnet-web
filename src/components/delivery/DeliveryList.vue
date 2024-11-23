<template>
  <ul class="delivery-list-container">
    <DeliveryListItem v-for="deliveryItem in deliveryItems" :key="deliveryItem.code" :delivery-item="deliveryItem" />
  </ul>
</template>

<script setup>
import DeliveryListItem from './DeliveryListItem.vue';

const { deliveryItems } = defineProps({
  deliveryItems: {
    type: Array,
    required: true,
  },
  /**
   * deliveryItems: [{
   *   deliveryKind: string,
   *   code: number,
   *   deliveryFranchiseName: string,
   *   deliveryStatus: string,
   *   contact: string
   * }]
   */
});
</script>

<style scoped>
.delivery-list-container {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
