const isArr = (input: string) => input[0] === '[' && input[input.length - 1] === ']'

export const Obj = {
  get: (input: Record<PropertyKey, unknown>, selector: string): unknown => {
    const parsed = selector.split('.')
    const [el, ...rest] = parsed
    if (typeof el !== 'string') return null

    const isArrElem = isArr(el) ? Number.parseInt(el.slice(1, -1)) : el

    if (parsed.length === 0) return null
    if (!(isArrElem in input)) return null
    if (parsed.length === 1) return input[isArrElem]

    const nested = input[isArrElem] as Record<PropertyKey, unknown>
    const joined = rest.join('.')

    return Obj.get(nested, joined)
  },
}
