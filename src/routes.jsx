import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App/App';
import TicTacToe from './pages/TicTacToe';
import NotFound from './pages/notFound';

// Define the application routes and assign for each one the related component.
export default (
    <Route path="/" component={App}>
        <IndexRoute component={TicTacToe}/>
        <Route path="*" component={NotFound}/>
    </Route>
);
