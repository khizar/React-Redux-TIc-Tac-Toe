import React from 'react';
import { shallow } from 'enzyme';
import test from 'ava';
import { Provider } from 'react-redux';
import configureStore from '../../../src/store/configureStore.js';

import ScoreListContainer from '../../../src/components/TicTacToe/ScoreListContainer';

test('Component: - ScoreList', t => {
    const { store } = configureStore();
    shallow(<Provider store={store}><ScoreListContainer/></Provider>);
    t.true(true);
});
