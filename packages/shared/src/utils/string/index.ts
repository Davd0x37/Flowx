import type { ResultWrapper } from '../../types/wrappers'

/**
 * Generate acronyms based on input.
 * For example, if input is "My Own Name" it will return "MON"
 *
 * @param {string} input
 * @param {boolean} [uppercase=true]
 * @return Returns data with acronym or false with error string
 */
export function getAcronyms(input: string, uppercase = true): ResultWrapper<string, string> {
  const split = input.trim().split(' ').filter(Boolean)
  if (split.length === 0) return { data: '', error: 'There are no characters in the array' }

  const acronyms = split
    .map((str) => {
      const val = str?.[0]
      if (uppercase && val) return val?.toLocaleUpperCase()
      return val
    })
    .join('')

  return {
    data: acronyms,
  }
}
