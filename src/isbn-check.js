function isbn10Checksum(isbn) {
  const sum = isbn
    .split('')
    .map((char) => parseInt(char, 10))
    .map((digit, index) => digit * (index + 1))
    .reduce((init, weightedIndex) => {return init + weightedIndex}, 0) 
    % 11
  return (sum === 10) ? 'X' : String(sum)
}

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
  isbn10Checksum,
  isbn13Checksum
}