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
