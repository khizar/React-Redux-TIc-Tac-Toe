import React from 'react';
import { shallow } from 'enzyme';
import test from 'ava';
import { Provider } from 'react-redux';
import configureStore from '../../src/store/configureStore.js';

import TicTacToe from '../../src/pages/TicTacToe';

test('Page: - TicTacToe', t => {
    const { store } = configureStore();
    shallow(<Provider store={store}><TicTacToe/></Provider>);
    t.true(true);
});
