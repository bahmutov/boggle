var check = require('check-types');

function verifyGridOfChars(grid) {
  check.verifyArray(grid, 'expected an Array');

  console.assert(grid.every(function (row) {
    return row.every(function (value) {
      return check.isString(value) && check.isLength(value, 1);
    });
  }), 'expected grid of characters');
}

function unary(fn) {
  return function (a) {
    return fn(a);
  };
}

module.exports = {
  verifyGridOfChars: verifyGridOfChars,
  unary: unary
};