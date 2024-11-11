import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore(
  'user',
  () => {
    const loginId = ref('');
    const username = ref('');
    const accessToken = ref('');
    const isHeadquarters = ref(false); // 본사 직원 계정인지?

    return {
      loginId,
      username,
      accessToken,
      isHeadquarters,
    };
  },
  { persist: true },
);
