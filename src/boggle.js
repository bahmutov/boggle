var pathsFrom = require('matrix-paths').pathsFrom;
var check = require('check-types');
check.verifyFunction(pathsFrom, 'pathsFrom is not a function');

function boggle(gridOfCharacters) {
  check.verifyArray(gridOfCharacters, 'expected an Array');
  console.assert(gridOfCharacters.each(function (value) {
    return check.isString(value) && check.isLength(value, 1);
  }), 'expected grid of characters');
}

module.exports = {
  boggle: boggle
};