import test from 'ava';
import { Server } from 'hapi';
import alignJson from '.';

const mockRoute = (option) => {
    return Object.assign(
        {
            method : 'GET',
            path   : '/',
            handler(request, reply) {
                reply({ foo : 'bar' });
            }
        },
        option
    );
};

const mockServer = async (option) => {
    const { plugin, route } = Object.assign(
        {
            plugin : alignJson,
            route  : mockRoute()
        },
        option
    );
    const server = new Server();
    server.connection();
    if (plugin) {
        await server.register(plugin);
    }
    if (route) {
        server.route(route);
    }
    return server;
};

const mockRequest = (server, option) => {
    return server.inject(Object.assign(
        {
            method : 'GET',
            url    : '/'
        },
        option
    ));
};

test('without alignJson', async (t) => {
    const server = await mockServer({
        plugin : null
    });
    const response = await mockRequest(server);

    t.is(response.statusCode, 200);
    t.is(response.headers['content-type'], 'application/json; charset=utf-8');
    t.is(response.payload, '{"foo":"bar"}');
});

test('alignJson basics', async (t) => {
    const server = await mockServer();
    const response = await mockRequest(server);

    t.is(response.statusCode, 200);
    t.is(response.headers['content-type'], 'application/json; charset=utf-8');
    t.is(response.payload, '{\n    "foo" : "bar"\n}');
});

test('aignJson nested object', async (t) => {
    const server = await mockServer({
        route : mockRoute({
            handler(request, reply) {
                reply({
                    foo  : 'bar',
                    ping : 'pong',
                    wee  : {
                        hi  : 'bye',
                        tea : 'time'
                    },
                    knick : 'knack',
                    back  : 'pack'
                });
            }
        })
    });
    const response = await mockRequest(server);

    t.is(response.statusCode, 200);
    t.is(response.headers['content-type'], 'application/json; charset=utf-8');
    t.is(response.payload, [
        '{',
        '    "foo"  : "bar",',
        '    "ping" : "pong",',
        '    "wee"  : {',
        '        "hi"  : "bye",',
        '        "tea" : "time"',
        '    },',
        '    "knick" : "knack",',
        '    "back"  : "pack"',
        '}'
    ].join('\n'));
});
