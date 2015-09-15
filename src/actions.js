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

module.exports = actions
  .register(function change (cell, board) {
    return cell.update(current => current !== '' ? current : getNextPiece(board));
  })
  .register(function findWinner (board) {
    const checks = [
      board, transpose(board), diagonal(board), diagonal(board.reverse())
    ].map(v => v.find(threeInRow)).filter(v => !!v)[0];

    if (checks) return checks.get(0);

    const flattened = board.flatten(true);
    if (flattened.count(identity) === flattened.count()) return 'No one';

    return false;
  })
  .register(function reset (board) {
    return board.update((current) =>
      current.map(row => row.map(() => '')));
  });



function getNextPiece (board) {
  const pieceStats = board.flatten(true).reduce(
      (acc, item) => item === '' ? acc : acc.update(item, c => c + 1),
      immutable.Map({ 'x': 0, 'o': 0 }));
  return (pieceStats.get('x') === pieceStats.get('o')) ?
    'x' : pieceStats.entrySeq().minBy(([_, value]) => value)[0];
}
