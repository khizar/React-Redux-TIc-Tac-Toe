export const SET_INITIAL_STATE = 'SET_INITIAL_STATE';
export const NEXT_TURN = 'NEXT_TURN';
export const WRITE_AT_CELL = 'WRITE_AT_CELL';
export const RESTART_GAME = 'RESTART_GAME';

export const INITIAL_STATE = {
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
};

export function restartGame() {
    return {
        type: RESTART_GAME,
        state: {
            round: 1,
            turn: 1,
            board: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]
        }
    };
}

export function setState(state = INITIAL_STATE) {
    return {
        type: SET_INITIAL_STATE,
        state
    };
}

export function nextTurn() {
    return {
        type: NEXT_TURN
    };
}

export function writeAtCell(cell) {
    return {
        type: WRITE_AT_CELL,
        cell
    };
}
