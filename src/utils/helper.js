import { PURCHASE_STATUS } from './constant';

// 프라임뷰에 사용될 데이터
export const makeSelectOption = (label = '', value = '') => {
  return { label, value };
};
export const makeRadioOption = (label = '', value = '', inputId = '') => ({ label, value, inputId });
export const makeAutocompleteSuggestion = (code, label) => ({ code, label });

// status에 따른 severity
export const getPurchaseStatusSeverity = purchaseStatus => {
  switch (purchaseStatus) {
    case PURCHASE_STATUS.REQUESTED:
      return 'success';

    case PURCHASE_STATUS.CANCELED:
    case PURCHASE_STATUS.REJECTED:
      return 'danger';

    case PURCHASE_STATUS.APPROVED:
      return 'info';

    default:
      return 'info';
  }
};
