import React from 'react';
import { shallow } from 'enzyme';
import test from 'ava';
import { Provider } from 'react-redux';
import configureStore from '../../../src/store/configureStore.js';

import TicTacBoardContainer from '../../../src/components/TicTacToe/TicTacToeBoard/TicTacBoardContainer';

test('Component: - TicTacBoard', t => {
    const { store } = configureStore();
    shallow(<Provider store={store}><TicTacBoardContainer/></Provider>);
    t.true(true);
});
