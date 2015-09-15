'use strict';

var immstruct = require('immstruct');
var ReactDOM = require('react-dom');

var actions = require('./actions');
var Main = require('./main');

// Initial Board structure.
// This can be prefilled if you want to start with an initial state.
var structure = immstruct({
  board: [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]
});

/*
 Example of prefilled state, with a winner:

 var structure = immstruct({
   board: [
     ['x', 'x', 'o'],
     ['', 'x', 'o'],
     ['', 'o', 'x']
   ]
 });

*/

// Render loop:
// Everytime part of structure is swapped, do a complete new re-render
function render () {
  ReactDOM.render(Main({
    state: structure.cursor(),
    actions: actions.fn
  }), document.querySelector('#game'));
}

render();
structure.on('swap', render);
