export const times = <T>(count: number, defaultValue?: T): (T | undefined)[] => {
  return [...new Array(count)].map(() => defaultValue);
};
