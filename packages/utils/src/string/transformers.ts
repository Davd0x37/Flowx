/**
 * Generate acronyms based on input.
 * For example, if input is "My Own Name" it will return "MON"
 *
 * @param input - The input string or null
 * @param uppercase - Whether to convert the acronym to uppercase
 * @return {string | null} Returns acronym or null if input is empty
 */
function getAcronyms(input: null | string, uppercase = true): null | string {
  if (!input) {
    return null
  }
  const split = input?.trim().split(' ').filter(Boolean) || []
  if (split.length === 0) {
    return null
  }

  return split
    .map((str) => {
      const firstChar = str?.[0]
      if (uppercase && firstChar) {
        return firstChar?.toLocaleUpperCase()
      }

      return firstChar
    })
    .join('')
}

export { getAcronyms }
