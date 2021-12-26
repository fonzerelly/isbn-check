const {
  isbn10Checksum,
  isbn13Checksum
} = require('./isbn-check')

describe('isbnChecksum', () => {
  describe('isbn10Checksum', () => {
    [
      {input: '0', output: '0'},
      {input: '1', output: '1'},
      {input: '2', output: '2'},
      {input: '3', output: '3'},
      {input: '4', output: '4'},
      {input: '5', output: '5'},
      {input: '6', output: '6'},
      {input: '7', output: '7'},
      {input: '8', output: '8'},
      {input: '9', output: '9'},
    ].forEach(({input, output}) => {
      it(`should weight first ${input} by 1`, () => {
        expect(isbn10Checksum(input + '00000000')).toBe(output)
      })
    });

    [
      {input: '0', output: '0'},
      {input: '1', output: '2'},
      {input: '2', output: '4'},
      {input: '3', output: '6'},
      {input: '4', output: '8'},
      {input: '5', output: 'X'},
      
    ].forEach(({input, output}) => {
      it(`should weight first ${input} by 2`, () => {
        expect(isbn10Checksum('0' +input + '00000000')).toBe(output)
      })
    });

    [
      {input: '0', output: '0'},
      {input: '1', output: '3'},
      {input: '2', output: '6'},
      {input: '3', output: '9'},
    ].forEach(({input, output}) => {
      it(`should weight first ${input} by 3`, () => {
        expect(isbn10Checksum('00' +input + '0000000')).toBe(output)
      })
    });

    [
      {input: '000000000', output: '0'},
      {input: '060000000', output: '1'},
      {input: '004000000', output: '1'},
      {input: '000300000', output: '1'},
      {input: '000030000', output: '4'},
      {input: '000002000', output: '1'},
      {input: '000000200', output: '3'},
      {input: '000000020', output: '5'},
      {input: '000000002', output: '7'},
    ].forEach(({input, output}) => {
      it(`should apply sum of ${input} to mod of 11`, () => {
        expect(isbn10Checksum(input)).toBe(output)
      })
    });

    [
      {input: '140885589', output: '5'},
      {input: '347352625', output: '8'},
      {input: '366256740', output: '7'},
      {input: '043935806', output: 'X'}
    ].forEach(({input, output}) => {
      it(`should find checksum ${output} for ${input}`, () => {
        expect(isbn10Checksum(input)).toBe(output);
      })
    });
  })
  describe('isbn13Checksum', () => {

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
      [{
          genericISBN: '100000000000',
          checksum: 9
        },
        {
          genericISBN: '001000000000',
          checksum: 9
        },
        {
          genericISBN: '000010000000',
          checksum: 9
        },
        {
          genericISBN: '000000100000',
          checksum: 9
        },
        {
          genericISBN: '000000001000',
          checksum: 9
        },
        {
          genericISBN: '000000000010',
          checksum: 9
        },
        {
          genericISBN: '200000000000',
          checksum: 8
        },
        {
          genericISBN: '003000000000',
          checksum: 7
        },
        {
          genericISBN: '000040000000',
          checksum: 6
        },
        {
          genericISBN: '000000500000',
          checksum: 5
        },
        {
          genericISBN: '000000006000',
          checksum: 4
        },
        {
          genericISBN: '000000000070',
          checksum: 3
        },
      ].forEach(({
        genericISBN,
        checksum
      }) => {
        it(`should return subtraction of 10 minus single value of odd digit like in ${genericISBN}`, () => {
          expect(isbn13Checksum(genericISBN)).toBe(checksum);
        })
      });
      [{
          genericISBN: '101000000000',
          checksum: 8
        },
        {
          genericISBN: '000030400000',
          checksum: 3
        },
        {
          genericISBN: '102030000000',
          checksum: 4
        },
        {
          genericISBN: '102030400000',
          checksum: 0
        },
      ].forEach(({
        genericISBN,
        checksum
      }) => {
        it(`should return subtraction of 10 and all values of odd digit like in ${genericISBN}`, () => {
          expect(isbn13Checksum(genericISBN)).toBe(checksum);
        })
      })
      it(`should return modulo 10 of subtraction of 10 and all values of odd digit like in 1020304050`, () => {
        expect(isbn13Checksum('102030405000')).toBe(5)
      })
    })

    describe('evan digits', () => {
      [{
          genericISBN: '010000000000',
          checksum: 7
        },
        {
          genericISBN: '000100000000',
          checksum: 7
        },
        {
          genericISBN: '000001000000',
          checksum: 7
        },
        {
          genericISBN: '000000010000',
          checksum: 7
        },
        {
          genericISBN: '000000000100',
          checksum: 7
        },
        {
          genericISBN: '000000000001',
          checksum: 7
        },
        {
          genericISBN: '020000000000',
          checksum: 4
        },
        {
          genericISBN: '000300000000',
          checksum: 1
        },
        {
          genericISBN: '000004000000',
          checksum: 8
        },
        {
          genericISBN: '000000050000',
          checksum: 5
        },
        {
          genericISBN: '000000000600',
          checksum: 2
        },
        {
          genericISBN: '000000000007',
          checksum: 9
        },
      ].forEach(({
        genericISBN,
        checksum
      }) => {
        it(`should return subtraction of 10 minus three times the value of even digit like in ${genericISBN}`, () => {
          expect(isbn13Checksum(genericISBN)).toBe(checksum);
        })
      });
      [{
          genericISBN: '010200000000',
          checksum: 1
        },
        {
          genericISBN: '010203000000',
          checksum: 2
        },
        {
          genericISBN: '010203040000',
          checksum: 0
        },

      ].forEach(({
        genericISBN,
        checksum
      }) => {
        it(`should return subtraction of 10 minus three times the value of all even digits like in ${genericISBN}`, () => {
          expect(isbn13Checksum(genericISBN)).toBe(checksum);
        })
      });
    });
    [{
        realISBN: '978381582086',
        checksum: 5
      },
      {
        realISBN: '978382731710',
        checksum: 0
      },
      {
        realISBN: '400330101839',
        checksum: 8
      },
    ].forEach(({
      realISBN,
      checksum
    }) => {
      it(`should return checksum ${checksum} for ${realISBN}`, () => {
        expect(isbn13Checksum(realISBN)).toBe(checksum);
      })
    });
  })
})