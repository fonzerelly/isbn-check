const {isbn13Check} = require('./isbn13-check')
describe('isbn13Check', () => {
  [
    {genericISBN: '101010101010', checksum: 6},
    {genericISBN: '202020202020', checksum: 12}
  ].forEach(({genericISBN, checksum}) => {
    it(`should add all odd digits as is for ${genericISBN} to ${checksum}`, () => {
      expect(isbn13Check(genericISBN)).toEqual(checksum)
    })
  })
})