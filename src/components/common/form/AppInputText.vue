<template>
  <AppFormField :label="label" :full-width="fullWidth">
    <IconField v-if="icon">
      <InputIcon :class="icon" />
      <InputText
        :value="modelValue"
        size="small"
        :name="name"
        :placeholder="placeholder"
        :fluid="fullWidth"
        :readonly="readOnly"
        @input="onChangeInput"
        @focus="onFocusInput"
      />
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

const { label, modelValue, name, placeholder, fullWidth, readOnly, icon } = defineProps({
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
});

const emit = defineEmits(['update:modelValue', 'onFocus']);

function onChangeInput(event) {
  emit('update:modelValue', event.target.value);
}

function onFocusInput() {
  emit('onFocus');
}
</script>

<style scoped></style>
