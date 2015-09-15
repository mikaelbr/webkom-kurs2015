/*
In this file: Assignments for getting up to speed using Omniscient Components.

This doesn't need to run in the browser, but just run the tests using the
terminal.

Run tests using (from project root):
$ npm run tests-2

Or to watch (no need to re-run the command)
$ npm run tests-2 -- -w


---

Assignment:

1. Make and render a single NameBox component
2. Make and render a List components (list of NameBox)
3. Pass dynamic list of NameBox components.


You can use ES6/ES2015 in this file.
*/

// Includes, no need to touch:
var React = require('react');
var ReactDOM = require('react-dom/server'); // For server rendering.
var component = require('omniscient');

/*
## Assignment 2.1: This time as a Omniscient Component
Implement a simple NameBox component consisting of a h1-element and a h2 element.
The h1 should show a {name} and h2 should show a title. Both given as arguments
on props.

Remember: React components always need to have *one single* top parent
*/
const NameBox = null; /* Component here */


/*
## Assignment 2.2: This time as a Omniscient Component

Implement a component List that shows a <div> with three NameBox items.
Think in same ways as you'd do in HTML.

Examples of names to list (can be anything):
Name: Wade Wilson, Title: Not Spiderman
Name: Domino, Title: Lucky
Name: Nathan Summers, Title: Slider by Two

*/
const List = null; /* Component here */


/*
## Assignment 2.3: This time as a Omniscient Component

Implement a component List that shows a <div> with dynamic amount of NameBox items.
Here you get props with property `items` as a list of objects. E.g.

var list = [
  { name: 'Wade Wilson', title: 'Not Spiderman' },
  { name: 'Domino', title: 'Lucky' },
  { name: 'Nathan Summers', title: 'Slider by Two' }
];

Here you want to build your list programatically, not static.
*/
const DynamicList = null; /* Component here */




// BELOW HERE ARE THE TESTS. No need to see, but you can if you are unsure
// on what the output should be..


var assert = require('assert');

describe('assignment-2', function () {

  describe('assignment-2-1', function () {
    it('should show a namebox', function () {
      var output = render(NameBox, {
        name: 'Wade',
        title: 'Deadpool'
      });
      assert.notEqual(output.indexOf('h1'), -1, 'NameBox should have h1');
      assert.notEqual(output.indexOf('h2'), -1, 'NameBox should have h2');
      assert.notEqual(output.indexOf('Wade'), -1, 'NameBox take name as input');
      assert.notEqual(output.indexOf('Deadpool'), -1, 'NameBox take title as input');
    });
  });

  describe('assignment-2-2', function () {
    it('should show list of nameboxes', function () {
      var output = render(List);
      assert.notEqual(count(output, 'h1'), 3, 'List should 3 h1s');
      assert.notEqual(count(output, 'h2'), 3, 'List should 3 h2s');
    });
  });

  describe('assignment-2-3', function () {
    it('should show dynamic list of nameboxes', function () {
      var output = render(DynamicList, {
        items: [
          {
            name: 'Wade',
            title: 'Deadpool'
          }
        ]
      });
      assert.notEqual(output.indexOf('h1'), -1, 'DynamicList should output passed items');
      assert.notEqual(output.indexOf('h2'), -1, 'DynamicList should output passed items');
      assert.notEqual(output.indexOf('Wade'), -1, 'DynamicList should output passed items');
      assert.notEqual(output.indexOf('Deadpool'), -1, 'DynamicList should output passed items');
    });

    it('should show equal number of nameboxes as items passed', function () {
      var output = render(DynamicList, {
        items: [
          {
            name: 'Wade',
            title: 'Deadpool'
          },
          {
            name: 'Wade',
            title: 'Deadpool'
          },
          {
            name: 'Wade',
            title: 'Deadpool'
          },
          {
            name: 'Wade',
            title: 'Deadpool'
          },
          {
            name: 'Wade',
            title: 'Deadpool'
          },
        ]
      });
      assert.notEqual(count(output, 'h1'), 4, 'DynamicList should list equal amount of NameBoxes as items passed as argument');
      assert.notEqual(count(output, 'h2'), 4, 'DynamicList should list equal amount of NameBoxes as items passed as argument');
    });

  });

  function count (str, match) {
    return (str.match(new RegExp(match, 'g')) || []).length;
  }

  function render (component, props) {
    return ReactDOM.renderToString(component(props || {}));
  }

});
