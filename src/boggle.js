var check = require('check-types');
var utils = require('./utils');


var pathsFrom = require('matrix-paths').pathsFrom;
check.verifyFunction(pathsFrom, 'pathsFrom is not a function');

var dictionary = require('prefix-dictionary');
check.verifyFunction(dictionary.isWord, 'missing isWord');
check.verifyFunction(dictionary.isWordPrefix, 'missing isWordPrefix');

function report(words) {
  check.verifyArray(words, 'expected array of words');
  words.sort();
  words.forEach(utils.unary(console.log));
  var n = words.reduce(function (sum, word) {
    return sum + word.length;
  }, 0);
  console.log(words.length + ' words');
  console.log(n + ' letters');
}

function boggleString(letters) {
  letters = letters.toLowerCase();
  var grid = [
    letters.substr(0, 4).split(''),
    letters.substr(4, 4).split(''),
    letters.substr(8, 4).split(''),
    letters.substr(12, 4).split('')
  ];
  return boggleGrid(grid);
}

function validWords(words) {
  return words.filter(function (word) {
    return word.length > 2;
  });
}

function boggleGrid(gridOfCharacters) {
  utils.verifyGridOfChars(gridOfCharacters);
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
      if (dictionary.isWord(str)) {
        uniqueWords[str] = true;
        return true;
      }
    }
  });

  words = Object.keys(uniqueWords);
  words = validWords(words);
  report(words);
  return words;
}

function boggle(str) {
  if (check.isString(str)) {
    str = str.replace(/\s/g, '');
    if (str.length === 16) {
      return boggleString(str);
    }
  }
  if (check.isArray(str) && (str.length === 4)) {
    return boggleGrid(str);
  }
  throw new Error('Invalid boggle input ' + JSON.stringify(str));
}

module.exports = {
  boggle: boggle
};