export const formatKoEmployeePosition = position => {
  switch (position) {
    case 'STAFF':
      return '사원';

    case 'ASSISTANT_MANAGER':
      return '대리';

    case 'MANAGER':
      return '과장';

    case 'CEO':
      return '대표이사';

    default:
      return '';
  }
};

export const formatKoMemberRole = role => {
  switch (role) {
    case 'ROLE_MASTER':
      return '마스터';

    case 'ROLE_RESPONSIBLE_ADMIN':
      return '책임관리자';

    case 'ROLE_GENERAL_ADMIN':
      return '일반관리자';

    case 'ROLE_FRANCHISE':
      return '가맹점';

    case 'ROLE_DELIVERY':
      return '배송';

    default:
      return '';
  }
};

export const formatKoExchangeReason = reason => {
  switch (reason) {
    case 'DAMAGED':
      return '파손';

    case 'DEFECTIVE':
      return '품질불량';

    case 'OTHER':
      return '기타';

    default:
      return '';
  }
};

export const formatKoExchangeStatus = status => {
  switch (status) {
    case 'REQUESTED':
      return '교환요청';

    case 'CANCELED':
      return '교환취소';

    case 'APPROVED':
      return '교환승인';

    case 'REJECTED':
      return '교환반려';

    case 'PICKING':
      return '수거중';

    case 'PICKED':
      return '수거완료';

    case 'SHIPPING':
      return '배송중';

    case 'SHIPPED':
      return '배송완료';

    case 'COMPLETED':
      return '배송완료';

    default:
      return '';
  }
};
