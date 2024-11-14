import { ref } from 'vue';

export function useInput(initialValue = '') {
  const value = ref(initialValue);

  function onChange(event) {
    value.value = event.target.value;
  }

  return {
    value,
    onChange,
  };
}
