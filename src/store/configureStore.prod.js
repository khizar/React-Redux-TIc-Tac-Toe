import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { Map } from 'immutable';
import rootReducer from '../reducers';

export default function configureStore(initialState = new Map()) {
    const routingMiddleware = routerMiddleware(browserHistory);

    // Middleware you want to use in production:
    const enhancer = applyMiddleware(routingMiddleware);

    // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
    // See https://github.com/rackt/redux/releases/tag/v3.1.0
    const store = createStore(rootReducer, initialState, enhancer);

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

    return { store, history };
}
