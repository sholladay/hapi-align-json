'use strict';

const align = require('json-align');
const pkg = require('./package.json');

// This logic is ripped from hapi:
// https://github.com/hapijs/hapi/blob/c23070a3de1b328876d5e64e679a147fafb04b38/lib/response.js#L547
const shouldStringify = (response) => {
    return response.variety === 'plain' &&
        response.source !== null &&
        typeof response.source !== 'string';
};

const register = (server) => {
    server.ext('onPreResponse', (request, h) => {
        const { response } = request;

        if (shouldStringify(response)) {
            response.source = align(response.source);
        }

        return h.continue;
    });
};

module.exports.plugin = {
    register,
    pkg
};
