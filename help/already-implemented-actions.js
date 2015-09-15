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
    return cell.update(current => current !== '' ? current : getNextPiece(board));
  })
  // Function to return `x` if x is winner, `o` if o is winner or
  // false if no winner
  .register(function findWinner (board) {
    const checks = [
      board, transpose(board), diagonal(board), diagonal(board.reverse())
    ].map(v => v.find(threeInRow)).filter(v => !!v)[0];

    if (checks) return checks.get(0);

    const flattened = board.flatten(true);
    if (flattened.count(identity) === flattened.count()) return 'No one';

    return false;
  })
  // Function resetting the board. All cells should be set to empty string
  .register(function reset (board) {
    return board.update((current) =>
      current.map(row => row.map(() => '')));
  });



function getNextPiece (board) {
  const stats = board.flatten(true).reduce((acc, item) =>
    item === '' ? acc : acc.update(item, c => c + 1),
    immutable.Map({ 'x': 0, 'o': 0 }));

  return (stats.get('x') === stats.get('o')) ?
    'x' : stats.entrySeq().minBy(([_, value]) => value)[0];
}
