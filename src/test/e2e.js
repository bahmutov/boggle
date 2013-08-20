gt.module('e2e tests');

var path = require('path');
var index = path.join(__dirname, '../../index.js');

gt.async('helios', function () {
  var helios = 'helizzzozzzszzzz';
  gt.exec('node', [index, helios], 0, 'should be ok');
});

gt.async('helios with spaces', function () {
  var helios = 'heli zzzo zzzs zzzz';
  gt.exec('node', [index, helios], 0, 'should be ok');
});