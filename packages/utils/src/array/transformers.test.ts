import { excludeElement } from './transformers'

const arrays = {
  numbers: [1, 2, 3, 4],
  objects: [{ obj: 'one' }, { obj: 'two' }, { obj: 'three' }],
  strings: ['one', 'two', 'three'],
}

const excludedArrays = {
  numbers: [2, 3, 4],
  objects: [{ obj: 'two' }, { obj: 'three' }],
  strings: ['two', 'three'],
}

describe('test array helpers', () => {
  describe('exclude from array by value', () => {
    it('should exclude string', () => {
      const excluded = arrays.strings.filter(excludeElement('one'))

      expect(excluded).toMatchObject(excludedArrays.strings)
    })

    it('should exclude numbers', () => {
      const excluded = arrays.numbers.filter(excludeElement(1))

      expect(excluded).toMatchObject(excludedArrays.numbers)
    })

    it('should exclude object', () => {
      const tempObjReference = arrays.objects[0]
      const excluded = arrays.objects.filter(excludeElement(tempObjReference))

      expect(excluded).toMatchObject(excludedArrays.objects)
    })
  })
})
