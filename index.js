var boggle = require('./src/boggle').boggle;

// top level input checks, but not too strict
if (process.argv.length !== 3) {
  console.error('Expected <boggle> <16 letters>');
  process.exit(-1);
}

var letters = '' + process.argv[2];
if (letters.length !== 16) {
  console.error('Expected string with 16 characters');
  console.error(letters);
  console.error(letters.length);
  process.exit(-1);
}

console.log('boggle from');
console.log(letters.substr(0, 4));
console.log(letters.substr(4, 4));
console.log(letters.substr(8, 4));
console.log(letters.substr(12, 4));

var grid = [
letters.substr(0, 4).split(''),
letters.substr(4, 4).split(''),
letters.substr(8, 4).split(''),
letters.substr(12, 4).split('')
];
// console.dir(grid);
boggle(grid);
