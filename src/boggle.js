var check = require('check-types');

var pathsFrom = require('matrix-paths').pathsFrom;
check.verifyFunction(pathsFrom, 'pathsFrom is not a function');

var dictionary = require('prefix-dictionary');
check.verifyFunction(dictionary.isWord, 'missing isWord');
check.verifyFunction(dictionary.isWordPrefix, 'missing isWordPrefix');

function verifyGridOfChars(grid) {
  check.verifyArray(grid, 'expected an Array');

  console.assert(grid.every(function (row) {
    return row.every(function (value) {
      console.log('checking', value);
      return check.isString(value) && check.isLength(value, 1);
    });
  }), 'expected grid of characters');
}

function boggle(gridOfCharacters) {
  verifyGridOfChars(gridOfCharacters);
  console.assert(gridOfCharacters.length > 0, 'empty array');

  var words = [];
  pathsFrom(gridOfCharacters, 0, 0, {
    simple: true,
    stepWhile: function (str, x, y, grid) {
      console.log('checking "' + str + '"');
      if (dictionary.isWord(str)) {
        console.log('"' + str + '" is a word');
        words.push(str);
        return true;
      }
    }
  });

  console.log('from 0,0, found words');
  console.log(words);
}

module.exports = {
  boggle: boggle
};