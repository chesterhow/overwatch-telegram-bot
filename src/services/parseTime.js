const appendZero = (number) => (`0${number}`).slice(-2);

export const hoursToMinutes = (hours) => {
  if (hours) {
    const time = (hours * 60);
    return Math.floor(time);
  }

  return 0;
};

export const hoursToMMSS = (hours) => {
  if (hours) {
    const time = (hours * 60);
    const minutes = appendZero(hoursToMinutes(hours));
    const seconds = appendZero(Math.floor((time % 1) * 60));

    return `${minutes}:${seconds}`;
  }

  return 0;
};
