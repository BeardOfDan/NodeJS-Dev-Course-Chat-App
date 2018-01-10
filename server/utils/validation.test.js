const expect = require('expect');

const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    const testValues = [123, true, false, 0, -0, -123, 1.23, -1.23, { 'string': 'string' }, {}, () => { return 'string'; }, () => { }, ['string'], [], isRealString, this, global];

    for (let i = 0; i < testValues.length; i++) {
      expect(isRealString(testValues[i])).toBe(false);
    }
  });

  it('should reject strings with only spaces', () => {
    const testValues = ['', ' ', '  ', '   ', '\n', '\r'];

    for (let i = 0; i < testValues.length; i++) {
      expect(isRealString(testValues[i])).toBe(false);
    }
  });

  it('should accept strings with non-space characters', () => {
    const testValues = ['a', ' a', 'a ', ' a ', isRealString.toString(), '\na', 'a\r', '\na\r', 'apple pie'];

    for (let i = 0; i < testValues.length; i++) {
      expect(isRealString(testValues[i])).toBe(true);
    }
  });
});
