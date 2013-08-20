#!/usr/bin/env node

var boggle = require('./src/boggle').boggle;
var report = require('./src/boggle').report;

if (module.parent) {
  module.exports = boggle;
  return;
}

// top level input checks, but not too strict
if (process.argv.length !== 3) {
  console.error('Expected <boggle> <16 letters>');
  process.exit(-1);
}

var letters = '' + process.argv[2];
letters = letters.replace(/\s/g, '');
if (letters.length !== 16) {
  console.error('Expected string with 16 characters');
  console.error(letters);
  console.error(letters.length);
  process.exit(-1);
}

console.log('boggle from');
console.log(letters.substr(0, 4));
console.log(letters.substr(4, 4));
console.log(letters.substr(8, 4));
console.log(letters.substr(12, 4));

var words = boggle(letters);
report(words);
process.exit(0);