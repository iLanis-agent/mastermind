/* Mastermind engine - pure logic, shared by the app and node tests. */
(function (global) {
  'use strict';

  var COLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

  /* Random secret code: array of `len` color indices (0..colorCount-1). */
  function createCode(rand, len, colorCount) {
    len = len || 4;
    colorCount = colorCount || 6;
    var code = [];
    for (var i = 0; i < len; i++) code.push(Math.floor(rand() * colorCount));
    return code;
  }

  /*
   * Score a guess against the code.
   * exact   = right color in the right position (black peg)
   * partial = right color in the wrong position (white peg)
   * Handles duplicates correctly: each code peg can only be matched once.
   */
  function scoreGuess(code, guess) {
    var exact = 0;
    var codeLeft = {};
    var guessLeft = {};
    for (var i = 0; i < code.length; i++) {
      if (code[i] === guess[i]) {
        exact++;
      } else {
        codeLeft[code[i]] = (codeLeft[code[i]] || 0) + 1;
        guessLeft[guess[i]] = (guessLeft[guess[i]] || 0) + 1;
      }
    }
    var partial = 0;
    for (var c in guessLeft) {
      if (Object.prototype.hasOwnProperty.call(guessLeft, c) && codeLeft[c]) {
        partial += Math.min(codeLeft[c], guessLeft[c]);
      }
    }
    return { exact: exact, partial: partial };
  }

  function isWin(score, len) {
    return score.exact === (len || 4);
  }

  var api = { COLORS: COLORS, createCode: createCode, scoreGuess: scoreGuess, isWin: isWin };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else global.Mastermind = api;
})(typeof window !== 'undefined' ? window : globalThis);
