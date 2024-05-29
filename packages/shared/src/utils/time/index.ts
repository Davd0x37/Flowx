/**
 * Checks if a previous date is expired based on the specified expiration time
 *
 * @param {Date} previousDate - The previous date to be checked
 * @param {number} expiresIn - The expiration time in seconds
 * @returns {boolean} A boolean value indicating whether the previous date is expired (true) or not (false)
 */
export const isExpired = (previousDate: Date, expiresIn: number): boolean => {
  const now: Date = new Date();
  const prev: Date = previousDate;

  prev.setSeconds(prev.getSeconds() + expiresIn);

  return prev.getTime() - now.getTime() <= 0;
};
