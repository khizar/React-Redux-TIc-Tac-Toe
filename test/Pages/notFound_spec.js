import React from 'react';
import { shallow } from 'enzyme';
import test from 'ava';

import NotFound from '../../src/pages/notFound';

test('Page: - NotFound', t => {
    shallow(<NotFound/>);
    t.true(true);
});
