export const makeSelectOption = (label = '', value = '') => {
  return { label, value };
};

export const makeRadioOption = (label = '', value = '', inputId = '') => ({ label, value, inputId });
