var boggle = require('../boggle').boggle;

gt.module('simple boggle');

gt.test('basics', function () {
  gt.arity(boggle, 1, 'function with 1 argument');
});

gt.test('as and bs', function () {
  var words = boggle('AABBBBBBBBBBBBBB');
  gt.array(words, 'got array of words');
  gt.equal(words.length, 4, 'couple of words');
});

gt.test('as and bs with spaces', function () {
  var words = boggle('AABB BBBB BBBB BBBB');
  gt.array(words, 'got array of words');
  gt.equal(words.length, 4, 'couple of words');
});

gt.test('as and bs with weird spaces', function () {
  var words = boggle('  AABB    BB  BB B BB B BBB B ');
  gt.array(words, 'got array of words');
  gt.equal(words.length, 4, 'couple of words');
});

gt.test('alphabet', function () {
  var words = boggle('abcd efgh ijkl mnop');
  gt.array(words, 'got array of words');
  gt.equal(words.length, 6, 'couple of words');
});