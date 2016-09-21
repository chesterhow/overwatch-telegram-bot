export const pluralize = (text, value) => {
  return `${text}${(value === 1) ? '' : 's'}`;
};
