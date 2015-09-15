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
var Cell = null;

// Should have className 'board' and flat list of all Cells.
// Should pass two cursors:
//  - "cell": cursor to Cell, a cursor pointing to the value of that cell.
//  - "board": cursor to the entire board
// Should also pass down if disabled or not (if there is a
// winner) and a change action to cell
var Board = null;

// Should show an anchor with notice of who won
// On click on anchor: reset game
// Should output something like "Game finished! Winner: {SOME WINNER}."
var Winner = null;

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
var App = null;


// Export App component to be used by app.js
module.exports = App;
