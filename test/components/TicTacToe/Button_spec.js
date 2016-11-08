import React from 'react';
import { shallow } from 'enzyme';
import test from 'ava';
import { Provider } from 'react-redux';
import configureStore from '../../../src/store/configureStore.js';

import ButtonContainer from '../../../src/components/TicTacToe/Button/ButtonContainer';

test('Component: - Button', t => {
    const { store } = configureStore();
    shallow(<Provider store={store}><ButtonContainer/></Provider>);
    t.true(true);
});
