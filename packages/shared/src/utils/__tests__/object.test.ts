import { describe, expect, it } from 'vitest';
import { Obj } from '../object';

const TEST_OBJ = {
  name: 'test',
  num: 2,
  nested: {
    value: 'nested value',
  },
  nestedNum: {
    value: 15,
  },
  deep: {
    nested: {
      value: {
        val: true,
      },
    },
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
};

describe('Test object helpers', () => {
  describe('test getter', () => {
    it('should get 1-level value (string)', () => {
      const selector = 'name';
      const val = Obj.get(TEST_OBJ, selector);

      expect(val).toEqual(TEST_OBJ.name);
    });

    it('should get 1-level value (number)', () => {
      const selector = 'num';
      const val = Obj.get(TEST_OBJ, selector);

      expect(val).toEqual(TEST_OBJ.num);
    });

    it('should get 2-level value (string)', () => {
      const selector = 'nested.value';
      const val = Obj.get(TEST_OBJ, selector);

      expect(val).toEqual(TEST_OBJ.nested.value);
    });

    it('should get 2-level value (number)', () => {
      const selector = 'nestedNum.value';
      const val = Obj.get(TEST_OBJ, selector);

      expect(val).toEqual(TEST_OBJ.nestedNum.value);
    });

    it('should get deep nested value (boolean)', () => {
      const selector = 'deep.nested.value.val';
      const val = Obj.get(TEST_OBJ, selector);

      expect(val).toEqual(TEST_OBJ.deep.nested.value.val);
    });

    it('should get deep nested array - value (string)', () => {
      const selector = 'nestedArr.values.[0].name';
      const val = Obj.get(TEST_OBJ, selector);

      expect(val).toEqual(TEST_OBJ.nestedArr.values[0].name);
    });
  });
});
