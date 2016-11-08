import React from 'react';
import { shallow } from 'enzyme';
import test from 'ava';

import App from '../../../src/components/App/App';

test('Component: - App', t => {
    shallow(<App/>);
    t.true(true);
});
