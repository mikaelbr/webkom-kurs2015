'use strict';

var React = require('react');
var component = require('omniscient');
var immutable = require('immutable');
var immstruct = require('immstruct');
var markupify = require('./markupify');

var internalState = immstruct({
  currentRevision: 1,
  open: false,
  stateOpen: false,
  stateHistory: false,
});

var {div, h1, input, button, a} = React.DOM;

function undo (structure, steps) {
  var oldStructure = structure.current;
  var newStructure = structure.undo(steps);
  return structure.forceHasSwapped(newStructure, oldStructure, ['was-forced']);
}

function redo (structure, steps) {
  var oldStructure = structure.current;
  var newStructure = structure.redo(steps);
  return structure.forceHasSwapped(newStructure, oldStructure, ['was-forced']);
}

var Slider = component(function SliderComponent ({ tardisData, history, structure }) {
  var historyLength = history.size;
  var currentRevision = tardisData.get('currentRevision');
  var isStateOpen = tardisData.get('stateOpen');

  function stepBack() {
    undo(structure, 1);
    tardisData.update('currentRevision',
      (curr) => curr-1 < 1 ? curr : --curr);
  }

  function stepNext () {
    redo(structure, 1);
    tardisData.update('currentRevision',
      (curr) => curr+1 > historyLength ? curr : ++curr);
  }

  function changeSlider (e) {
    e.preventDefault();

    var newRevision = e.currentTarget.value;

    if (newRevision < 1 || newRevision > historyLength) {
      return;
    }

    if (newRevision < currentRevision) {
      undo(structure, currentRevision - newRevision);
    } else {
      redo(structure, newRevision - currentRevision);
    }

    tardisData.set('currentRevision', newRevision);
  }

  return div({ className: 'tardis-inputs' },
    button({
        className: 'button button--copy',
        onClick: () => tardisData.update('stateOpen', (curr) => !curr)
      }, `${isStateOpen ? 'Close' : 'Open'} State`),
    button({
      className: 'button button--back',
      onClick: stepBack
    }, 'Back'),
    input({
      className: 'revision revision--number',
      type: 'number',
      min: String(1),
      max: String(historyLength),
      value: currentRevision,
      onChange: changeSlider
    }),
    button({
      className: 'button button--next',
      onClick: stepNext
    }, 'Next')
  )
});


var StateViewer = component(function StateViewer({ tardisData, history, structure }) {
  var isStateOpen = tardisData.get('stateOpen');
  var isStateHistory = tardisData.get('stateHistory');
  var html = markupify(
    (isStateHistory ? history : structure.current).toJSON()
  );

  return div({
      className: `state-viewer ${isStateOpen ? 'open' : 'close'}`
    },
    button({
      className: 'button button--small',
      onClick: () => tardisData.update('stateHistory', (curr) => !curr)
    }, `Show ${isStateHistory ? 'current state' : 'history'}`),
    div({
      contentEditable: true,
      onKeyPress: function (e) {
        if (isStateHistory) {
          e.preventDefault();
        }
      },
      onKeyUp: function (e) {
        if (isStateHistory) {
          return e.preventDefault();
        }
        try {
          var newState = immutable.fromJS(JSON.parse(e.currentTarget.textContent));
          var cursor = structure.cursor();
          if (!immutable.is(cursor, newState)) {
            cursor.update(() => newState);
          }
        } catch (error) {
          console.error(error);
        }
      },
      dangerouslySetInnerHTML: {__html: html}
    })
  );
});

var Tardis = component(function TardisComponent ({ tardisData, history, structure }) {
  var isOpen = tardisData.get('open');

  return div({
    className: `tardis  ${isOpen ? 'open' : 'close'}`
  },
    h1({}, 'T.A.R.D.I.S'),
    a({
      onClick: () => tardisData.update('open', (curr) => !curr),
      className: 'open-close-button open',
    }, isOpen ? 'Close' : 'Open'),
    Slider({ structure, history, tardisData }),
    StateViewer({ tardisData, history, structure })
  )
});

module.exports = function (structure, domEntry) {
  if (typeof domEntry === 'string') {
    domEntry = document.querySelector(domEntry);
  }

  internalState.on('swap', render);
  structure.on('swap', updateRevisionDecorator(render));

  render();

  function render (n, o, path, internalCursor) {

    React.render(Tardis({
      history: structure.history,
      tardisData: internalCursor || internalState.cursor(),
      structure
    }), domEntry);
  }

  function updateRevisionDecorator (fn) {
    return function (...args) {
      var [,,path] = args;
      var internalCursor = internalState.cursor();
      if ((path || []).indexOf('was-forced') === -1) {
        internalCursor = internalCursor.set('currentRevision', structure.history.size);
      }

      return fn(...args, internalCursor);
    };
  }
};
