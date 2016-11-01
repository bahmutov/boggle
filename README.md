# Boggle solver

Small simple nodejs based Boggle grid solver

[![NPM][boggle-icon] ][boggle-url]

[![Build status][boggle-ci-image] ][boggle-ci-url]
[![dependencies][boggle-dependencies-image] ][boggle-dependencies-url]
[![devdependencies][boggle-devdependencies-image] ][boggle-devdependencies-url]

[![semantic-release][semantic-image] ][semantic-url]

Breaking dependencies? [![Dont-break][circle-ci-image] ][circle-ci-url] using
[dont-break](https://github.com/bahmutov/dont-break)

## Install and run

After installing nodejs, run:

    npm install -g boggle
    // ignore any warnings
    boggle "ABCD EFGH IJKL MNOP"

The spaces between letters are optional, it could be single
string with 16 characters. In this case, you don't need quotes:

    boggle ABCDEFGHIJKLMNOP

Case does not matter, characters will be converted to lowercase.

## Main logic

The algorithm iterates over the 2D grid, trying to walk
depth first, including diagonally, but not
visiting same cell more than once. At each step, the accumulated
string is checked against the dictionary. Walking stops and
the algorithm backtracks to previous depth level if the string
is no longer a valid word or valid word prefix.

    // src/boggle.js
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

## Dependencies

To discover paths in the letter grid, I use [matrix-paths](https://bitbucket.org/bahmutov/matrix-paths). While walking through the matrix, I use boggle [prefix-dictionary](https://bitbucket.org/bahmutov/prefix-dictionary) that uses a [**trie**](http://en.wikipedia.org/wiki/Trie) data structure. Trie is a binary search tree that stores words in addition to children links, making word or prefix matching very quick.

## Testing and code complexity

To unit and function test the module, execute command

    npm test

This might require installing [gt](https://npmjs.org/package/gt) testing tool globally

    npm install -g gt

To see code complexity (it is very low), run command

    npm run-script complexity

This might require installing [jsc](https://npmjs.org/package/jsc) tool globally

    npm install -g jsc

## Todo

* Use jshint to see possible bugs
* check dictionary initialization (is it a good idea to initialize using a sorted words array)
* hook into trie implementation to store previous prefix query, because we keep asking for same prefix path "h - he - hel - hell - hello".

## Small print

Author: Gleb Bahmutov &copy; 2013

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, click *endorse*, etc.

Support: if you find any problems with this module, email / tweet / open issue on Github


[boggle-icon]: https://nodei.co/npm/boggle.png?downloads=true
[boggle-url]: https://npmjs.org/package/boggle
[boggle-ci-image]: https://travis-ci.org/bahmutov/boggle.png?branch=master
[boggle-ci-url]: https://travis-ci.org/bahmutov/boggle
[boggle-dependencies-image]: https://david-dm.org/bahmutov/boggle.png
[boggle-dependencies-url]: https://david-dm.org/bahmutov/boggle
[boggle-devdependencies-image]: https://david-dm.org/bahmutov/boggle/dev-status.png
[boggle-devdependencies-url]: https://david-dm.org/bahmutov/boggle#info=devDependencies
[circle-ci-image]: https://circleci.com/gh/bahmutov/boggle.svg?style=svg
[circle-ci-url]: https://circleci.com/gh/bahmutov/boggle
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
