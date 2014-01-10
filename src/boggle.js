var check = require('check-types');
var verify = check.verify;
var utils = require('./utils');
var _ = require('lodash');

var paths = require('matrix-paths-zolmeister').paths;
verify.fn(paths, 'paths is not a function');

function report(words) {
  verify.array(words, 'expected array of words');
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
  utils.verifyGridOfStrings(gridOfCharacters);
  console.assert(gridOfCharacters.length > 0, 'empty array');

  var dictionary = require('prefix-dictionary');
  verify.fn(dictionary.isWord, 'missing isWord');
  verify.fn(dictionary.isWordPrefix, 'missing isWordPrefix');

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
  // console.log('boggle on', str);
  if (check.string(str)) {
    str = str.replace(/\s/g, '');
    if (str.length === 16) {
      return boggleString(str);
    }
  }
  if (check.array(str) && (str.length === 4)) {
    return boggleGrid(str);
  }

  // support a single array as input
  if (check.array(str) && (str.length === 16)) {
    var grid = [
      str.slice(0, 4),
      str.slice(4, 8),
      str.slice(8, 12),
      str.slice(12, 16),
    ];
    return boggleGrid(grid);
  }
  throw new Error('Invalid boggle input ' + JSON.stringify(str));
}

boggle.generate = function () {
  var dice = ["AAEEGN", "ELRTTY", "AOOTTW", "ABBJOO", "EHRTVW", "CIMOTU",
  "DISTTY", "EIOSST", "DELRVY", "ACHOPS", "HIMNQU", "EEINSU", "EEGHNW",
  "AFFKPS", "HLNNRZ", "DEILRX"];

  return _.map(_.shuffle(dice), function (die) {
    var letter = _.sample(die);
    return letter === 'Q' ? 'Qu' : letter;
  });
};

boggle.score = function (word) {
  var len = word.length;
  if (len <= 2) return 0;
  else if (len <= 4) return 1;
  else if (len <= 5) return 2;
  else if (len <= 6) return 3;
  else if (len <= 7) return 5;
  else return 11;
};

module.exports = {
  boggle: boggle,
  report: report
};
