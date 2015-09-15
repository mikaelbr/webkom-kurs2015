'use strict';

var component = require('omniscient');
var React = require('react');

// Extend this list if more elements are needed.
// If using JSX, this isn't needed.
var {div, h1, p, a} = React.DOM;

// Should have className 'cell'
// on click it should change contents of cursor passed as cell
// Should not do onClick if disabled (there is a winner)
// Outputs "x" or "o" (contents of cell cursor).
var Cell = component(({disabled, cell, board, change}) => a({
    className: 'cell',
    onClick: () => !disabled && change(cell, board)
  },
  cell.valueOf()
));

// Should have className 'board' and flat list of all Cells.
// Should pass two cursors:
//  - "cell": cursor to Cell, a cursor pointing to the value of that cell.
//  - "board": cursor to the entire board
// Should also pass down if disabled or not (if there is a
// winner) and a change action to cell
var Board = component(({disabled, board, actions: {change}}) => div({
    className: 'board'
  },
  board.flatMap((row, x) =>
    row.map((cell, y) =>
      Cell({
        key: `cell-${x}-${y}`,
        cell: board.cursor([x, y]),
        disabled, board, change
      }))
  ).toArray()
));

// Should show an anchor with notice of who won
// On click on anchor: reset game
// Should output something like "Game finished! Winner: {SOME WINNER}."
var Winner = component(({board, onClick: reset, winner}) => a({
    className: 'winner',
    onClick: () => reset(board)
  },
  h1({}, `Game finished! Winner: ${winner}`),
  p({}, 'Click to restart')
));

// App should show a div with className `tic-tac-toe`
// Should show Winner component if detected a winner
// Should also show Board component
// App is passed the following props:
/*
{
  state: stateCursor, // cursor to the global app state
  actions: {
    // Action functions from ./actions.js, with following functions:
    change (cell, board),
    findWinner (board),
    reset (board)
  }
}
*/
var App = component(function ({state, actions}) {
  var { findWinner, reset } = actions;
  var board = state.cursor('board');
  var winner = findWinner(board);

  return div({
    className: 'tic-tac-toe'
  },
    !winner ? null : Winner({ winner, board, onClick: reset }),
    Board({
      board,
      actions: actions,
      disabled: !!winner
    })
  );
});


// Export App component to be used by app.js
module.exports = App;
