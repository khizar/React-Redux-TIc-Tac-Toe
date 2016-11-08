import React from 'react';
import { shallow } from 'enzyme';
import test from 'ava';
import { Provider } from 'react-redux';
import configureStore from '../../../src/store/configureStore.js';

import StatusBarContainer from '../../../src/components/TicTacToe/StatusBarContainer';

test('Component: - StatusBar', t => {
    const { store } = configureStore();
    shallow(<Provider store={store}><StatusBarContainer/></Provider>);
    t.true(true);
});
