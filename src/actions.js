'use strict';
const actions = require('immstruct-actions');
const immutable = require('immutable');

const identity = v => v;
const threeInRow = row => row && !!row.reduce(
  (acc, cell) => (acc === cell) ? acc : false);
const transpose = matrix => matrix.map(
  (cell, i) => matrix.map(row => row.get(i)));
const diagonal = matrix => immutable.List([
  matrix.map((row, i) => matrix.getIn([i, i]))
]);

// Export action functions
module.exports = actions
  // Function taking cell and board and returns updated cell value.
  // Should update cell to be next piece (@see getNextPiece) based on board.
  .register(function change (cell, board) {

  })
  // Function to return `x` if x is winner, `o` if o is winner or
  // false if no winner
  .register(function findWinner (board) {

  })
  // Function resetting the board. All cells should be set to empty string
  .register(function reset (board) {

  });


// Function to scan through board and detect next piece.
function getNextPiece (board) {
  const stats = board.flatten(true).reduce((acc, item) =>
    item === '' ? acc : acc.update(item, c => c + 1),
    immutable.Map({ 'x': 0, 'o': 0 }));

  return (stats.get('x') === stats.get('o')) ?
    'x' : stats.entrySeq().minBy(([_, value]) => value)[0];
}
