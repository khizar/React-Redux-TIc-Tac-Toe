import { combineReducers } from 'redux-immutable';
import routerReducer from './routerReducer';
import coreReducer from './coreReducer';

const rootReducer = combineReducers({
    core: coreReducer,
    routing: routerReducer
});

export default rootReducer;
