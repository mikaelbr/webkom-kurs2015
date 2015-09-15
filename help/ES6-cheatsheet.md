# ES6 (ES2015) Cheat Sheet

A summary of ES2015 (ES6) features commonly used with functional style UI
programming using React and Omniscient.js. Examples are shown in
React/Omniscient.js contexts where applicable, but are also valuable as a
general recap or overview of some of the more used ES6 features.

## Fat arrow

The fat arrow is one of the more used features in the latest iteration of the
specification. Probably one of the reasons it's popular, is that it's less
verbose than normal function declarations. This means it fits better as
arguments to other functions (so-called higher order functions).

```js
var double = function (n) {
  return n * 2;
};

// versus

var double = (n) => n * 2;
```

> ### Aside
> This means, as of the current JS, a fat arrow function, cannot have a name.
They are always anonymous, but can be stored in a variable as they are expressions.
>
> This can bring troubles when you want to do recursive functions, as the variable
outside the fat arrow can be changed.

In addition to brevity, fat-arrows offers automatic [binding of context](http://ryanmorr.com/understanding-scope-and-context-in-javascript/).
This means that if you use a fat-arrow in a function of an object literal, the
context will be bound to the surrounding `this`.

### Binding context

```js
var Component = React.createClass({
  myOnClick() {
    // Would work just fine, this is bound to the this of myOnClick
    var log = (n) => console.log(this.refs[n]);
    log('header');
    log('subheader');
  },

  render () {
    return <div onClick={this.myOnClick}>
      <h1 ref="header">Hello</h1>
      <h2 ref="subheader">World</h2>
    </div>
  }
});
```

### Not binding context
```js
var Component = React.createClass({
  myOnClick() {
    // Would NOT work, as this is not the component but the global object
    var log = function (n) { console.log(this.refs[n]); }
    log('header');
    log('subheader');
  },

  render () {
    return <div onClick={this.myOnClick}>
      <h1 ref="header">Hello</h1>
      <h2 ref="subheader">World</h2>
    </div>
  }
});
```

## Destructuring

Destructuring is from the LISP world. You can extract values from objects without
having to use multiple lines to do so. You can extract values from normal objects
and arrays.

### Example

```js
// Only fetching some values from an array
var [a, , b] = [1, 2, 3];
console.log(a, b);
// => 1 3

// Combine with rest (accumulates the rest values)
var [a, ...b] = [1, 2, 3];
console.log(a, b);

// Fetch from inside object
var {user: x} = {user: 5};
console.log(x);
// => 5

// Or as a shorthand
var {user} = {user: 5};
console.log(user);
// => 5
```

### Example in React

Destructuring is nice to have for fetching values from React props.

```js
var Component = React.createClass({
  render () {
    // Get title and subtitle from props
    var {title, subtitle} = this.props;
    return <div>
      <h1 ref="header">{title}</h1>
      <h2 ref="subheader">{subtitle}</h2>
    </div>
  }
});

ReactDOM.render(<Component title="Hello" subtitle="World" />, el);
```

### Example With Stateless Functions

```js
// Destructuring in parameter position works the same as in variable declarations.
var Component = function ({title, subtitle}) {
  return <div>
    <h1 ref="header">{title}</h1>
    <h2 ref="subheader">{subtitle}</h2>
  </div>
};

ReactDOM.render(<Component title="Hello" subtitle="World" />, el);
```

See [more examples of destructuring in this gist](https://gist.github.com/mikaelbr/9900818).

## Template Strings

Template strings are a small but sometimes very nice-to-have language addition that
allows you to avoid using string concatenation. It also allows for string over multiple
lines.

```js
var someVariable = 42;
var myText = `
  # Some markdown document
  This is some longer text that extends over multiple lines.
  Also it uses variables: ${someVariable}!
`;
```

### Example in React

You'll often end up doing string concatenation when defining CSS classes in
your components. For example:

```js
var Component = React.createClass({
  render () {
    // Get title and subtitle from props
    var {title, subtitle, type} = this.props;
    return <div className={"namebox-" + type + "-container"}>
      <h1 ref="header">{title}</h1>
      <h2 ref="subheader">{subtitle}</h2>
    </div>
  }
});
```

This can be made more readable and easier to write with template literals:

```js
var Component = React.createClass({
  render () {
    // Get title and subtitle from props
    var {title, subtitle, type} = this.props;
    return <div className={`namebox-${type}-container`}>
      <h1 ref="header">{title}</h1>
      <h2 ref="subheader">{subtitle}</h2>
    </div>
  }
});
```

## Enhanced Object Literals

## Scopes

Up until now, there has only been function scope in Javascript (* see aside). This
changes with `let` and `const`. These bring block scopes to the language. So
can now use local variables in things such as for/while-loops or in if-statements.

> ### Aside
> Technically, there has been some way to have block scope without using
> self-invoking anonymous functions. Using a try-catch block is one of these.

### Example without block scope
```js

var foo = '3';

{
  var foo = '1';
}

{
  var foo = '2';
}


console.log('foo', foo);
// => 2

```

### Example with block scope

```js

var foo = '3';

{
  let foo = '1';
}

{
  let foo = '2';
}


console.log('foo', foo);
// => 3

```

### Example with for-loops

```js
for (let i = 0; i < 2; i++) {
  console.log(i);
}
console.log(i);
/* Results:
0
1
i is not defined
*/
```

This in contrast to:

```js
for (var i = 0; i < 2; i++) {
  console.log(i);
}
console.log(i);
/* Results:
0
1
2
*/
```

In addition, the initialization of let/const differs from normal variables. While
`var` always will automatically get "hoisted" and initialized at the top of its
scope, let/const will not. This means that references created using `let`/`const`
might be in what is called a "temporal dead zone" (the area above the declaration
and the top of the current scope).

```js
console.log('let', i); // Throws ReferenceError
let i = 1;
```

With variable

```js
console.log('var', i); // prints "var undefined"
var i = 1;
```

### `const` vs `let`

`const` and `let` behaves the same in regards to scope, but they differ in the
way that you can change the reference behind a `let`. For instance:

```js
let foo = 'foo';
foo = 'bar'; // Works as expected


const bar = 'bar';
bar = 'foo'; // Won't change. `bar` is still 'bar'
```

There is one gotcha, though. I like to think of `const` as not a constant, but a
constant reference. This due to const not freezing the value it refers to. So
you are free to mutate any value the const is pointing at.

Example:

```js
const myObject = {
  foo: 'foo'
};

// Does not work, as we try to change the reference
myObject = {
  foo: 'bar'
};

// Does work, as we change the value:
myObject.foo = 'bar';
```
