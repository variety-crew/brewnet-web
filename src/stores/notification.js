import { defineStore } from 'pinia';
import { ref } from 'vue';

// 모든 회원의 알림을 관리
// 유저별로 최대 20개만 저장
export const useNotificationStore = defineStore(
  'notification',
  () => {
    const notificationBox = ref(new Map()); // memberCode, message 배열을 저장
    const MAX_SIZE = 20;

    const addMessage = (memberCode, message) => {
      const memberNotifications = notificationBox.value.get(memberCode);

      if (memberNotifications) {
        // 이미 있다면 기존 배열에 추가
        if (memberNotifications.length === MAX_SIZE) {
          memberNotifications.pop();
          memberNotifications.unshift(message);
          return;
        }

        memberNotifications.push(message);
      } else {
        // 신규 추가
        notificationBox.value.set(memberCode, [message]);
      }
    };

    return {
      notificationBox,
      addMessage,
    };
  },
  { persist: true },
);
