import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { Map } from 'immutable';
import reducer from '../reducers';
import logger from '../middleware/logger';

export default function configureStore(initialState = new Map()) {
    const routingMiddleware = routerMiddleware(browserHistory);

    const finalCreateStore = compose(
        applyMiddleware(routingMiddleware, logger),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )(createStore);

    const store = finalCreateStore(reducer, initialState);

    /* Create enhanced history object for router */
    const createSelectLocationState = () => {
        let prevRoutingState;
        let prevRoutingStateJS;

        return (state) => {
            const routingState = state.get('routing'); // or state.routing
            if (typeof prevRoutingState === 'undefined' || prevRoutingState !== routingState) {
                prevRoutingState = routingState;
                prevRoutingStateJS = routingState.toJS();
            }
            return prevRoutingStateJS;
        };
    };

    const history = syncHistoryWithStore(browserHistory, store, {
        selectLocationState: createSelectLocationState()
    });

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');

            store.replaceReducer(nextReducer);
        });
    }

    return { store, history };
}
