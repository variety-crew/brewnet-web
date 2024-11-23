<template>
  <div class="app-radio-list-container">
    <div v-for="option in options" :key="option.id" class="radio-item">
      <RadioButton
        :value="option.value"
        :input-id="option.inputId"
        :model-value="modelValue"
        :name="name"
        size="small"
        @change="onChange"
      />
      <AppLabel :label-for="option.inputId" :label="option.label" />
    </div>
  </div>
</template>

<script setup>
import AppLabel from '../AppLabel.vue';

const { name, options, modelValue } = defineProps({
  name: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  /**
   * options: [{
   *   value: string,
   *   label: string,
   *   inputId: string,
   * }]
   */
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const onChange = event => {
  emit('update:modelValue', event.target.value);
};
</script>

<style scoped>
.app-radio-list-container {
  display: flex;
  align-items: center;
  gap: 10px;

  .radio-item {
    display: flex;
    align-items: center;
    gap: 5px;
  }
}
</style>
