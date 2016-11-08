import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import FastClick from 'fastclick';
import routes from './src/routes';
import configureStore from './src/store/configureStore.js';

const { store, history } = configureStore();

// Stylesheet

require('./styles/normalize.scss');
require('./styles/skeleton.scss');

// Eliminates the 300ms delay between a physical tap
// and the firing of a click event on mobile browsers
// https://github.com/ftlabs/fastclick
FastClick.attach(document.body);

ReactDom.render(
    // Provider connects our component tree to a Redux store.
    // Provider has to be ancestor to all of our application components.
    <Provider store={store}>
        <Router history={history} routes={routes}/>
    </Provider>,
    document.getElementById('app'));
