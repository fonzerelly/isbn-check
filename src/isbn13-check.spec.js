const {isbn13Checksum} = require('./isbn13-check')
describe('isbn13Checksum', () => {
  // [
  //   {genericISBN: '100000000000', checksum: 9},
  //   {genericISBN: '001000000000', checksum: 9},
  //   {genericISBN: '101010101010', checksum: 4},
  //   {genericISBN: '202020202020', checksum: 8}
  // ].forEach(({genericISBN, checksum}) => {
  //   it(`should add all odd digits as is for ${genericISBN} to ${checksum}`, () => {
  //     expect(isbn13Check(genericISBN)).toEqual(checksum)
  //   })
  // })

  it('should throw on isbn less than 12 digits', () => {
    expect(() => isbn13Checksum('00')).toThrow();
  })

  it('should throw on isbn more than 12 digits', () => {
    expect(() => isbn13Checksum('0000000000000')).toThrow();
  })

  it('should return 0 for a whole zero isbn', () => {
    expect(isbn13Checksum('000000000000')).toBe(0);
  });

  describe('odd digits', () => {
    [
      { genericISBN: '100000000000', checksum: 9 },
      { genericISBN: '001000000000', checksum: 9 },
      { genericISBN: '000010000000', checksum: 9 },
      { genericISBN: '000000100000', checksum: 9 },
      { genericISBN: '000000001000', checksum: 9 },
      { genericISBN: '000000000010', checksum: 9 },
      { genericISBN: '200000000000', checksum: 8 },
      { genericISBN: '003000000000', checksum: 7 },
      { genericISBN: '000040000000', checksum: 6 },
      { genericISBN: '000000500000', checksum: 5 },
      { genericISBN: '000000006000', checksum: 4 },
      { genericISBN: '000000000070', checksum: 3 },
    ].forEach(({genericISBN, checksum}) => {
      it(`should return subtraction of 10 minus single value of odd digit like in ${genericISBN}`, () => {
        expect(isbn13Checksum(genericISBN)).toBe(checksum);
      })
    });
    [
      { genericISBN: '101000000000', checksum: 8 },
      { genericISBN: '000030400000', checksum: 3 },
      { genericISBN: '102030000000', checksum: 4 },
      { genericISBN: '102030400000', checksum: 0 },
    ].forEach(({genericISBN, checksum}) => {
      it(`should return subtraction of 10 and all values of odd digit like in ${genericISBN}`, () => {
        expect(isbn13Checksum(genericISBN)).toBe(checksum);
      })
    })
    it(`should return modulo 10 of subtraction of 10 and all values of odd digit like in 1020304050`, () => {
      expect(isbn13Checksum('102030405000')).toBe(5)
    })
  })

  // it('should be 10 less the sum of the odd digits', () => {
  //   expect(isbn13Checksum('100000000000'))
  // })
})