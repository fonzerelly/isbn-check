function isbn13Checksum(isbn) {
  const digits = isbn.split('');
  if (digits.length!=12) {
    throw new Error('Your isbn13 does not contain 12 digits to calculate the checksum: ', isbn);
  }
  const nums = digits
    .map( (i) => parseInt(i,10) )
    .map( (i, index ) => index % 2 === 0 ? i : i * 3)
    .reduce((checksum, digit) => checksum + digit, 0)
  return (10 - (nums % 10)) % 10;
}
module.exports = {
  isbn13Checksum
}