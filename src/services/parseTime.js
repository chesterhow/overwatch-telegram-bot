const appendZero = (number) => {
  return ('0' + number).slice(-2);
};

export const hoursToMinutes = (hours) => {
  const time = (hours * 60);
  return Math.floor(time);
};

export const hoursToMMSS = (hours) => {
  const time = (hours * 60);
  const minutes = appendZero(hoursToMinutes(hours));
  const seconds = appendZero(Math.floor((time % 1) * 60));

  return `${minutes}:${seconds}`;
};
