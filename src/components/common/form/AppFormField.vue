<template>
  <div ref="element" class="app-input-container" :class="{ width100, flexGrow1 }">
    <label v-if="label">{{ label }}</label>
    <slot></slot>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const { label, fullWidth } = defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  },
  fullWidth: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const element = ref(null);
const width100 = ref(false);
const flexGrow1 = ref(false);

onMounted(() => {
  // fullWidth가 true인 경우 처리
  if (!fullWidth) return;

  const parentElement = element.value?.parentElement;
  if (!parentElement) return;

  // 부모의 display가 flex이면 flex grow, 아니면 width로 처리
  const computedStyle = getComputedStyle(parentElement);
  const parentDisplay = computedStyle.display;
  if (parentDisplay === 'flex') {
    flexGrow1.value = true;
    width100.value = false;
  } else {
    flexGrow1.value = false;
    width100.value = true;
  }
});
</script>

<style scoped>
.app-input-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;

  label {
    font-size: 14px;
    color: var(--p-surface-600);
  }

  &.flexGrow1 {
    flex-grow: 1;
  }

  &.width100 {
    width: 100%;
  }
}
</style>
