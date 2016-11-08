import { Map } from 'immutable';
import { SET_INITIAL_STATE, NEXT_TURN, WRITE_AT_CELL, RESTART_GAME } from '../actions/coreActions';

function setState(state, newState) {
    return state.delete('winner').merge(newState);
}

function nextTurn(state) {
    if (state.has('winner')) {
        return state.set('turn', 0);
    }

    const firstPlayer = state.get('players').first();
    const secondPlayer = state.get('players').last();

    const newState = state.set('round', state.get('round') + 1);

    if (newState.get('turn') === firstPlayer.get('id')) {
        return newState.set('turn', secondPlayer.get('id'));
    }
    return newState.set('turn', firstPlayer.get('id'));
}

function checkWinOrDraw(state, round, board, playedCell, turn) {
    if (round === 9) {
        return state.set('winner', 0);
    }

    let foundAwinner = false;
    const x = playedCell[0];
    const y = playedCell[1];

    // check col
    for (let i = 0; i < 3; i++) {
        if (board.get(x).get(i) !== turn) {
            break;
        }
        if (i === 2) {
            foundAwinner = true;
        }
    }

    // check row
    for (let i = 0; i < 3; i++) {
        if (board.get(i).get(y) !== turn) {
            break;
        }
        if (i === 2) {
            foundAwinner = true;
        }
    }

    // check diagonal
    if (x === y) {
        for (let i = 0; i < 3; i++) {
            if (board.get(i).get(i) !== turn) {
                break;
            }
            if (i === 2) {
                foundAwinner = true;
            }
        }
    }

    // check anti diagonal
    for (let i = 0; i < 3; i++) {
        if (board.get(i).get(2 - i) !== turn) {
            break;
        }
        if (i === 2) {
            foundAwinner = true;
        }
    }

    if (foundAwinner) {
        const newState = state.set('winner', turn);

        let players = state.get('players');
        players = players.update(
            players.findIndex((player) => (
                player.get('id') === turn
            )), (player) => (
                player.set('score', player.get('score') + 1)
            )
        );

        return newState.set('players', players);
    }

    return state;
}

function writeAtCell(state, playedCell) {
    const player = state.get('turn');
    if (player === 0) {
        return state;
    }
    const round = state.get('round');

    const newState = state.update('board',
        board => board.update(playedCell[0],
            row => row.update(playedCell[1],
                cell => ((cell === 0) ? player : cell))));

    if (round >= 5) {
        return checkWinOrDraw(newState, round, newState.get('board'), playedCell, newState.get('turn'));
    }

    return newState;
}

export default (state = new Map(), action) => {
    switch (action.type) {
        case RESTART_GAME:
        case SET_INITIAL_STATE:
            return setState(state, action.state);
        case NEXT_TURN:
            return nextTurn(state);
        case WRITE_AT_CELL:
            return writeAtCell(state, action.cell);
        default:
            return state;
    }
};
