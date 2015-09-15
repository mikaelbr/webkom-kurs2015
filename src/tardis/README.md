# Omniscient.js TARDIS

A POC of a time traveling device for debugging and testing purposes. Pluggable in any application
using Omniscient.js, Immstruct and the architecture as described on the [Omniscient.js Homepage](http://omniscientjs.github.io/guides/01-simpler-ui-reasoning-with-unidirectional/).

## Usage

```js
var tardis = require('./tardis');
tardis(structure, '#tardis');
// structure: Application state created by immstruct
// '#tardis': DOM Entry point (string selector or DOM object)
```


## Running example

See running [example of TARDIS](http://git.mikaelb.net/bekk-tardis/example) or in [replay mode](http://git.mikaelb.net/bekk-tardis/example/replay.html)
