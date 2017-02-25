'use strict';

const align = require('json-align');
const pkg = require('./package.json');

// This logic is ripped from hapi:
// https://github.com/hapijs/hapi/blob/713ec759714e493def9cbb114234309c71035d7b/lib/response.js#L565
const shouldStringify = (response) => {
    return response.variety === 'plain' &&
        response.source !== null &&
        typeof response.source !== 'string';
};

const register = (server, option, done) => {
    server.ext('onPreResponse', (request, reply) => {
        const { response } = request;

        if (shouldStringify(response)) {
            response.source = align(response.source);
        }

        reply.continue();
    });

    done();
};

register.attributes = {
    pkg
};

module.exports = {
    register
};
