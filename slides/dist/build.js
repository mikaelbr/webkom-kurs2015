(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

setupSlideshow();

function setupSlideshow() {
  var data = "class: front-page\n\n# Kurs i moderne webarkitektur\n\nMikael Brevik\n\n18/09/2015\n\n---\nclass: agenda\n\n# Agenda: Del 1\n\n* Kjapt om ES6\n* Funksjonell programmering og Stateless React Components\n* Omniscient.js (Memoization)\n* Oppgaver 1 og 2\n\n---\nclass: agenda\n\n# Agenda: Del 2\n\n* Immutabel data (Immutable.js)\n* Immstruct\n* Oppgaver 3\n* Pause\n\n---\nclass: agenda\n\n# Agenda: Del 3\n\n* Render loop\n* Actions\n* Case: `tic-tac-toe`\n\n---\nclass: center middle\n\n# ES6 i React\n## De mest vanlige features for UIs\n\n---\n\n# ES6: Fat-arrows\n\n```js\nvar double = function (n) {\n  return n * 2;\n};\n```\n\n```js\nvar double = (n) => n * 2;\n```\n\n---\n\n# ES6: Fat-arrows\n\n```js\nvar myObject = {\n  logger() {\n    // Would NOT work\n    var log = function (n) {\n      console.log(this.something(n));\n    };\n    log('Hello!');\n    log('World!');\n  },\n\n  something (message) {\n    return `Logging: ${message}`;\n  }\n};\n```\n---\n\n# ES6: Fat-arrows\n\n```js\nvar myObject = {\n  logger() {\n    // Would work just fine, this is bound to the `this` of logger\n    var log = (n) => console.log(this.something(n));\n    log('Hello!');\n    log('World!');\n  },\n\n  something (message) {\n    return `Logging: ${message}`;\n  }\n};\n```\n\n---\n\n# ES6: Destructuring\n\n```js\n// Only fetching some values from an array\nvar [a, , b] = [1, 2, 3];\nconsole.log(a, b);\n// => 1 3\n\n// Fetch from inside object\nvar {user: x} = {user: 5};\nconsole.log(x);\n// => 5\n\n// Or as a shorthand\nvar {user} = {user: 5};\nconsole.log(user);\n// => 5\n```\n\n---\n\n# ES6: Destructuring\n\n```js\nfunction getUser ({user}) {\n  return user;\n}\n\ngetUser({\n  user: 5\n});\n// => 5\n```\n\n---\n\n# ES6: Enhanced Object Literals\n## Shorthand properties\n\n```js\nvar user = 5;\n\n// Instead of\ngetUser({ user: user });\n\n// You can do\ngetUser({ user });\n```\n\n---\n# ES6: Enhanced Object Literals\n\n## Shorthand methods & Template literals\n\n```js\nvar myObject = {\n  something (message) {\n    return `Logging: ${message}`;\n  }\n};\n```\n\n---\n\n# ES6: Scopes\n\n```js\nvar foo = '3';\n\n{\n  let foo = '1';\n}\n\n{\n  let foo = '2';\n}\n\n\nconsole.log('foo', foo);\n// => 3\n```\n\n---\n\n# ES6: Scopes\n\n```js\nlet foo = 'foo';\nfoo = 'bar'; // Works as expected\n\nconst bar = 'bar';\nbar = 'foo'; // Won't change. `bar` is still 'bar'\n```\n\n---\nclass: center middle\n\n# ES6\n## Les mer i vedlagt cheatsheet\n\n---\nclass: center middle\n\n# Stateless React\n## React på en funksjonell måte\n\n\n---\n\n# Stateless React\n\n```js\nf(x) -> 2x\nf(2) = 4\nf(2) = 4\nf(2) = 4\nf(2) = 5 (WTF???)\n```\n\n---\n\n# Stateless React\n\n## Nytt fra React 0.14\n\nMå ha rene komponenter som ikke påvirker noe annet enn det de returnerer!\n\n```js\nvar MyComponent = function () {\n  return <h1>My Component!</h1>;\n}\n```\n\nEller med ES6\n\n```js\nvar MyComponent = () => <h1>My Component!</h1>;\n```\n\n---\n\n# Stateless React\n\n## Med input\n\n```js\nvar MyComponent = (props) => <h1>{props.title}</h1>;\n\nReactDOM.render(MyComponent({\n  title: 'Hello World!'\n}), document.querySelector('#app'));\n```\n---\n\n# Stateless React\n\n## Nøsting er ingen problem\n\n```js\nvar MyComponent = (props) => <h1>{props.title}</h1>;\nvar App = (props) => (\n  <div className=\"my-app\">\n    <MyComponent title={props.title} />\n    <p>This is still a pure component</p>\n  </div>\n);\n\nReactDOM.render(App({\n  title: 'Hello World!'\n}), document.querySelector('#app'));\n```\n\n---\nclass: center middle\n\n<svg width=\"60%\" height=\"80%\" viewBox=\"0 0 600 225\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"xMinYMin meet\">\n  <g>\n    <title>Layer 1</title>\n    <g class=\"active-path\">\n      <polyline class=\"graphEdge\" id=\"svg_18\" points=\"397.74151611328125,401.7062072753906 422.5,418.2488708496094 447.25848388671875,434.7915344238281\" stroke=\"#fff\" stroke-width=\"5\" fill=\"none\" stroke-dasharray=\"5,5\"></polyline>\n      <polyline class=\"graphEdge\" id=\"svg_17\" points=\"311.259521484375,273.74151611328125 331.488037109375,312.5 351.7165832519531,351.25848388671875\" stroke=\"#fff\" stroke-width=\"5\" fill=\"none\" stroke-dasharray=\"5,5\"></polyline>\n      <polyline class=\"graphEdge\" id=\"svg_16\" points=\"356.25994873046875,193.2415313720703 336.79949951171875,215.75 317.3390197753906,238.25848388671875\" stroke=\"#fff\" stroke-width=\"5\" fill=\"none\" stroke-dasharray=\"5,5\"></polyline>\n      <polyline class=\"graphEdge\" id=\"svg_14\" points=\"299.64306640625,110.64816284179688 325.7007751464844,125.7142562866211 351.75848388671875,140.7803497314453\" stroke=\"#fff\" stroke-width=\"5\" fill=\"none\" stroke-dasharray=\"5,5\"></polyline>\n      <circle fill=\"#cccccc\" stroke-width=\"0\" cx=\"385.00001\" cy=\"160\" r=\"33.24153\" id=\"svg_1\" class=\"graphNode\" stroke=\"#fff\"></circle>\n      <circle fill=\"#cccccc\" stroke-width=\"0\" cx=\"301.99999\" cy=\"256\" r=\"17.74152\" id=\"svg_3\" class=\"graphNode\" stroke=\"#fff\"></circle>\n      <circle fill=\"#cccccc\" stroke-width=\"0\" cx=\"367.49998\" cy=\"381.5\" r=\"30.24152\" id=\"svg_5\" class=\"graphNode\" stroke=\"#fff\"></circle>\n      <circle fill=\"#cccccc\" stroke-width=\"0\" cx=\"478.99998\" cy=\"456\" r=\"31.74152\" id=\"svg_6\" class=\"graphNode\" stroke=\"#fff\"></circle>\n    </g>\n    <g>\n        <polyline class=\"graphEdge graphEdge--fade\" id=\"svg_22\" points=\"122.91644287109375,282.74151611328125 89.65998840332031,326.5 56.403541564941406,370.25848388671875\" stroke=\"#fff\" stroke-width=\"5\" fill=\"none\" stroke-dasharray=\"5,5\"></polyline>\n        <polyline class=\"graphEdge graphEdge--fade\" id=\"svg_21\" points=\"149.36302185058594,282.74151611328125 145.17288208007812,323.5 140.98275756835938,364.25848388671875\" stroke=\"#fff\" stroke-width=\"5\" fill=\"none\" stroke-dasharray=\"5,5\"></polyline>\n        <polyline class=\"graphEdge graphEdge--fade\" id=\"svg_20\" points=\"177.00497436523438,282.74151611328125 207.52903747558594,335 238.0531005859375,387.25848388671875\" stroke=\"#fff\" stroke-width=\"5\" fill=\"none\" stroke-dasharray=\"5,5\"></polyline>\n        <polyline class=\"graphEdge graphEdge--fade\" id=\"svg_19\" points=\"217.244140625,132.64306640625 197.04708862304688,167.45077514648438 176.8500213623047,202.25848388671875\" stroke=\"#fff\" stroke-width=\"5\" fill=\"none\" stroke-dasharray=\"5,5\"></polyline>\n        <polyline class=\"graphEdge graphEdge--fade\" id=\"svg_15\" points=\"417.0819396972656,193.2415313720703 428.6715087890625,205.25 440.2610778808594,217.25848388671875\" stroke=\"#fff\" stroke-width=\"5\" fill=\"none\" stroke-dasharray=\"5,5\"></polyline>\n    </g>\n    <g>\n      <circle fill=\"#cccccc\" stroke-width=\"0\" cx=\"467.99998\" cy=\"246\" r=\"28.74152\" id=\"svg_4\" class=\"graphNode graphNode--fade\" stroke=\"#fff\"></circle>\n      <circle fill=\"#007fff\" stroke-width=\"0\" cx=\"247.5\" cy=\"80.5\" r=\"52.14306\" id=\"svg_2\" class=\"graphNode graphNode--blue\" stroke=\"#fff\"></circle>\n      <circle fill=\"#cccccc\" stroke-width=\"0\" cx=\"153.49999\" cy=\"242.5\" r=\"40.24152\" id=\"svg_7\" class=\"graphNode graphNode--fade\" stroke=\"#fff\"></circle>\n      <circle fill=\"#cccccc\" stroke-width=\"0\" cx=\"39.49999\" cy=\"392.5\" r=\"22.24152\" stroke=\"#fff\" id=\"svg_8\" class=\"graphNode graphNode--fade\"></circle>\n      <circle fill=\"#cccccc\" stroke-width=\"0\" cx=\"136.99999\" cy=\"403\" r=\"38.74152\" id=\"svg_9\" class=\"graphNode graphNode--fade\" stroke=\"#fff\"></circle>\n      <circle fill=\"#cccccc\" stroke-width=\"0\" cx=\"248.99999\" cy=\"406\" r=\"18.74152\" id=\"svg_10\" class=\"graphNode graphNode--fade\" stroke=\"#fff\"></circle>\n    </g>\n  </g>\n</svg>\n\n---\n\n# Stateless React\n\n## Betyr at vi vil få forutsigbare views\n\n```js\nReactDOM.render(App({\n  title: 'Hello World!'\n}), document.querySelector('#app'));\n```\n\n```js\nReactDOM.render(App({\n  title: 'Hello World!'\n}), document.querySelector('#app'));\n```\n\n```js\nReactDOM.render(App({\n  title: 'Hello World!'\n}), document.querySelector('#app'));\n```\n\n\n---\n\n# Stateless React\n\n## Hva med alle DOM-operasjonene?\n\nVirtual-DOM til React (og venner) tar seg av det!\n\n```js\n// Will output\nReactDOM.render(App({\n  title: 'Hello World!'\n}), document.querySelector('#app'));\n```\n\n```js\n// Will NOT output\nReactDOM.render(App({\n  title: 'Hello World!'\n}), document.querySelector('#app'));\n```\n\n```js\n// Will NOT output\nReactDOM.render(App({\n  title: 'Hello World!'\n}), document.querySelector('#app'));\n```\n\n---\n\n# Stateless React\n\n## Det gjør at vi kan tenke funksjonelt i UI programmering!\n\n```js\nconst Herolist = (heroes) =>\n  ['Wasp', 'Falcon', 'Harry Potter']\n    .concat(heroes || [])\n    .filter(isSuperHero)\n    .map((title) => <li>{title}</li>);\n\nconst HeroPlusWade = partial(Herolist, ['Wade Wilson']);\n\nReactDOM.render(\n  <ul>{Herolist()}</ul>,\n  document.querySelector('#app'));\n\n// Will only do DOM operations on changed data (additional item)\nReactDOM.render(\n  <ul>{HeroPlusWade()}</ul>,\n  document.querySelector('#app'));\n```\n---\n\n# Stateless React\n\nVi kan tenke på all view som en funksjon vi kaller dersom vi har ny tilstand.\n\n```js\nfunction renderMySystemWithState (heroes) {\n  const Herolist = heroes\n      .filter(isSuperHero)\n      .map((title) => <li>{title}</li>);\n\n  ReactDOM.render(\n    <ul>{Herolist()}</ul>,\n    document.querySelector('#app'));\n}\n\nrenderMySystemWithState(['Wasp']);\nrenderMySystemWithState(['Wasp']);\nrenderMySystemWithState(['Wasp', 'Falcon']);\nrenderMySystemWithState(['Wasp', 'Falcon', 'Dogpool']);\n```\n---\n\n# Stateless React\n\nSiden alle komponentene våre nå er frie for tilstand, betyr det at vi kan\nnår som helst reprodusere et gitt utgangspunkt, vi kan og hoppe frem og\ntilbake i tilstand.\n\n\n---\nclass: middle center\n\n# Men hva med ytelse?\n\n## Funksjonell programmering!\n\n---\n\n# Omniscient.js\n\nSelv om VDOM til React differ med faktisk DOM kan det være kostnadsfult\nå prøve å rendre hele treet.\n\n```js\nvar MyComponent = (props) => <h1>{props.title}</h1>;\nvar App = function (props) {\n  console.log('Tried to render me!');\n  return (<div className=\"my-app\">\n    <MyComponent title={props.title} />\n    <p>This is still a pure component</p>\n  </div>);\n};\n\n// Will actually render\nReactDOM.render(App({ title: 'Hello World!' }), el); //> Tried to render me!\n// Will not acutally render\nReactDOM.render(App({ title: 'Hello World!' }), el); //> Tried to render me!\nReactDOM.render(App({ title: 'Hello World!' }), el); //> Tried to render me!\n```\n---\n\n# Omniscient.js\n\nHvordan kan vi forbedre det? Memoization!\n\n```js\nvar MyComponent = (props) => <h1>{props.title}</h1>;\nvar App = function (props) {\n  console.log('Tried to render me!');\n  return (<div className=\"my-app\">\n    <MyComponent title={props.title} />\n    <p>This is still a pure component</p>\n  </div>);\n};\nvar MemoizedApp = memoize(App);\n\n// Will actually render\nReactDOM.render(MemoizedApp({ title: 'Hello World!' }), el); //> Tried to render me!\n// Will not acutally render, nor try to\nReactDOM.render(MemoizedApp({ title: 'Hello World!' }), el); //> NO OUTPUT\nReactDOM.render(MemoizedApp({ title: 'Hello World!' }), el); //> NO OUTPUT\n```\n\n---\nclass: center middle\n\n# Omniscient.js\n## React + Smart Memoization\n\n---\nclass: center middle\n\n![Omniscient.js](./assets/omniscient.png)\n\n---\n\n# Omniscient.js\n\n```js\nvar MyComponent = component((props) => <h1>{props.title}</h1>);\nvar App = component(function (props) {\n  console.log('Tried to render me!');\n  return (<div className=\"my-app\">\n    <MyComponent title={props.title} />\n    <p>This is still a pure component</p>\n  </div>);\n});\n\n// Will actually render\nReactDOM.render(App({ title: 'Hello World!' }), el); //> Tried to render me!\n// Will not acutally render, nor try to\nReactDOM.render(App({ title: 'Hello World!' }), el); //> NO OUTPUT\nReactDOM.render(App({ title: 'Hello World!' }), el); //> NO OUTPUT\n```\n\n---\n\n# Oppgaver 1 og 2\n\n## Last ned fra https://github.com/mikaelbr/webkom-kurs2015\n\nDu kan selv velge hvor mye ES6 og JSX du ønsker å bruke i oppgavene.\n\n**Oppgave 1: Lag Stateless Components**\n\n1. Make and render a single NameBox component\n2. Make and render a List components (list of NameBox)\n3. Pass dynamic list of NameBox components.\n\n\n**Oppgave 2: Lag Memoized Components**\n\n1. Make and render a single memoized NameBox component\n2. Make and render a List  memoized components (list of NameBox)\n3. Pass dynamic list of  memoized NameBox components.\n\n---\nclass: center middle\n\n# Del 2\n## Verdier og datastrukturer\n\n---\n\n# Immutable.js\n\n```js\nconst obj = Immutable.Map({ name: \"T'Challa\" });\nconst obj2 = obj.set('name', 'Black Panther');\nobj.get('name'); //=> T'Challa\nobj2.get('name'); //=> Black Panther\n```\n\n---\n\n# Immutable.js\n\n```js\nvar map1 = Immutable.Map({a:1, b:2, c:3});\nvar map2 = map1.set('b', 2);\nassert(map1 === map2); // no change\nvar map3 = map1.set('b', 50);\nassert(map1 !== map3); // change\n```\n\n---\n\n# Immutable.js\n\n```js\nvar list1 = Immutable.List.of(1, 2);\nvar list2 = list1.push(3, 4, 5);\nvar list3 = list2.unshift(0);\nvar list4 = list1.concat(list2, list3);\nassert(list1.size === 2);\nassert(list2.size === 5);\nassert(list3.size === 6);\nassert(list4.size === 13);\nassert(list4.get(0) === 1);\n```\n---\n\n# Immutable.js\n\n```js\nvar deep = Immutable.Map({ a: 1, b: 2, c: Immutable.List.of(3, 4, 5) });\ndeep.toObject() // { a: 1, b: 2, c: List [ 3, 4, 5 ] }\ndeep.toArray() // [ 1, 2, List [ 3, 4, 5 ] ]\ndeep.toJS() // { a: 1, b: 2, c: [ 3, 4, 5 ] }\nJSON.stringify(deep) // '{\"a\":1,\"b\":2,\"c\":[3,4,5]}'\n```\n\n---\n\n# Immstruct\n\nEt hjelpebibliotek på toppen av Immutable.js for å lytte på endringer.\n\n```js\nvar structure = immstruct({a:1, b:2, c:3});\nstructure.on('swap', function () {\n  console.log('Someone tried to change the immutable structure');\n});\n\nvar map1 = structure.cursor(); // <-- !!!\nvar map2 = map1.set('b', 10);\nvar map3 = map1.set('b', 50);\n```\n\n---\nclass: middle center\n\n# Cursors?!\n## Hva er det for noe?\n\n---\nclass: cover\nbackground-image: url(assets/wrapped.jpg)\n\n---\n\n# Immstruct\n\nCursors er for det meste transparant, så de kan behandles på samme måte som\nImmutable.js objekter.\n\n```js\nvar structure = immstruct([ 1, 2, 3 ]);\nvar immutableList = structure.current;\n\nvar cursor = structure.cursor();\n// cursor.inspect() => Cursor [ List [ 1, 2, 3 ] ]\n\ncursor.map((i) => console.log(i)); //=> 1, 2, 3\nimmutableList.map((i) => console.log(i)); //=> 1, 2, 3\n```\n\n---\n\n# Immstruct\n\nEnkelte ganger vil man derimot ha ut den underliggende dataen som cursoren\npeker på. Det kan gjøres med `.deref()`\n\n```js\nvar structure = immstruct({ a: { b: { c: 1 } } });\n\n// Make a cursor pointing at the value c from above\nvar cursor = structure.cursor(['a', 'b', 'c']);\n\n// Update the value at the cursor. As cursors are immutable,\n// this returns a new cursor that points to the new data\nvar newCursor = cursor.update((x) => x + 1);\n\n// We unwrap the cursor, by getting the data it is pointing at using deref\n// and see that the value of the old `cursor` to is still `1`\nconsole.log(cursor.deref()); //=> 1\n\n// `newCursor` points to the new data\nconsole.log(newCursor.deref()); //=> 2\n```\n\n---\n\n# Oppgaver 3\n\n## Last ned fra https://github.com/mikaelbr/webkom-kurs2015\n\nDu kan selv velge hvor mye ES6 og JSX du ønsker å bruke i oppgavene.\n\n* Oppgave 3.1: Bruk Immutable.js\n* Oppgave 3.2: Bruk Immstruct til å lage cursors\n* Oppgave 3.3: Bruk Cursors med React\n\n---\nclass: center middle\n\n# Pause\n\n\n---\nclass: center middle\n\n# Render loop\n\n## React + Data + Change Subscriber\n\n---\n\n# Render loop\n\nVi vet at vi kan bare kalle hele render funksjonen på nytt med React, og vi\nvet nå hvordan vi kan ha data og lytte på endringer. Om vi kombinerer det\nfår vi et kontinuerlig oppdatert forutsigbart system!\n\n```js\nvar App = ({title}) => <div><h1>{title.deref()}</h1></div>;\n\nvar structure = immstruct({ title: 'Hello World!' });\n\nvar render = () => ReactDOM.render(App({ title: structure.cursor('title') }), el);\n\n// When changed\nstructure.on('swap', render);\n// Initial render\nrender();\n\n// Will update view reactivly\nstructure.cursor().set('message', 'Something!');\n```\n\n---\n\n# Render loop\n\nSiden vi er i et tre, vil endringene automatisk oppdateres på tvers, uten\nat komponentene kjenner til hverandre, eller at de har noen kobling mellom seg.\n\n```js\nvar Title = ({title}) => <h1>{title.deref()}</h1>;\nvar SmallTitle = ({title}) => <h2>{title.deref().toLowerCase()}</h2>;\nvar App = ({title}) => <div>\n  <Title title={title} /><SmallTitle title={title} />\n</div>;\n\nvar structure = immstruct({ title: 'Hello World!' });\n\nvar render = () => ReactDOM.render(App({ title: structure.cursor('title') }), el);\nstructure.on('swap', render);\nrender();\n\n// Will be reflected both places!\nstructure.cursor().set('message', 'Something!');\n```\n\n---\nclass: middle center\n\n# Hvordan strukturere logikk?\n## \"Actions\"\n\n---\n\n# Actions\n\nFunksjoner som er ment til å endre på data og gjøre logikken i applikasjoner på\ndenne måten er ofte referert til som Actions.\n\nMan kan fint ha vanlige rene funksjoner som gjør dette.\n\n```js\nvar structure = immstruct({ title: 'Hello World!' });\n\n// Actions\nvar change = (state) => state.set('message', 'something');\n\n// Usage of an action.\nvar Title = ({title}) =>\n  <h1 onClick={() => change(title)}>{title.deref()}</h1>;\n```\n\nDisse funksjonene kan være lagret i egne filer som gjør de testbare!\n\n---\n\n# Actions\n\nMen noen ganger ønsker man å kunne f.eks sende med actions som en del av\nkontrakten til komponentene. Så den får inn alt den trenger for å gjøre det\nden skal gjøre. Da kan det være greit å strukturere actions på en spesifikk\nmåte.\n\n```js\nvar myActions = actions\n  .register(function double (point) {\n    return point.update(current => current * 2);\n  })\n  .register(function plus2 (point) {\n    return point.update(current => current + 2);\n  });\n\n// Usage:\nmyActions.invoke('double', someValueCursor);\nmyActions.invoke('plus2', someValueCursor);\n\n// Or even compose:\nvar doubledPlus2 = myActions.createComposedInvoker('double', 'plus2');\nvar newValue = doubledPlus2(someValueCursor);\n```\n---\n\n# Actions\n\nKan brukes som vanlige funksjoner også:\n\n```js\n// Same myActions as before:\nvar {double, plus2} = myActions.fn;\n\ndouble(someValueCursor);\nplus2(someValueCursor);\n\n// Can even listen to when changed\nmyActions.subscribe(() => console.log('Action triggered'));\n```\n\n---\n\n# Actions\n\nSom argumenter til komponenter: Ettersom vi har en \"pakke\" med actions, vi kan\nsende de rundt.\n\n```js\nvar myActions = actions.register(function double (point) {\n  return point.update(current => current * 2);\n}):\nvar NumberBox = ({num, actions: {double}}) =>\n  <h1 onClick={() => double(num)}>{num.deref()}</h1>;\n\nvar structure = immstruct({ number: 3 });\nvar render = () => ReactDOM.render(NumberBox({\n    title: structure.cursor('number'),\n    actions: myActions.fn\n}), el);\n\nstructure.on('swap', render);\nrender();\n```\n\n---\nclass: center middle\n\n# Case: `tic-tac-toe`\n## Skal lage [tre på rad](http://git.mikaelb.net/bekk-tardis/example/)\n\n---\n\n# tic-tac-toe\n\nI grove trekk er det som må gjøres:\n\n1. Lage komponenter for følgende:\n  1. Celle\n  2. Brettet\n  4. Boks med info om vinner\n  5. Hele spillet\n2. Lage actions for logikken av spillet.\n  * Om ikke vi har tid, er det et løsningsforslag\n\nVi kan gå igjennom LF helt til slutt.\n\n---\nclass: center middle\n\n# Kommentar?\nTwitter *@mikaelbrevik*!\n\nKode/Slides: https://github.com/mikaelbr/webkom-kurs2015\n";
  document.querySelector('#source').innerHTML = data;

  var slideshow = remark.create({
    ratio: '16:9',
    highlightStyle: 'monokai'
  });
}

},{}]},{},[1]);