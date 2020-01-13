import test from 'ava';
import hapi from '@hapi/hapi';
import alignJson from '.';

const makeRoute = (option) => {
    return {
        method : 'GET',
        path   : '/',
        handler() {
            return { foo : 'bar' };
        },
        ...option
    };
};

const makeServer = async (option) => {
    const { plugin } = {
        plugin : alignJson,
        ...option
    };
    const server = hapi.server();
    if (plugin) {
        await server.register(plugin);
    }
    return server;
};

test('without alignJson', async (t) => {
    const server = await makeServer({ plugin : null });
    server.route(makeRoute());
    const response = await server.inject('/');

    t.is(response.statusCode, 200);
    t.is(response.headers['content-type'], 'application/json; charset=utf-8');
    t.is(response.payload, '{"foo":"bar"}');
});

test('server can initialize', async (t) => {
    const server = await makeServer();
    await t.notThrowsAsync(server.initialize());
});

test('alignJson basics', async (t) => {
    const server = await makeServer();
    server.route(makeRoute());
    const response = await server.inject('/');

    t.is(response.statusCode, 200);
    t.is(response.headers['content-type'], 'application/json; charset=utf-8');
    t.is(response.payload, '{\n    "foo" : "bar"\n}');
});

test('aignJson nested object', async (t) => {
    const server = await makeServer();
    server.route(makeRoute({
        handler() {
            return {
                foo  : 'bar',
                ping : 'pong',
                wee  : {
                    hi  : 'bye',
                    tea : 'time'
                },
                knick : 'knack',
                back  : 'pack'
            };
        }
    }));
    const response = await server.inject('/');

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
