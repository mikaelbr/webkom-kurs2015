/*
In this file: Assignments for getting up to speed using Immutable.js and Immstruct.

This doesn't need to run in the browser, but just run the tests using the
terminal.

Run tests using (from project root):
$ npm run tests-3

Or to watch (no need to re-run the command)
$ npm run tests-3 -- -w

---

Assignment:

1. Create a immutable structure
2. Make and render a List components (list of NameBox)
3. Pass dynamic list of NameBox components.


You can use ES6/ES2015 in this file.
*/

// Includes, no need to touch:
var assert = require('assert');
var React = require('react');
var ReactDOM = require('react-dom/server'); // For server rendering.
var component = require('omniscient');
var Immutable = require('immutable');
var immstruct = require('immstruct');

/*
## Assignment 3.1
Use Immutable.js API to create lists and operate on that list.
*/

// ES6 Destructuring, get Range, Map and List from Immutable.js
var { Range, Map, List } = Immutable;

// 1: Create a list of numbers from 0 to 99 (count 100)
var numbers = Range(0, 100);

it('creates a range from 0 to 100', function () {
  assert.equal(numbers.get(0), 0);
  assert.equal(numbers.get(99), 99);
});

// Transform all numbers to a multiplum of 3
var tripled = numbers.map((n) => n * 3);

it('tripled every number', function () {
  assert.equal(tripled.get(40), 120);
});


// Pick only items from "tripled" which is even numbers (dividable by 2)
var filtered = tripled.filter(n => n % 2 === 0);

it('filters out/removes every number odd number', function () {
  assert.equal(filtered.get(2), 12);
  assert.equal(filtered.get(3), 18);
});

// Use reduce to sum all items in list "filtered"
var reduced = filtered.reduce((a, b) => a + b);

it('reduces the numbers to find their sum', function () {
  assert.equal(reduced, 7350);
});

// ---
// Assignment 3.2: Cursors
// ---


var map = immstruct({ message: "Look behind you, a Three-Headed Monkey!" });

// Create a cursor to the message property of the map
// and store the reference to it in the message variable
var message = map.cursor('message');

it('creates a cursor from the message', function () {
  assert.equal(message.deref(), "Look behind you, a Three-Headed Monkey!");
});


// Update the value of the message cursor to make the test pass
var updatedMessage = message.update(() =>
  "The ships hung in the sky in much the same way that bricks don't.");

it('updates the value of the cursor', function () {
  assert.equal(updatedMessage.deref(),
    "The ships hung in the sky in much the same way that bricks don't.");
});


it('should not modify the original cursor', function () {
  // A test to make sure your previous update did not change the
  // original message variable
  assert.equal(message.deref(), "Look behind you, a Three-Headed Monkey!");
});


// ---
// Assignment 3.3: Cursors in Omniscient
// ---

/**

*/
const NameBox = component((item) => <div>
  <h1>{item.get('name')}</h1>
  <h2>{item.get('title')}</h2>
</div>);

const DynamicList = component(({items}) => <div>
  {items.map(item => NameBox(item)).toArray()}
</div>);

const App = component(({cursor}) => <div>
  <DynamicList items={cursor.cursor('items')} />
</div>);

var structure = immstruct({
  items: [
    { name: 'Wade Wilson', title: 'Not Spiderman' },
    { name: 'Domino', title: 'Lucky' },
    { name: 'Nathan Summers', title: 'Slider by Two' }
  ]
});

var output = render(App({
  cursor: structure.cursor()
}));

it('should should take a structure and print dynamic list', function () {
  assert.notEqual(count(output, 'h1'), 3, 'List should 3 h1s');
  assert.notEqual(count(output, 'h2'), 3, 'List should 3 h2s');
});

function count (str, match) {
  return (str.match(new RegExp(match, 'g')) || []).length;
}

function render (result) {
  return ReactDOM.renderToString(result);
}
