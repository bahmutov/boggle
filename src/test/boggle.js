var boggle = require('../boggle').boggle;

gt.module('simple boggle');

gt.test('basics', function () {
  gt.arity(boggle, 1, 'function with 1 argument');
});

gt.test('as and bs', function () {
  var words = boggle('AABBBBBBBBBBBBBB');
  gt.array(words, 'got array of words');
  gt.equal(words.length, 6, 'couple of words');
});

gt.test('as and bs with spaces', function () {
  var words = boggle('AABB BBBB BBBB BBBB');
  gt.array(words, 'got array of words');
  gt.equal(words.length, 6, 'couple of words');
});

gt.test('as and bs with weird spaces', function () {
  var words = boggle('  AABB    BB  BB B BB B BBB B ');
  gt.array(words, 'got array of words');
  gt.equal(words.length, 6, 'couple of words');
});

gt.test('alphabet', function () {
  var words = boggle('abcd efgh ijkl mnop');
  gt.array(words, 'got array of words');
  gt.equal(words.length, 34, 'couple of words');
});

gt.test('helios', function () {
  var words = boggle('heli zzzo zzzs zzzz');
  gt.array(words, 'got array of words');
  gt.equal(words.length, 13, 'couple of words');
});

gt.test('Qu', function() {
  var words = boggle(['a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','Qu']);
  gt.array(words, 'got array of words');
  gt.equal(words.length, 2, 'couple of words');
})

gt.test('grid', function () {
  var grid = [
  ['a', 'b', 'b', 'a'],
  ['a', 'b', 'b', 'a'],
  ['a', 'b', 'b', 'a'],
  ['a', 'b', 'b', 'a']
  ];
  var words = boggle(grid);
  gt.array(words, 'got words array');
});

gt.test('reporting', function () {
  var report = require('../boggle').report;
  gt.arity(report, 1, 'single argument');
  report(['one', 'two']);
});

gt.test('invalid input', function () {
  gt.raises(function () {
    boggle('abc');
  }, Error, 'string is too short');
});

gt.test('board generation', function () {
  var board = boggle.generate()
  gt.array(board, 'got board array')
  gt.equal(board.length, 16, 'couple of words');
});

gt.test('scoring', function() {
  gt.equal(boggle.score('a'), 0, 'word score')
  gt.equal(boggle.score('aaa'), 1, 'word score')
  gt.equal(boggle.score('aaaaa'), 2, 'word score')
  gt.equal(boggle.score('aaaaaa'), 3, 'word score')
  gt.equal(boggle.score('aaaaaaa'), 5, 'word score')
  gt.equal(boggle.score('aaaaaaaaaaaaa'), 11, 'word score')
})