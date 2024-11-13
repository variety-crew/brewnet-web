import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore(
  'user',
  () => {
    const loginId = ref('');
    const username = ref('');
    const accessToken = ref('');
    const userType = ref(''); // hq: 본사, fc: 가맹점, d: 배송기사

    const loginByHeadQuarter = () => {
      loginId.value = 'iamhq';
      username.value = '나는야본사직원';
      accessToken.value = 'faketoken1';
      userType.value = 'hq';
    };
    const loginByFranchisee = () => {
      loginId.value = 'iamfc';
      username.value = '나는야가맹점직원';
      accessToken.value = 'faketoken2';
      userType.value = 'fc';
    };
    const loginByDelivery = () => {
      loginId.value = 'iamdelivery';
      username.value = '나는야배송기사';
      accessToken.value = 'faketoken3';
      userType.value = 'd';
    };

    const logout = () => {
      loginId.value = '';
      username.value = '';
      accessToken.value = '';
      userType.value = '';
    };

    return {
      loginId,
      username,
      accessToken,
      userType,
      loginByHeadQuarter,
      loginByFranchisee,
      loginByDelivery,
      logout,
    };
  },
  { persist: true },
);
