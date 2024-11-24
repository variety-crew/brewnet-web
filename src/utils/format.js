import {
  APPROVAL_KIND,
  APPROVAL_STATUS,
  DELIVERY_KIND,
  EXCHANGE_STATUS,
  ORDER_STATUS,
  POSITION,
  PURCHASE_STATUS,
  RETURN_STATUS,
  ROLE,
  DRAFTER_APPROVED,
  APPROVAL,
  SEARCH_CRITERIA,
} from './constant';

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

    case EXCHANGE_STATUS.PENDING:
      return '진행중';

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

export const formatKoApprovalStatus = status => {
  switch (status) {
    case APPROVAL_STATUS.UNCONFIRMED:
      return '진행중';

    case APPROVAL_STATUS.APPROVED:
      return '승인';

    case APPROVAL_STATUS.REJECTED:
      return '반려';

    default:
      return '';
  }
};

export const formatKoDrafterApproved = drafterApproved => {
  switch (drafterApproved) {
    case DRAFTER_APPROVED.APPROVE:
      return '승인';

    case DRAFTER_APPROVED.REJECT:
      return '반려';

    case DRAFTER_APPROVED.NONE:
      return '미정';

    default:
      return '';
  }
};

export const formatKoApproval = approval => {
  switch (approval) {
    case APPROVAL.APPROVED:
      return '결재승인';

    case APPROVAL.CANCELED:
      return '결재취소';

    case APPROVAL.UNCONFIRMED:
      return '미확인'; // 결재 확인되지 않음

    case APPROVAL.REJECTED:
      return '결재반려';

    default:
      return '';
  }
};

export const formatKoOrderStatus = status => {
  switch (status) {
    case ORDER_STATUS.REQUESTED:
      return '주문요청';

    case ORDER_STATUS.PENDING:
      return '진행중';

    case ORDER_STATUS.CANCELED:
      return '주문취소';

    case ORDER_STATUS.APPROVED:
      return '주문승인';

    case ORDER_STATUS.REJECTED:
      return '주문반려';

    case ORDER_STATUS.SHIPPING:
      return '배송중';

    case ORDER_STATUS.SHIPPED:
      return '배송완료';

    default:
      return '';
  }
};

export const formatKoSearchCriteria = criteria => {
  switch (criteria) {
    case SEARCH_CRITERIA.ITEM_UNIQUE_CODE:
      return '품목코드';

    case SEARCH_CRITERIA.ITEM_NAME:
      return '품목명';

    case SEARCH_CRITERIA.CORRESPONDENT_NAME:
      return '거래처명';

    case SEARCH_CRITERIA.STORAGE_NAME:
      return '창고명';

    default:
      return '';
  }
};

export const formatKoReturnStatus = status => {
  switch (status) {
    case RETURN_STATUS.REQUESTED:
      return '반품요청';

    case RETURN_STATUS.PENDING:
      return '반품처리중';

    case RETURN_STATUS.CANCELED:
      return '반품취소';

    case RETURN_STATUS.APPROVED:
      return '반품승인';

    case RETURN_STATUS.REJECTED:
      return '반품반려';

    case RETURN_STATUS.PICKING:
      return '회수중';

    case RETURN_STATUS.PICKED:
      return '회수완료';

    case RETURN_STATUS.COMPLETED:
      return '반품완료';

    default:
      return '';
  }
};

export const formatKoDeliveryStatus = orderStatus => {
  switch (orderStatus) {
    case ORDER_STATUS.APPROVED:
      return '배송전';

    case ORDER_STATUS.SHIPPING:
      return '배송중';

    case ORDER_STATUS.SHIPPED:
      return '배송완료';

    default:
      return '';
  }
};

export const formatKoDeliveryKind = kind => {
  switch (kind) {
    case DELIVERY_KIND.ORDER:
      return '주문';

    case DELIVERY_KIND.EXCHANGE:
      return '교환';

    case DELIVERY_KIND.RETURN:
      return '반품';

    default:
      return '';
  }
};
