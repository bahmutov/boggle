var check = require('check-types');
var utils = require('./utils');

var paths = require('matrix-paths').paths;
check.verifyFunction(paths, 'paths is not a function');

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

function boggleGrid(gridOfCharacters) {
  utils.verifyGridOfChars(gridOfCharacters);
  console.assert(gridOfCharacters.length > 0, 'empty array');

  var dictionary = require('prefix-dictionary');
  check.verifyFunction(dictionary.isWord, 'missing isWord');
  check.verifyFunction(dictionary.isWordPrefix, 'missing isWordPrefix');

  lowerCased = gridOfCharacters.map(function (row) {
    return row.map(function (str) {
      return str.toLowerCase();
    });
  });

  var uniqueWords = {};
  paths(lowerCased, {
    stepWhile: function (str, x, y, grid) {
      if (dictionary.isWord(str)) {
        // found whole word, maybe there is more!
        uniqueWords[str] = true;
        return true;
      }
      if (dictionary.isWordPrefix(str)) {
        // not a word, but possible
        return true;
      }
    }
  });

  var words = Object.keys(uniqueWords);
  words = utils.validWords(words);
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
  boggle: boggle,
  report: report
};