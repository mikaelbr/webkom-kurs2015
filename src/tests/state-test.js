'use strict';

var assert = require('assert');
var Immutable = require('immutable');
var { findWinner } = require('../actions').fn;

describe('history', function () {

  var history = Immutable.fromJS(getHistory());
  var expectedResults = Immutable.Repeat(false, 9).concat('No one');

  history.forEach(function (state, key) {
    var expected = expectedResults.get(key)
    it(`should have move ${key} ${!expected ? 'not return' : 'return "no body" as'} a winner`, function () {
      assert.equal(findWinner(state.get('board')), expected);
    });
  });
});

// Paste in history here.
function getHistory () {
  return [
    {
        board: [
            [
                "",
                "",
                ""
            ],
            [
                "",
                "",
                ""
            ],
            [
                "",
                "",
                ""
            ]
        ]
    },
    {
        board: [
            [
                "x",
                "",
                ""
            ],
            [
                "",
                "",
                ""
            ],
            [
                "",
                "",
                ""
            ]
        ]
    },
    {
        board: [
            [
                "x",
                "o",
                ""
            ],
            [
                "",
                "",
                ""
            ],
            [
                "",
                "",
                ""
            ]
        ]
    },
    {
        board: [
            [
                "x",
                "o",
                "x"
            ],
            [
                "",
                "",
                ""
            ],
            [
                "",
                "",
                ""
            ]
        ]
    },
    {
        board: [
            [
                "x",
                "o",
                "x"
            ],
            [
                "",
                "o",
                ""
            ],
            [
                "",
                "",
                ""
            ]
        ]
    },
    {
        board: [
            [
                "x",
                "o",
                "x"
            ],
            [
                "",
                "o",
                ""
            ],
            [
                "",
                "x",
                ""
            ]
        ]
    },
    {
        board: [
            [
                "x",
                "o",
                "x"
            ],
            [
                "o",
                "o",
                ""
            ],
            [
                "",
                "x",
                ""
            ]
        ]
    },
    {
        board: [
            [
                "x",
                "o",
                "x"
            ],
            [
                "o",
                "o",
                "x"
            ],
            [
                "",
                "x",
                ""
            ]
        ]
    },
    {
        board: [
            [
                "x",
                "o",
                "x"
            ],
            [
                "o",
                "o",
                "x"
            ],
            [
                "",
                "x",
                "o"
            ]
        ]
    },
    {
        board: [
            [
                "x",
                "o",
                "x"
            ],
            [
                "o",
                "o",
                "x"
            ],
            [
                "x",
                "x",
                "o"
            ]
        ]
    }
];
}
