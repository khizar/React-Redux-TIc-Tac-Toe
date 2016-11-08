import createLogger from 'redux-logger';
import { Iterable } from 'immutable';

// {
//    level = 'log': 'log' | 'console' | 'warn' | 'error' | 'info', // console's level
//    duration = false: Boolean, // Print the duration of each action?
//    timestamp = true: Boolean, // Print the timestamp with each action?
//    colors: ColorsObject, // Object with color getters. See the ColorsObject interface.
//    logger = console: LoggerObject, // Implementation of the `console` API.
//    logErrors = true: Boolean, // Should the logger catch, log, and re-throw errors?
//    collapsed, // Takes a boolean or optionally a function that receives `getState` function for accessing
//               // current store state and `action` object as parameters. Returns `true` if the log group
//               // should be collapsed, `false` otherwise.
//    predicate, // If specified this function will be called before each action is processed with this middleware.
//    stateTransformer, // Transform state before print. Eg. convert Immutable object to plain JSON.
//    actionTransformer, // Transform state before print. Eg. convert Immutable object to plain JSON.
//    errorTransformer, // Transform state before print. Eg. convert Immutable object to plain JSON.
//    titleFormatter, // Format the title used when logging actions.
//    diff = false: Boolean, // Show diff between states.
//    diffPredicate // Filter function for showing states diff.'
// }

const stateTransformer = state => {
    const newState = {};

    for (const i of Object.keys(state)) {
        if (Iterable.isIterable(state[i])) {
            newState[i] = state[i].toJS();
        } else {
            newState[i] = state[i];
        }
    }

    return newState;
};

const collapsed = () => (true);

const logger = createLogger({
    stateTransformer,
    duration: true,
    collapsed
});

export default logger;
