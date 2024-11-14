<template>
  <div class="modal-body-container">
    <!-- content -->
    <slot></slot>

    <!-- footer -->
    <div v-if="actionButtonLabel" class="btn-area">
      <Button :label="actionButtonLabel" size="small" @click="emit('clickActionButton')" />
    </div>
  </div>
</template>

<script setup>
const { actionButtonLabel } = defineProps({
  actionButtonLabel: {
    type: String,
    required: false,
    default: '',
  },
});

const emit = defineEmits(['clickActionButton']);
</script>

<style scoped>
.modal-body-container {
  .btn-area {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
