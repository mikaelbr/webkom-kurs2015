'use strict';

var assert = require('assert');
var Immutable = require('immutable');
var { findWinner } = require('../actions').fn;

describe('board', function () {
  it('should find winner of board', function () {
    var board = createBoard([
      ['x', 'o', 'x'],
      ['o', 'x', ''],
      ['o', 'x', '']
    ]);
    assert.ok(findWinner(board) === false);

    var board = createBoard([
      ['x', 'o', 'x'],
      ['o', 'x', 'o'],
      ['o', 'x', 'o']
    ]);
    assert.ok(findWinner(board) === 'No one');

    board = createBoard([
      ['x', 'x', 'x'],
      ['x', 'o', 'o'],
      ['o', 'x', 'o']
    ]);
    assert.ok(findWinner(board) === 'x');

    board = createBoard([
      ['x', 'o', 'x'],
      ['x', 'o', 'x'],
      ['o', 'o', 'x']
    ]);
    assert.ok(findWinner(board) === 'o');

    board = createBoard([
      ['x', 'o', 'x'],
      ['x', 'o', 'x'],
      ['o', 'o', 'o']
    ]);
    assert.ok(findWinner(board) === 'o');

    board = createBoard([
      ['o', 'x', 'x'],
      ['x', 'o', 'x'],
      ['x', 'o', 'o']
    ]);
    assert.ok(findWinner(board) === 'o');

    board = createBoard([
      ['o', 'x', 'x'],
      ['x', 'x', 'x'],
      ['x', 'o', 'o']
    ]);
    assert.ok(findWinner(board) === 'x');

    board = createBoard([
      ['o', 'x', 'x'],
      ['x', 'x', 'o'],
      ['x', 'o', 'o']
    ]);
    assert.ok(findWinner(board) === 'x');
  });

  function createBoard (arr) {
    return Immutable.fromJS(arr);
  }
});
