import React from 'react';
import { shallow } from 'enzyme';
import test from 'ava';

import Shapes from '../../../src/components/TicTacToe/Shapes';

test('Component: - Shapes', t => {
    shallow(<Shapes/>);
    t.true(true);
});
