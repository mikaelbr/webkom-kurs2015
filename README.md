# Webkom Kickoff 2015

Ambisiøst introduksjonskurs til, alt eller noe av det følgende

  1. Bruk av ES2015 i React apps
  2. Funksjonell programmering i UI
  3. Unidirectional Flow for React og System som en funksjon av tilstand
  4. Immutabel data

## Krav og installasjon

For å kjøre dette kurset kreves det følgende:

 * Node.js
 * NPM (følger i de fleste tilfeller med Node.js)
 * Tilgang på kommandolinje/terminal

For å komme opp og kjøre må man installere avhengigheter.

Kjør det følgende fra prosjekt-rootmappen i terminalen:

```shell
$ npm install
```

## Agenda

1. Litt introduksjon
  1. Kjapt om ES6
  2. Stateless React Components og bruk på funksjonelle måter
  3. Omniscient.js
  4. Assignments 1 og 2
2. Immutabel
  1. Immutable.js
  2. Immstruct
  3. Assignments 3
3. Render Loop
4. Actions
5. Case: tic-tac-toe

## Hjelp

Dersom det er noe du sliter med, kan det være at det står noe relevant
informasjon her:

* [`./help/ES6-cheatsheet.md`](./help/ES6-cheatsheet.md): Hjelp til ES6/ES2015
* [`./help/Cursor.md`](./help/Cursor.md): Hjelp til Immutable.js, Cursors og Immstruct

## Assignments

For å verifisere at alle oppgaver er løst kan du kjøre følgende kommando:

```shell
$ npm run test-assignments
```

Eller kjøre de individuelt:

```shell
$ npm run test-1
```

```shell
$ npm run test-2
```

```shell
$ npm run test-3
```


## Case: tic-tac-toe

Kildekoden ligger i `./src`. Her er `actions.js` og `main`.js ikke utfylt. I
første runde trenger man ikke fylle ut actions. Dette kan komme som steg 2 for
å legge på funksjonalitet som klikk, sjekke om det er en vinner etc.

Det er mye å gjøre, så mange rekker sikkert ikke å løse `actions.js` selv. I
såfall ligger det et forslag til en ferdig løsning under `./help/`. Dette er
løst på en funksjonell måte, men det må ikke være det i din løsning.

### Fremgangsmåte

1. Fyll ut View komponentenene etter beskrivelsen i `./src/main.js` (se hvordan
  den er brukt i `./src/app.js`). I `./src/app.js` ser man også render-loopen.
2. Test ved å bygge:
  ```shell
  $ npm run build
  ```
  Man kan kjøre watching (bygger ved filendringer) ved å kjøre
  ```shell
  $ npm run watch
  ```
  Etter det er bygd er det bare å åpne `index.html` i en nettleser. Eller man
  kan kjøre opp en server:

  ```shell
  $ npm run serve
  ```
  For å så navigere til http://localhost:3000
3. Test ved å kjøre tester: Det er satt opp noen enkle tester på løsningen for
   å illustrere hvordan man kan teste slike systemer og for å hjelpe til med
   implementeringen. Kjør tester:

   ```shell
   $ npm test
   ```
   Kan kjøre tester automatisk ved endring ved å bruke kommando:

   ```shell
   $ npm test -- -w
   ```
4. Legg på interaksjon:
  * Dersom man får tid: Implementer `actions.js`
  * Dersom dårlig tid eller lite lyst, kopier `actions.js` fra `./help` og
     bruk funksjonene i `./src/main.js`.
