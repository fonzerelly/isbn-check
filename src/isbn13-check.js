function isbn13Checksum(isbn) {
  const digits = isbn.split('');
  if (digits.length!=12) {
    throw new Error('Your isbn13 does not contain 12 digits to calculate the checksum: ', isbn);
  }
  const nums = digits
    .map( (i) => parseInt(i,10) )
    .reduce((checksum, digit) => checksum + digit, 0)
    // .filter( (i) => i!== 0 )[0] || 0;
  console.log('#######', nums)
  return (10 - (nums % 10)) % 10

  // if (digits.some((digit) => digit === '1')) {
  //   return 9;
  // }
  // return 0;
  // const oddSum = isbn.split('')
  //                    .map((char) => parseInt(char, 10))
  //                    .reduce((checksum, digit) => checksum + digit, 0)

  // return 10-(oddSum%10);
}
module.exports = {
  isbn13Checksum
}