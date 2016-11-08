const jsdom = require('jsdom');

const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom.jsdom('<!DOCTYPE html><html><body></body></html>');
global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

// mock localStorage && sessionStorage Web API
global.localStorage = global.sessionStorage = {
    getItem: key => (
        this[key]
    ),
    setItem: (key, value) => {
        this[key] = value;
    },
    removeItem: key => {
        delete this[key];
    }
};

global.navigator = {
    userAgent: 'node.js'
};
