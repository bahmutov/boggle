var boggle = require('../boggle').boggle;

gt.module('simple boggle');

gt.test('basics', function () {
  gt.arity(boggle, 1, 'function with 1 argument');
});