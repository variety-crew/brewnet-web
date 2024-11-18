<template>
  <AppFormField :label="label" :full-width="fullWidth">
    <IconField v-if="icon">
      <InputIcon v-if="iconPosition === 'start'" :class="icon" />
      <InputText
        :value="modelValue"
        size="small"
        :name="name"
        :placeholder="placeholder"
        :fluid="fullWidth"
        :readonly="readOnly"
        @input="onChangeInput"
        @click="onClickInput"
      />
      <InputIcon v-if="iconPosition === 'end'" :class="icon" />
    </IconField>
    <template v-else>
      <InputText
        :value="modelValue"
        size="small"
        :name="name"
        :placeholder="placeholder"
        :fluid="fullWidth"
        :readonly="readOnly"
        @input="onChangeInput"
      />
    </template>
  </AppFormField>
</template>

<script setup>
import AppFormField from './AppFormField.vue';

const { label, modelValue, name, placeholder, fullWidth, readOnly, icon, iconPosition } = defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  },
  modelValue: {
    type: String,
    required: true,
  },
  name: {
    type: [String, null],
    required: false,
    default: null,
  },
  placeholder: {
    type: String,
    required: false,
    default: '',
  },
  fullWidth: {
    type: Boolean,
    required: false,
    default: false,
  },
  readOnly: {
    type: Boolean,
    required: false,
    default: false,
  },
  icon: {
    type: [String, null],
    required: false,
    default: null,
  },
  iconPosition: {
    type: String, // start, end
    required: false,
    default: 'start',
  },
});

const emit = defineEmits(['update:modelValue', 'onClick']);

function onChangeInput(event) {
  emit('update:modelValue', event.target.value);
}

function onClickInput() {
  emit('onClick');
}
</script>

<style scoped></style>
