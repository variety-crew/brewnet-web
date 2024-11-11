import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore(
  'user',
  () => {
    const loginId = ref('');
    const username = ref('');
    const accessToken = ref('');
    const userType = ref(''); // hq: 본사, fc: 가맹점, d: 배송기사

    return {
      loginId,
      username,
      accessToken,
      userType,
    };
  },
  { persist: true },
);
