# Boggle solver

Small simple nodejs based Boggle grid solver

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