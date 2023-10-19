export const getRandomNumber = (max: number, min = 0, includeMax = false) => {
  return Math.floor(Math.random() * max + (includeMax ? 1 : 0)) + min;
};
