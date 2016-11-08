import { fromJS } from 'immutable';
import test from 'ava';
import { LOCATION_CHANGE } from 'react-router-redux';
import routerReducer from '../../src/reducers/routerReducer';


const initialState = fromJS({
    locationBeforeTransitions: null
});

test('initialization of the state', t => {
    const nextState = routerReducer(undefined, { type: '' });

    t.true(nextState.equals(initialState));
});

test('handles LOCATION_CHANGE', t => {
    const action = {
        type: LOCATION_CHANGE,
        payload: {
            pathname: 'test'
        }
    };
    const nextState = routerReducer(initialState, action);

    t.true(nextState.equals(
        fromJS({
            locationBeforeTransitions: {
                pathname: 'test'
            }
        })
    ));
});

test('handles Default state', t => {
    const action = {
        type: 'SOME_UNDEFINED_ACTION',
        test: 'data'
    };

    const nextState = routerReducer(initialState, action);

    t.true(nextState.equals(initialState));
});
