const timerAsync = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const wait = async (time: number): Promise<void> => {
  await timerAsync(time);
};
