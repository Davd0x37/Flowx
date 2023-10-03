export const excludeFromArrayByValue = <T>(item: T | T[]) => {
  return (arrayItem: T) => (Array.isArray(item) ? !item.includes(arrayItem) : item !== arrayItem);
};
