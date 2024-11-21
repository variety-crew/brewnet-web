import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore(
  'user',
  () => {
    const loginId = ref('');
    const username = ref('');

    const accessToken = ref('');
    const refreshToken = ref('');
    const tempAccessToken = ref('');
    const tempRefreshToken = ref('');

    const userType = ref(''); // hq: 본사, fc: 가맹점, d: 배송기사

    const email = ref('');
    const phone = ref('');
    const position = ref('');
    const signature = ref('');

    const saveTempAccessToken = token => {
      tempAccessToken.value = token;
    };

    const saveTempRefreshToken = token => {
      tempRefreshToken.value = token;
    };

    const saveTokenTempToReal = () => {
      accessToken.value = tempAccessToken.value;
      refreshToken.value = tempRefreshToken.value;
    };

    const setUserType = type => {
      userType.value = type;
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
      tempAccessToken,
      refreshToken,
      tempRefreshToken,
      userType,
      email,
      phone,
      position,
      signature,
      saveTempAccessToken,
      saveTempRefreshToken,
      saveTokenTempToReal,
      setUserType,
      logout,
    };
  },
  { persist: true },
);
