const isArrayString = (input: string) =>
  input[0] === '[' && input[input.length - 1] === ']'

/**
 * Retrieves the value from a nested object based on the given selector string.
 * @param input - The object to retrieve the value from.
 * @param selector - The string representing the path to the desired value.
 * @returns The value found at the specified path, or null if not found.
 */
const deepGet = (
  input: Record<PropertyKey, unknown>,
  selector: string,
): unknown => {
  const parsed = selector.split('.')
  const [el, ...rest] = parsed
  if (typeof el !== 'string') {
    return null
  }

  const isArrayElement = isArrayString(el)
    ? Number.parseInt(el.slice(1, -1))
    : el

  if (parsed.length === 0) {
    return null
  }
  if (!(isArrayElement in input)) {
    return null
  }
  if (parsed.length === 1) {
    return input[isArrayElement]
  }

  const nested = input[isArrayElement] as Record<PropertyKey, unknown>
  const joined = rest.join('.')

  return deepGet(nested, joined)
}

export { deepGet }
