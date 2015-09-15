# Immutable.js and Immstruct

Docs for Immutable.js can be found here: http://facebook.github.io/immutable-js/

This is what is needed for this course:

```js
// given some object
var someObject = Immutable.List([1, 2, 3, 4]);

// Get data
someObject.get(0); // Get index 0 of list

// ## Updating

// Can update by using `.update`
someObject.update((current) => current.concat(10)); //> List [ 1, 2, 3, 4, 10]
// Doesn't change someObject as it is immutable.

// Shortcut `.set(key, value)`
someObject.set(0, 10); //> List [ 10, 2, 3, 4]


// We can transform data by:
someObject.map((i) => i * 2); // New Immutable.List

// To make it into a proper JS array we do .toArray():
someObject.map((i) => i * 2).toArray(); // [2, 4, 6, 8]
// Important: Often used to create lists of React children.

someObject = Immutable.fromJS([
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3]
]);

// Flatten two-dimensional array
someObject.flatten().toArray(); //> [1, 2, 3, 1, 2, 3, 1, 2, 3, 2]

// In case one wants to transform as well
someObject.flatMap(i => i.concat(2)).toArray();
//> [1, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 2]
// Flattens and transforms data

// Example of functional approach, create list of tuples of coordinates
someObject.flatMap((a, x) =>
  a.map((n, y) =>
    [x, y]
  )
).toArray();
// Note: Can be important


```

## Cursors

Cursors are simply a wrapper of Immutable structures, which can have attached
subscribers.

Example:

```js
var immstruct = require('immstruct');
var structure = immstruct({ a: { b: { c: 1 } } });

structure.on('swap', function (newStructure, oldStructure, keyPath) {
  console.log('Subpart of structure swapped.');
  console.log('New structure:', newStructure.toJSON());

  // e.g. with usage with React
  // React.render(App({ cursor: structure.cursor() }), document.body);
});

var cursor = structure.cursor(['a', 'b', 'c']);

// Update the value at the cursor. As cursors are immutable,
// this returns a new cursor that points to the new data
var newCursor = cursor.update((x) => x + 1);

// We unwrap the cursor, by getting the data it is pointing at using deref
// and see that the value of the old `cursor` to is still `1`
console.log(cursor.deref()); //=> 1

// `newCursor` points to the new data
console.log(newCursor.deref()); //=> 2
```

Cursors are mostly transparent. This means that you can interact with a cursor
the same way as you would with a Immutable.js structure. For instance, given
some cursor to a list [1, 2, 3];

```js

var structure = immstruct([ 1, 2, 3 ]);
var immutableList = structure.current;

var cursor = structure.cursor();
// cursor.inspect() => Cursor [ List [ 1, 2, 3 ] ]

cursor.map((i) => console.log(i)); //=> 1, 2, 3
immutableList.map((i) => console.log(i)); //=> 1, 2, 3

// Get cursors underlying value (either Immutable object or scalar value)
cursor.deref();

// In this case cursor.deref() would return List [ 1, 2, 3 ]
```

Some times you enter a portal and you get a immutable structure instead of
a cursor to an immutable structure. In that case you can create new cursors
by using paths:

```js
var someObject = immstruct([
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3]
]);

var topCursor = someObject.cursor();

// Example of functional approach, create list of tuples of coordinates
someObject.flatMap((a, x) =>
  // In this case, `n` will become a immutable structure rather than cursor.
  // Need to transform it
  a.map((n, y) =>
    topCursor.cursor([x, y]) // Creates cursor from spot [0, 0], [0, 1] etc
  )
).toArray(); // Will be a list of cursors.
```


## Immutability in Cursors

Extra information. Not really needed, but can be helpful to understand cursors.

Having the following structure

```js
var structure = immstruct({ message: 'Foo' });
```

And invoking `structure.cursor()`, you get a new cursor based on the current
structure. Note that this is a method call for creating a new cursor.

## Some examples

```js
// New cursor for top node, and update that value to `someNewValue`
structure.cursor('message').update(function (currentMessage) {
  return 'Bar';
});
// Or you could do: structure.cursor().set('message', 'Bar'); for short

// New cursor for top node, containing the updated value from above
structure.cursor('message'); //> Bar

// New cursor again
var newCursor = structure.cursor('message');

var anotherCursor = newCursor.update(() => 'Changed'); // update the structure again

newCursor          //=> Still points to the first updated data ("Bar")
anotherCursor      //=> Points to the updated data ("Changed")
structure.cursor() //=> Create another cursor that points to the updated data ("Changed")
```

This is applicable when operating directly on a `structure`. If you have a cursor, it behaves slightly different:

```js
// New sub cursor for top node, and update that value
var cursor = structure.cursor();

var subCursor = cursor.cursor(['some', 'place', 'in', 'tree']);

var newSubCursor = subCursor.update(/* ... */);

newSubCursor //=> new data
subCursor //=> old data

// and even:
cursor.cursor(['some', 'place', 'in', 'tree']) //=> old data

// this is due to immutable values:
cursor //=> old data
```
