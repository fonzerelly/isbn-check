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

  [
    { genericISBN: '100000000000', checksum: 9 },
    // { genericISBN: '001000000000', checksum: 9 },
    // { genericISBN: '000010000000', checksum: 9 },
    // { genericISBN: '000000100000', checksum: 9 },
    // { genericISBN: '000000001000', checksum: 9 },
    // { genericISBN: '000000000010', checksum: 9 },
    // { genericISBN: '200000000000', checksum: 9 },
    // { genericISBN: '002000000000', checksum: 9 },
    // { genericISBN: '000020000000', checksum: 9 },
    // { genericISBN: '000000200000', checksum: 9 },
    // { genericISBN: '000000002000', checksum: 9 },
    // { genericISBN: '000000000020', checksum: 9 },
  ].forEach(({genericISBN, checksum}) => {
    it(`should return subtraction of 10 minus single value of odd digit like in ${genericISBN}`, () => {
      expect(isbn13Checksum(genericISBN)).toBe(checksum);
    })
  })

  // it('should be 10 less the sum of the odd digits', () => {
  //   expect(isbn13Checksum('100000000000'))
  // })
})