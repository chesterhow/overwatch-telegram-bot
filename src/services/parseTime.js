const appendZero = (number) => {
  return ('0' + number).slice(-2);
}

export const hoursToMinutes = (hours) => {
  const time = (hours * 60);
  const minutes = appendZero(Math.floor(time));
  const seconds = appendZero(Math.floor((time % 1) * 60));

  return `${minutes}:${seconds}`;
}
