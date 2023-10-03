import { describe, expect, it } from 'vitest';
import { excludeFromArrayByValue } from '../array';

const arrays = {
  strings: ['one', 'two', 'three'],
  numbers: [1, 2, 3, 4],
  objects: [{ obj: 'one' }, { obj: 'two' }, { obj: 'three' }],
};

const excludedArrays = {
  strings: ['two', 'three'],
  numbers: [2, 3, 4],
  objects: [{ obj: 'two' }, { obj: 'three' }],
};

describe('Test array helpers', () => {
  describe('exclude from array by value', () => {
    it('should exclude string', () => {
      const excluded = arrays.strings.filter(excludeFromArrayByValue('one'));

      expect(excluded).toMatchObject(excludedArrays.strings);
    });

    it('should exclude numbers', () => {
      const excluded = arrays.numbers.filter(excludeFromArrayByValue(1));

      expect(excluded).toMatchObject(excludedArrays.numbers);
    });

    it('should exclude object', () => {
      const tempObjReference = arrays.objects[0];
      const excluded = arrays.objects.filter(excludeFromArrayByValue(tempObjReference));

      expect(excluded).toMatchObject(excludedArrays.objects);
    });
  });
});
