import { fromJS } from 'immutable';
import test from 'ava';
import coreReducer from '../../src/reducers/coreReducer';
import {
    restartGame, setState, nextTurn, writeAtCell
} from '../../src/actions/coreActions';

const initialState = fromJS({
    players: [
        { id: 1, score: 0 },
        { id: 2, score: 0 }
    ],
    round: 1,
    turn: 1,
    board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
});

test('initialization of the state', t => {
    const nextState = coreReducer(undefined, { type: '' });

    t.true(nextState.equals(fromJS({})));
});


test('handles SET_INITIAL_STATE without providing a state', t => {
    const nextState = coreReducer(initialState, setState());

    t.true(nextState.equals(initialState));
});

test('handles SET_INITIAL_STATE', t => {
    const nextState = coreReducer(initialState, setState(initialState));

    t.true(nextState.equals(initialState));
});

test('handles NEXT_TURN and increases round and change turns', t => {
    let nextState = coreReducer(initialState, nextTurn());

    t.true(nextState.equals(
        fromJS({
            players: [
                { id: 1, score: 0 },
                { id: 2, score: 0 }
            ],
            round: 2,
            turn: 2,
            board: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]
        })));

    nextState = coreReducer(nextState, nextTurn());

    t.true(nextState.equals(
        fromJS({
            players: [
                { id: 1, score: 0 },
                { id: 2, score: 0 }
            ],
            round: 3,
            turn: 1,
            board: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]
        })));
});

test('handles NEXT_TURN and set turn to 0 if there is a winner', t => {
    const tInitialState = fromJS({
        players: [
            { id: 1, score: 0 },
            { id: 2, score: 0 }
        ],
        round: 1,
        turn: 1,
        winner: 1,
        board: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
    });

    const nextState = coreReducer(tInitialState, nextTurn());

    t.true(nextState.equals(
        fromJS({
            players: [
                { id: 1, score: 0 },
                { id: 2, score: 0 }
            ],
            round: 1,
            turn: 0,
            winner: 1,
            board: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]
        })));
});

test('handles WRITE_AT_CELL', t => {
    let tInitialState = fromJS({
        players: [
            { id: 1, score: 0 },
            { id: 2, score: 0 }
        ],
        round: 1,
        turn: 1,
        board: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
    });

    let nextState = coreReducer(tInitialState, writeAtCell([0, 0]));

    // Check that we wrote on the right cell block
    t.true(nextState.equals(
        fromJS({
            players: [
                { id: 1, score: 0 },
                { id: 2, score: 0 }
            ],
            round: 1,
            turn: 1,
            board: [
                [1, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]
        })));

    tInitialState = fromJS({
        players: [
            { id: 1, score: 0 },
            { id: 2, score: 0 }
        ],
        round: 1,
        turn: 0,
        board: [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0]
        ]
    });

    nextState = coreReducer(tInitialState, writeAtCell([0, 0]));

    // Check that if turn equals to 0 , nobody can't write on a cell block
    t.true(nextState.equals(
        fromJS({
            players: [
                { id: 1, score: 0 },
                { id: 2, score: 0 }
            ],
            round: 1,
            turn: 0,
            board: [
                [0, 0, 0],
                [0, 1, 0],
                [0, 0, 0]
            ]
        })));

    tInitialState = fromJS({
        players: [
            { id: 1, score: 0 },
            { id: 2, score: 0 }
        ],
        round: 5,
        turn: 1,
        board: [
            [1, 2, 2],
            [0, 1, 0],
            [0, 0, 1]
        ]
    });

    nextState = coreReducer(tInitialState, writeAtCell([0, 0]));

    // Check that if round is greater than 5, we will call the checkWinOrDraw function
    t.true(nextState.equals(
        fromJS({
            players: [
                { id: 1, score: 1 },
                { id: 2, score: 0 }
            ],
            round: 5,
            turn: 1,
            winner: 1,
            board: [
                [1, 2, 2],
                [0, 1, 0],
                [0, 0, 1]
            ]
        })));
});

test('handles WRITE_AT_CELL and checks for a winner or a draw', t => {
    let tInitialState = fromJS({
        players: [
            { id: 1, score: 0 },
            { id: 2, score: 0 }
        ],
        round: 9,
        turn: 1,
        board: [
            [1, 2, 1],
            [2, 2, 1],
            [1, 1, 2]
        ]
    });

    let nextState = coreReducer(tInitialState, writeAtCell([0, 0]));

    // Check that if its round 9 we have a Draw and we set winner to 0
    t.true(nextState.equals(
        fromJS({
            players: [
                { id: 1, score: 0 },
                { id: 2, score: 0 }
            ],
            round: 9,
            turn: 1,
            winner: 0,
            board: [
                [1, 2, 1],
                [2, 2, 1],
                [1, 1, 2]
            ]
        })));

    // ================================================================ \\

    tInitialState = fromJS({
        players: [
            { id: 1, score: 0 },
            { id: 2, score: 0 }
        ],
        round: 5,
        turn: 1,
        board: [
            [1, 2, 0],
            [0, 1, 0],
            [0, 0, 2]
        ]
    });

    nextState = coreReducer(tInitialState, writeAtCell([0, 2]));

    // Check that we call checkWinOrDraw but we don't have a winner or a draw
    t.true(nextState.equals(
        fromJS({
            players: [
                { id: 1, score: 0 },
                { id: 2, score: 0 }
            ],
            round: 5,
            turn: 1,
            board: [
                [1, 2, 1],
                [0, 1, 0],
                [0, 0, 2]
            ]
        })));

    // ================================================================ \\

    tInitialState = fromJS({
        players: [
            { id: 1, score: 0 },
            { id: 2, score: 0 }
        ],
        round: 6,
        turn: 2,
        board: [
            [2, 2, 0],
            [1, 1, 0],
            [0, 0, 1]
        ]
    });

    nextState = coreReducer(tInitialState, writeAtCell([0, 2]));

    // Check for horizontal win
    t.true(nextState.equals(
        fromJS({
            players: [
                { id: 1, score: 0 },
                { id: 2, score: 1 }
            ],
            round: 6,
            turn: 2,
            winner: 2,
            board: [
                [2, 2, 2],
                [1, 1, 0],
                [0, 0, 1]
            ]
        })));

    // ================================================================ \\

    tInitialState = fromJS({
        players: [
            { id: 1, score: 0 },
            { id: 2, score: 0 }
        ],
        round: 6,
        turn: 2,
        board: [
            [2, 2, 1],
            [2, 1, 0],
            [0, 1, 0]
        ]
    });

    nextState = coreReducer(tInitialState, writeAtCell([2, 0]));

    // Check for vertical win
    t.true(nextState.equals(
        fromJS({
            players: [
                { id: 1, score: 0 },
                { id: 2, score: 1 }
            ],
            round: 6,
            turn: 2,
            winner: 2,
            board: [
                [2, 2, 1],
                [2, 1, 0],
                [2, 1, 0]
            ]
        })));

    // ================================================================ \\

    tInitialState = fromJS({
        players: [
            { id: 1, score: 0 },
            { id: 2, score: 0 }
        ],
        round: 6,
        turn: 1,
        board: [
            [1, 2, 2],
            [0, 1, 0],
            [0, 0, 0]
        ]
    });

    nextState = coreReducer(tInitialState, writeAtCell([2, 2]));

    // Check for diagonal win
    t.true(nextState.equals(
        fromJS({
            players: [
                { id: 1, score: 1 },
                { id: 2, score: 0 }
            ],
            round: 6,
            turn: 1,
            winner: 1,
            board: [
                [1, 2, 2],
                [0, 1, 0],
                [0, 0, 1]
            ]
        })));

    // ================================================================ \\

    tInitialState = fromJS({
        players: [
            { id: 1, score: 0 },
            { id: 2, score: 0 }
        ],
        round: 6,
        turn: 1,
        board: [
            [1, 2, 1],
            [0, 0, 2],
            [1, 0, 2]
        ]
    });

    nextState = coreReducer(tInitialState, writeAtCell([1, 1]));

    // Check for anti diagonal win
    t.true(nextState.equals(
        fromJS({
            players: [
                { id: 1, score: 1 },
                { id: 2, score: 0 }
            ],
            round: 6,
            turn: 1,
            winner: 1,
            board: [
                [1, 2, 1],
                [0, 1, 2],
                [1, 0, 2]
            ]
        })));
});

test('handles RESTART_GAME', t => {
    const nextState = coreReducer(initialState, restartGame());

    t.true(nextState.equals(
        fromJS({
            players: [
                { id: 1, score: 0 },
                { id: 2, score: 0 }
            ],
            round: 1,
            turn: 1,
            board: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]
        })));
});

test('handles Default state', t => {
    const action = {
        type: 'SOME_UNDEFINED_ACTION',
        test: 'data'
    };

    const nextState = coreReducer(initialState, action);

    t.true(nextState.equals(initialState));
});
