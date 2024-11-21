import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore(
  'user',
  () => {
    const loginId = ref('');
    const username = ref('');
    const accessToken = ref('');
    const refreshToken = ref('');
    const userType = ref(''); // hq: 본사, fc: 가맹점, d: 배송기사
    const email = ref('');
    const phone = ref('');
    const position = ref('');
    const signature = ref('');

    const saveAccessToken = token => {
      accessToken.value = token;
    };

    const saveRefreshToken = token => {
      refreshToken.value = token;
    };

    const loginByHeadQuarter = () => {
      loginId.value = 'iamhq';
      username.value = '나는야본사';
      accessToken.value = 'faketoken1';
      userType.value = 'hq';
      email.value = 'email@company.co.kr';
      phone.value = '010-1111-1111';
      position.value = 'MANAGER';
    };
    const loginByFranchise = () => {
      loginId.value = 'iamfc';
      username.value = '나는야가맹점';
      accessToken.value = 'faketoken2';
      userType.value = 'fc';
      email.value = 'email@company.co.kr';
      phone.value = '010-1111-1111';
    };
    const loginByDelivery = () => {
      loginId.value = 'iamdelivery';
      username.value = '나는야배송기사';
      accessToken.value = 'faketoken3';
      userType.value = 'd';
      email.value = 'email@company.co.kr';
      phone.value = '010-1111-1111';
    };

    const logout = () => {
      loginId.value = '';
      username.value = '';
      accessToken.value = '';
      userType.value = '';
      email.value = '';
      phone.value = '';
      position.value = '';
      signature.value = '';
    };

    return {
      loginId,
      username,
      accessToken,
      userType,
      email,
      phone,
      position,
      signature,
      saveAccessToken,
      saveRefreshToken,
      loginByHeadQuarter,
      loginByFranchise,
      loginByDelivery,
      logout,
    };
  },
  { persist: true },
);
