var check = require('check-types');

function verifyGridOfChars(grid) {
  check.verify.array(grid, 'expected an Array');

  console.assert(grid.every(function (row) {
    return row.every(function (value) {
      return check.string(value) && check.length(value, 1);
    });
  }), 'expected grid of characters');
}

function verifyGridOfStrings(grid) {
  check.verify.array(grid, 'expected an Array');

  console.assert(grid.every(function (row) {
    return row.every(function (value) {
      return check.string(value)
    });
  }), 'expected grid of strings');
}

function unary(fn) {
  return function (a) {
    return fn(a);
  };
}

function validWords(words) {
  return words.filter(function (word) {
    return word.length > 2;
  });
}

module.exports = {
  verifyGridOfChars: verifyGridOfChars,
  verifyGridOfStrings: verifyGridOfStrings,
  unary: unary,
  validWords: validWords
};
