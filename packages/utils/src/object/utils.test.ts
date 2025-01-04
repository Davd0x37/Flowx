import { deepGet } from './utils'

const TEST_OBJ = {
  deep: {
    nested: {
      value: {
        val: true,
      },
    },
  },
  name: 'test',
  nested: {
    value: 'nested value',
  },
  nestedArr: {
    values: [
      {
        name: 'first',
      },
      {
        name: 'second',
      },
    ],
  },
  nestedNum: {
    value: 15,
  },

  num: 2,
}

describe('test object helpers', () => {
  describe('test getter', () => {
    it('should get 1-level value (string)', () => {
      const selector = 'name'
      const val = deepGet(TEST_OBJ, selector)

      expect(val).toEqual(TEST_OBJ.name)
    })

    it('should get 1-level value (number)', () => {
      const selector = 'num'
      const val = deepGet(TEST_OBJ, selector)

      expect(val).toEqual(TEST_OBJ.num)
    })

    it('should get 2-level value (string)', () => {
      const selector = 'nested.value'
      const val = deepGet(TEST_OBJ, selector)

      expect(val).toEqual(TEST_OBJ.nested.value)
    })

    it('should get 2-level value (number)', () => {
      const selector = 'nestedNum.value'
      const val = deepGet(TEST_OBJ, selector)

      expect(val).toEqual(TEST_OBJ.nestedNum.value)
    })

    it('should get deep nested value (boolean)', () => {
      const selector = 'deep.nested.value.val'
      const val = deepGet(TEST_OBJ, selector)

      expect(val).toEqual(TEST_OBJ.deep.nested.value.val)
    })

    it('should get deep nested array - value (string)', () => {
      const selector = 'nestedArr.values.[0].name'
      const val = deepGet(TEST_OBJ, selector)

      expect(val).toEqual(TEST_OBJ.nestedArr.values?.[0]?.name)
    })
  })
})
