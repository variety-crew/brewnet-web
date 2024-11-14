export const formatKoEmployeePosition = employee => {
  switch (employee.position) {
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

export const formatKoMemberRole = member => {
  switch (member.role) {
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
