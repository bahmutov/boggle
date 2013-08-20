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
      return check.isString(value) && check.isLength(value, 1);
    });
  }), 'expected grid of characters');
}

function unary(fn) {
  return function (a) {
    return fn(a);
  };
}

function report(words) {
  check.verifyArray(words, 'expected array of words');
  words.sort();
  words.forEach(unary(console.log));
  var n = words.reduce(function (sum, word) {
    return sum + word.length;
  }, 0);
  console.log(words.length + ' words');
  console.log(n + ' letters');
}

function boggle(gridOfCharacters) {
  verifyGridOfChars(gridOfCharacters);
  console.assert(gridOfCharacters.length > 0, 'empty array');

  lowerCased = gridOfCharacters.map(function (row) {
    return row.map(function (str) {
      return str.toLowerCase();
    });
  });

  var uniqueWords = {};
  pathsFrom(lowerCased, 0, 0, {
    simple: true,
    stepWhile: function (str, x, y, grid) {
      // console.log('checking "' + str + '"');
      if (dictionary.isWord(str)) {
        // console.log('"' + str + '" is a word');
        uniqueWords[str] = true;
        return true;
      }
    }
  });

  words = Object.keys(uniqueWords);
  report(words);
}

module.exports = {
  boggle: boggle
};