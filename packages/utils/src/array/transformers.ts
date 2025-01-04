/**
 * Returns a function that takes an array item and returns true if it should be excluded, false otherwise.
 *
 * @param item - A single value or an array of values to exclude.
 * @returns A function that takes an array item and returns true if it should be excluded, false otherwise.
 */
function excludeElement<T>(item: T | T[]) {
  return (arrayItem: T) => {
    if (Array.isArray(item)) {
      return !item.includes(arrayItem)
    } else {
      return item !== arrayItem
    }
  }
}

export { excludeElement }
