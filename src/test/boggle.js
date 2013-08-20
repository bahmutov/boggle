var boggle = require('../boggle').boggle;

gt.module('simple boggle');

gt.test('basics', function () {
  gt.arity(boggle, 1, 'function with 1 argument');
});

gt.test('as and bs', function () {
  var words = boggle('AABBBBBBBBBBBBBB');
  gt.array(words, 'got array of words');
  gt.equal(words.length, 5, '5 words');
});