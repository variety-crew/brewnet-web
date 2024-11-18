<template>
  <AppFormField :label="label">
    <div class="app-date-range-picker-wrapper">
      <DatePicker
        :model-value="start"
        :max-date="end"
        show-icon
        icon-display="input"
        show-button-bar
        @update:model-value="onChangeStart"
      />
      <i class="pi pi-arrow-right"></i>
      <DatePicker
        :model-value="end"
        :min-date="start"
        show-icon
        icon-display="input"
        show-button-bar
        @update:model-value="onChangeEnd"
      />
    </div>
  </AppFormField>
</template>

<script setup>
import AppFormField from './AppFormField.vue';

const { label } = defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  },
});

const start = defineModel('start', { type: Date });
const end = defineModel('end', { type: Date });

const onChangeStart = newValue => {
  start.value = newValue;
};

const onChangeEnd = newValue => {
  end.value = newValue;
};
</script>

<style scoped>
.app-date-range-picker-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
