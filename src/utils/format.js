import { APPROVAL_KIND, EXCHANGE_STATUS, POSITION, PURCHASE_STATUS, ROLE } from './constant';

export const formatKoEmployeePosition = position => {
  switch (position) {
    case POSITION.STAFF:
      return '사원';

    case POSITION.ASSISTANT_MANAGER:
      return '대리';

    case POSITION.MANAGER:
      return '과장';

    case POSITION.CEO:
      return '대표이사';

    default:
      return '';
  }
};

export const formatKoMemberRole = role => {
  switch (role) {
    case ROLE.MASTER:
      return '마스터';

    case ROLE.RESPONSIBLE_ADMIN:
      return '책임관리자';

    case ROLE.GENERAL_ADMIN:
      return '일반관리자';

    case ROLE.FRANCHISE:
      return '가맹점';

    case ROLE.DELIVERY:
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
    case EXCHANGE_STATUS.REQUESTED:
      return '교환요청';

    case EXCHANGE_STATUS.CANCELED:
      return '교환취소';

    case EXCHANGE_STATUS.APPROVED:
      return '교환승인';

    case EXCHANGE_STATUS.REJECTED:
      return '교환반려';

    case EXCHANGE_STATUS.PICKING:
      return '수거중';

    case EXCHANGE_STATUS.PICKED:
      return '수거완료';

    case EXCHANGE_STATUS.SHIPPING:
      return '배송중';

    case EXCHANGE_STATUS.SHIPPED:
      return '배송완료';

    case EXCHANGE_STATUS.COMPLETED:
      return '배송완료';

    default:
      return '';
  }
};

export const formatKoPurchaseStatus = status => {
  switch (status) {
    case PURCHASE_STATUS.REQUESTED:
      return '결재요청';

    case PURCHASE_STATUS.CANCELED:
      return '결재요청취소';

    case PURCHASE_STATUS.APPROVED:
      return '발주승인';

    case PURCHASE_STATUS.REJECTED:
      return '발주반려';

    default:
      return '';
  }
};

export const formatKoApprovalKind = kind => {
  switch (kind) {
    case APPROVAL_KIND.ORDER:
      return '주문';

    case APPROVAL_KIND.PURCHASE:
      return '발주';

    case APPROVAL_KIND.EXCHANGE:
      return '교환';

    case APPROVAL_KIND.RETURN:
      return '반품';

    default:
      return '';
  }
};
