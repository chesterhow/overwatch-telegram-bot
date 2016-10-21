export const pluralize = (text, value) => (
  `${text}${(value === 1) ? '' : 's'}`
);

export const titlecase = (text) => (
  text.charAt(0).toUpperCase() + text.slice(1)
);

export const hashToHypen = (text) => (
  text.split('#').join('-')
);
