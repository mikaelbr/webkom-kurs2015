class: front-page

# Kurs i moderne webarkitektur

Mikael Brevik

18/09/2015

---
class: agenda

# Agenda: Del 1

* Kjapt om ES6
* Funksjonell programmering og Stateless React Components
* Omniscient.js (Memoization)
* Oppgaver 1 og 2

---
class: agenda

# Agenda: Del 2

* Immutabel data (Immutable.js)
* Immstruct
* Oppgaver 3
* Pause

---
class: agenda

# Agenda: Del 3

* Render loop
* Actions
* Case: `tic-tac-toe`

---
class: center middle

# ES6 i React
## De mest vanlige features for UIs

---

# ES6: Fat-arrows

```js
var double = function (n) {
  return n * 2;
};
```

```js
var double = (n) => n * 2;
```

---

# ES6: Fat-arrows

```js
var myObject = {
  logger() {
    // Would NOT work
    var log = function (n) {
      console.log(this.something(n));
    };
    log('Hello!');
    log('World!');
  },

  something (message) {
    return `Logging: ${message}`;
  }
};
```
---

# ES6: Fat-arrows

```js
var myObject = {
  logger() {
    // Would work just fine, this is bound to the `this` of logger
    var log = (n) => console.log(this.something(n));
    log('Hello!');
    log('World!');
  },

  something (message) {
    return `Logging: ${message}`;
  }
};
```

---

# ES6: Destructuring

```js
// Only fetching some values from an array
var [a, , b] = [1, 2, 3];
console.log(a, b);
// => 1 3

// Fetch from inside object
var {user: x} = {user: 5};
console.log(x);
// => 5

// Or as a shorthand
var {user} = {user: 5};
console.log(user);
// => 5
```

---

# ES6: Destructuring

```js
function getUser ({user}) {
  return user;
}

getUser({
  user: 5
});
// => 5
```

---

# ES6: Enhanced Object Literals
## Shorthand properties

```js
var user = 5;

// Instead of
getUser({ user: user });

// You can do
getUser({ user });
```

---
# ES6: Enhanced Object Literals

## Shorthand methods & Template literals

```js
var myObject = {
  something (message) {
    return `Logging: ${message}`;
  }
};
```

---

# ES6: Scopes

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

---

# ES6: Scopes

```js
let foo = 'foo';
foo = 'bar'; // Works as expected

const bar = 'bar';
bar = 'foo'; // Won't change. `bar` is still 'bar'
```

---
class: center middle

# ES6
## Les mer i vedlagt cheatsheet

---
class: center middle

# Stateless React
## React på en funksjonell måte


---

# Stateless React

```js
f(x) -> 2x
f(2) = 4
f(2) = 4
f(2) = 4
f(2) = 5 (WTF???)
```

---

# Stateless React

## Nytt fra React 0.14

Må ha rene komponenter som ikke påvirker noe annet enn det de returnerer!

```js
var MyComponent = function () {
  return <h1>My Component!</h1>;
}
```

Eller med ES6

```js
var MyComponent = () => <h1>My Component!</h1>;
```

---

# Stateless React

## Med input

```js
var MyComponent = (props) => <h1>{props.title}</h1>;

ReactDOM.render(MyComponent({
  title: 'Hello World!'
}), document.querySelector('#app'));
```
---

# Stateless React

## Nøsting er ingen problem

```js
var MyComponent = (props) => <h1>{props.title}</h1>;
var App = (props) => (
  <div className="my-app">
    <MyComponent title={props.title} />
    <p>This is still a pure component</p>
  </div>
);

ReactDOM.render(App({
  title: 'Hello World!'
}), document.querySelector('#app'));
```

---
class: center middle

<svg width="60%" height="80%" viewBox="0 0 600 225" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet">
  <g>
    <title>Layer 1</title>
    <g class="active-path">
      <polyline class="graphEdge" id="svg_18" points="397.74151611328125,401.7062072753906 422.5,418.2488708496094 447.25848388671875,434.7915344238281" stroke="#fff" stroke-width="5" fill="none" stroke-dasharray="5,5"></polyline>
      <polyline class="graphEdge" id="svg_17" points="311.259521484375,273.74151611328125 331.488037109375,312.5 351.7165832519531,351.25848388671875" stroke="#fff" stroke-width="5" fill="none" stroke-dasharray="5,5"></polyline>
      <polyline class="graphEdge" id="svg_16" points="356.25994873046875,193.2415313720703 336.79949951171875,215.75 317.3390197753906,238.25848388671875" stroke="#fff" stroke-width="5" fill="none" stroke-dasharray="5,5"></polyline>
      <polyline class="graphEdge" id="svg_14" points="299.64306640625,110.64816284179688 325.7007751464844,125.7142562866211 351.75848388671875,140.7803497314453" stroke="#fff" stroke-width="5" fill="none" stroke-dasharray="5,5"></polyline>
      <circle fill="#cccccc" stroke-width="0" cx="385.00001" cy="160" r="33.24153" id="svg_1" class="graphNode" stroke="#fff"></circle>
      <circle fill="#cccccc" stroke-width="0" cx="301.99999" cy="256" r="17.74152" id="svg_3" class="graphNode" stroke="#fff"></circle>
      <circle fill="#cccccc" stroke-width="0" cx="367.49998" cy="381.5" r="30.24152" id="svg_5" class="graphNode" stroke="#fff"></circle>
      <circle fill="#cccccc" stroke-width="0" cx="478.99998" cy="456" r="31.74152" id="svg_6" class="graphNode" stroke="#fff"></circle>
    </g>
    <g>
        <polyline class="graphEdge graphEdge--fade" id="svg_22" points="122.91644287109375,282.74151611328125 89.65998840332031,326.5 56.403541564941406,370.25848388671875" stroke="#fff" stroke-width="5" fill="none" stroke-dasharray="5,5"></polyline>
        <polyline class="graphEdge graphEdge--fade" id="svg_21" points="149.36302185058594,282.74151611328125 145.17288208007812,323.5 140.98275756835938,364.25848388671875" stroke="#fff" stroke-width="5" fill="none" stroke-dasharray="5,5"></polyline>
        <polyline class="graphEdge graphEdge--fade" id="svg_20" points="177.00497436523438,282.74151611328125 207.52903747558594,335 238.0531005859375,387.25848388671875" stroke="#fff" stroke-width="5" fill="none" stroke-dasharray="5,5"></polyline>
        <polyline class="graphEdge graphEdge--fade" id="svg_19" points="217.244140625,132.64306640625 197.04708862304688,167.45077514648438 176.8500213623047,202.25848388671875" stroke="#fff" stroke-width="5" fill="none" stroke-dasharray="5,5"></polyline>
        <polyline class="graphEdge graphEdge--fade" id="svg_15" points="417.0819396972656,193.2415313720703 428.6715087890625,205.25 440.2610778808594,217.25848388671875" stroke="#fff" stroke-width="5" fill="none" stroke-dasharray="5,5"></polyline>
    </g>
    <g>
      <circle fill="#cccccc" stroke-width="0" cx="467.99998" cy="246" r="28.74152" id="svg_4" class="graphNode graphNode--fade" stroke="#fff"></circle>
      <circle fill="#007fff" stroke-width="0" cx="247.5" cy="80.5" r="52.14306" id="svg_2" class="graphNode graphNode--blue" stroke="#fff"></circle>
      <circle fill="#cccccc" stroke-width="0" cx="153.49999" cy="242.5" r="40.24152" id="svg_7" class="graphNode graphNode--fade" stroke="#fff"></circle>
      <circle fill="#cccccc" stroke-width="0" cx="39.49999" cy="392.5" r="22.24152" stroke="#fff" id="svg_8" class="graphNode graphNode--fade"></circle>
      <circle fill="#cccccc" stroke-width="0" cx="136.99999" cy="403" r="38.74152" id="svg_9" class="graphNode graphNode--fade" stroke="#fff"></circle>
      <circle fill="#cccccc" stroke-width="0" cx="248.99999" cy="406" r="18.74152" id="svg_10" class="graphNode graphNode--fade" stroke="#fff"></circle>
    </g>
  </g>
</svg>

---

# Stateless React

## Betyr at vi vil få forutsigbare views

```js
ReactDOM.render(App({
  title: 'Hello World!'
}), document.querySelector('#app'));
```

```js
ReactDOM.render(App({
  title: 'Hello World!'
}), document.querySelector('#app'));
```

```js
ReactDOM.render(App({
  title: 'Hello World!'
}), document.querySelector('#app'));
```


---

# Stateless React

## Hva med alle DOM-operasjonene?

Virtual-DOM til React (og venner) tar seg av det!

```js
// Will output
ReactDOM.render(App({
  title: 'Hello World!'
}), document.querySelector('#app'));
```

```js
// Will NOT output
ReactDOM.render(App({
  title: 'Hello World!'
}), document.querySelector('#app'));
```

```js
// Will NOT output
ReactDOM.render(App({
  title: 'Hello World!'
}), document.querySelector('#app'));
```

---

# Stateless React

## Det gjør at vi kan tenke funksjonelt i UI programmering!

```js
const Herolist = (heroes) =>
  ['Wasp', 'Falcon', 'Harry Potter']
    .concat(heroes || [])
    .filter(isSuperHero)
    .map((title) => <li>{title}</li>);

const HeroPlusWade = partial(Herolist, ['Wade Wilson']);

ReactDOM.render(
  <ul>{Herolist()}</ul>,
  document.querySelector('#app'));

// Will only do DOM operations on changed data (additional item)
ReactDOM.render(
  <ul>{HeroPlusWade()}</ul>,
  document.querySelector('#app'));
```
---

# Stateless React

Vi kan tenke på all view som en funksjon vi kaller dersom vi har ny tilstand.

```js
function renderMySystemWithState (heroes) {
  const Herolist = heroes
      .filter(isSuperHero)
      .map((title) => <li>{title}</li>);

  ReactDOM.render(
    <ul>{Herolist()}</ul>,
    document.querySelector('#app'));
}

renderMySystemWithState(['Wasp']);
renderMySystemWithState(['Wasp']);
renderMySystemWithState(['Wasp', 'Falcon']);
renderMySystemWithState(['Wasp', 'Falcon', 'Dogpool']);
```
---

# Stateless React

Siden alle komponentene våre nå er frie for tilstand, betyr det at vi kan
når som helst reprodusere et gitt utgangspunkt, vi kan og hoppe frem og
tilbake i tilstand.


---
class: middle center

# Men hva med ytelse?

## Funksjonell programmering!

---

# Omniscient.js

Selv om VDOM til React differ med faktisk DOM kan det være kostnadsfult
å prøve å rendre hele treet.

```js
var MyComponent = (props) => <h1>{props.title}</h1>;
var App = function (props) {
  console.log('Tried to render me!');
  return (<div className="my-app">
    <MyComponent title={props.title} />
    <p>This is still a pure component</p>
  </div>);
};

// Will actually render
ReactDOM.render(App({ title: 'Hello World!' }), el); //> Tried to render me!
// Will not acutally render
ReactDOM.render(App({ title: 'Hello World!' }), el); //> Tried to render me!
ReactDOM.render(App({ title: 'Hello World!' }), el); //> Tried to render me!
```
---

# Omniscient.js

Hvordan kan vi forbedre det? Memoization!

```js
var MyComponent = (props) => <h1>{props.title}</h1>;
var App = function (props) {
  console.log('Tried to render me!');
  return (<div className="my-app">
    <MyComponent title={props.title} />
    <p>This is still a pure component</p>
  </div>);
};
var MemoizedApp = memoize(App);

// Will actually render
ReactDOM.render(MemoizedApp({ title: 'Hello World!' }), el); //> Tried to render me!
// Will not acutally render, nor try to
ReactDOM.render(MemoizedApp({ title: 'Hello World!' }), el); //> NO OUTPUT
ReactDOM.render(MemoizedApp({ title: 'Hello World!' }), el); //> NO OUTPUT
```

---
class: center middle

# Omniscient.js
## React + Smart Memoization

---
class: center middle

![Omniscient.js](./assets/omniscient.png)

---

# Omniscient.js

```js
var MyComponent = component((props) => <h1>{props.title}</h1>);
var App = component(function (props) {
  console.log('Tried to render me!');
  return (<div className="my-app">
    <MyComponent title={props.title} />
    <p>This is still a pure component</p>
  </div>);
});

// Will actually render
ReactDOM.render(App({ title: 'Hello World!' }), el); //> Tried to render me!
// Will not acutally render, nor try to
ReactDOM.render(App({ title: 'Hello World!' }), el); //> NO OUTPUT
ReactDOM.render(App({ title: 'Hello World!' }), el); //> NO OUTPUT
```

---

# Oppgaver 1 og 2

## Last ned fra https://github.com/mikaelbr/webkom-kurs2015

Du kan selv velge hvor mye ES6 og JSX du ønsker å bruke i oppgavene.

**Oppgave 1: Lag Stateless Components**

1. Make and render a single NameBox component
2. Make and render a List components (list of NameBox)
3. Pass dynamic list of NameBox components.


**Oppgave 2: Lag Memoized Components**

1. Make and render a single memoized NameBox component
2. Make and render a List  memoized components (list of NameBox)
3. Pass dynamic list of  memoized NameBox components.

---
class: center middle

# Del 2
## Verdier og datastrukturer

---

# Immutable.js

```js
const obj = Immutable.Map({ name: "T'Challa" });
const obj2 = obj.set('name', 'Black Panther');
obj.get('name'); //=> T'Challa
obj2.get('name'); //=> Black Panther
```

---

# Immutable.js

```js
var map1 = Immutable.Map({a:1, b:2, c:3});
var map2 = map1.set('b', 2);
assert(map1 === map2); // no change
var map3 = map1.set('b', 50);
assert(map1 !== map3); // change
```

---

# Immutable.js

```js
var list1 = Immutable.List.of(1, 2);
var list2 = list1.push(3, 4, 5);
var list3 = list2.unshift(0);
var list4 = list1.concat(list2, list3);
assert(list1.size === 2);
assert(list2.size === 5);
assert(list3.size === 6);
assert(list4.size === 13);
assert(list4.get(0) === 1);
```
---

# Immutable.js

```js
var deep = Immutable.Map({ a: 1, b: 2, c: Immutable.List.of(3, 4, 5) });
deep.toObject() // { a: 1, b: 2, c: List [ 3, 4, 5 ] }
deep.toArray() // [ 1, 2, List [ 3, 4, 5 ] ]
deep.toJS() // { a: 1, b: 2, c: [ 3, 4, 5 ] }
JSON.stringify(deep) // '{"a":1,"b":2,"c":[3,4,5]}'
```

---

# Immstruct

Et hjelpebibliotek på toppen av Immutable.js for å lytte på endringer.

```js
var structure = immstruct({a:1, b:2, c:3});
structure.on('swap', function () {
  console.log('Someone tried to change the immutable structure');
});

var map1 = structure.cursor(); // <-- !!!
var map2 = map1.set('b', 10);
var map3 = map1.set('b', 50);
```

---
class: middle center

# Cursors?!
## Hva er det for noe?

---
class: cover
background-image: url(assets/wrapped.jpg)

---

# Immstruct

Cursors er for det meste transparant, så de kan behandles på samme måte som
Immutable.js objekter.

```js
var structure = immstruct([ 1, 2, 3 ]);
var immutableList = structure.current;

var cursor = structure.cursor();
// cursor.inspect() => Cursor [ List [ 1, 2, 3 ] ]

cursor.map((i) => console.log(i)); //=> 1, 2, 3
immutableList.map((i) => console.log(i)); //=> 1, 2, 3
```

---

# Immstruct

Enkelte ganger vil man derimot ha ut den underliggende dataen som cursoren
peker på. Det kan gjøres med `.deref()`

```js
var structure = immstruct({ a: { b: { c: 1 } } });

// Make a cursor pointing at the value c from above
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

---

# Oppgaver 3

## Last ned fra https://github.com/mikaelbr/webkom-kurs2015

Du kan selv velge hvor mye ES6 og JSX du ønsker å bruke i oppgavene.

* Oppgave 3.1: Bruk Immutable.js
* Oppgave 3.2: Bruk Immstruct til å lage cursors
* Oppgave 3.3: Bruk Cursors med React

---
class: center middle

# Pause


---
class: center middle

# Render loop

## React + Data + Change Subscriber

---

# Render loop

Vi vet at vi kan bare kalle hele render funksjonen på nytt med React, og vi
vet nå hvordan vi kan ha data og lytte på endringer. Om vi kombinerer det
får vi et kontinuerlig oppdatert forutsigbart system!

```js
var App = ({title}) => <div><h1>{title.deref()}</h1></div>;

var structure = immstruct({ title: 'Hello World!' });

var render = () => ReactDOM.render(App({ title: structure.cursor('title') }), el);

// When changed
structure.on('swap', render);
// Initial render
render();

// Will update view reactivly
structure.cursor().set('message', 'Something!');
```

---

# Render loop

Siden vi er i et tre, vil endringene automatisk oppdateres på tvers, uten
at komponentene kjenner til hverandre, eller at de har noen kobling mellom seg.

```js
var Title = ({title}) => <h1>{title.deref()}</h1>;
var SmallTitle = ({title}) => <h2>{title.deref().toLowerCase()}</h2>;
var App = ({title}) => <div>
  <Title title={title} /><SmallTitle title={title} />
</div>;

var structure = immstruct({ title: 'Hello World!' });

var render = () => ReactDOM.render(App({ title: structure.cursor('title') }), el);
structure.on('swap', render);
render();

// Will be reflected both places!
structure.cursor().set('message', 'Something!');
```

---
class: middle center

# Hvordan strukturere logikk?
## "Actions"

---

# Actions

Funksjoner som er ment til å endre på data og gjøre logikken i applikasjoner på
denne måten er ofte referert til som Actions.

Man kan fint ha vanlige rene funksjoner som gjør dette.

```js
var structure = immstruct({ title: 'Hello World!' });

// Actions
var change = (state) => state.set('message', 'something');

// Usage of an action.
var Title = ({title}) =>
  <h1 onClick={() => change(title)}>{title.deref()}</h1>;
```

Disse funksjonene kan være lagret i egne filer som gjør de testbare!

---

# Actions

Men noen ganger ønsker man å kunne f.eks sende med actions som en del av
kontrakten til komponentene. Så den får inn alt den trenger for å gjøre det
den skal gjøre. Da kan det være greit å strukturere actions på en spesifikk
måte.

```js
var myActions = actions
  .register(function double (point) {
    return point.update(current => current * 2);
  })
  .register(function plus2 (point) {
    return point.update(current => current + 2);
  });

// Usage:
myActions.invoke('double', someValueCursor);
myActions.invoke('plus2', someValueCursor);

// Or even compose:
var doubledPlus2 = myActions.createComposedInvoker('double', 'plus2');
var newValue = doubledPlus2(someValueCursor);
```
---

# Actions

Kan brukes som vanlige funksjoner også:

```js
// Same myActions as before:
var {double, plus2} = myActions.fn;

double(someValueCursor);
plus2(someValueCursor);

// Can even listen to when changed
myActions.subscribe(() => console.log('Action triggered'));
```

---

# Actions

Som argumenter til komponenter: Ettersom vi har en "pakke" med actions, vi kan
sende de rundt.

```js
var myActions = actions.register(function double (point) {
  return point.update(current => current * 2);
}):
var NumberBox = ({num, actions: {double}}) =>
  <h1 onClick={() => double(num)}>{num.deref()}</h1>;

var structure = immstruct({ number: 3 });
var render = () => ReactDOM.render(NumberBox({
    title: structure.cursor('number'),
    actions: myActions.fn
}), el);

structure.on('swap', render);
render();
```

---
class: center middle

# Case: `tic-tac-toe`
## Skal lage [tre på rad](http://git.mikaelb.net/bekk-tardis/example/)

---

# tic-tac-toe

I grove trekk er det som må gjøres:

1. Lage komponenter for følgende:
  1. Celle
  2. Brettet
  4. Boks med info om vinner
  5. Hele spillet
2. Lage actions for logikken av spillet.
  * Om ikke vi har tid, er det et løsningsforslag

Vi kan gå igjennom LF helt til slutt.

---
class: center middle

# Kommentar?
Twitter *@mikaelbrevik*!

Kode/Slides: https://github.com/mikaelbr/webkom-kurs2015
