# hapi-align-json [![Build status for hapi Align JSON](https://img.shields.io/circleci/project/sholladay/hapi-align-json/master.svg "Build Status")](https://circleci.com/gh/sholladay/hapi-align-json "Builds")

> Respond with beautiful JSON

## Why?

 - Quick alternative to HTML in some cases.
 - Optimize your API for readability.
 - Has the best formatting.

## Install

```sh
npm install hapi-align-json --save
```

## Usage

Register the plugin on your server to enable beautiful JSON responses.

```js
const hapi = require('hapi');
const alignJson = require('hapi-align-json');

const server = hapi.server();

const init = async () => {
    await server.register(alignJson);
    server.route({
        method : 'GET',
        path   : '/',
        handler(request, reply) {
            reply({ foo : 'bar', ping : 'pong', wee : { hi : 'bye',  tea : 'time' }, knick : 'knack', back : 'pack' });
        }
    });
    await server.start();
    console.log('Server ready:', server.info.uri);
};

init();
```

Visiting the above route will return a JSON response with highly readable formatting because of this plugin.

```json
{
    "foo"  : "bar",
    "ping" : "pong",
    "wee"  : {
        "hi"  : "bye",
        "tea" : "time"
    },
    "knick" : "knack",
    "back"  : "pack"
}
```

## Contributing

See our [contributing guidelines](https://github.com/sholladay/hapi-align-json/blob/master/CONTRIBUTING.md "Guidelines for participating in this project") for more details.

1. [Fork it](https://github.com/sholladay/hapi-align-json/fork).
2. Make a feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. [Submit a pull request](https://github.com/sholladay/hapi-align-json/compare "Submit code to this project for review").

## License

[MPL-2.0](https://github.com/sholladay/hapi-align-json/blob/master/LICENSE "License for hapi-align-json") © [Seth Holladay](https://seth-holladay.com "Author of hapi-align-json")

Go make something, dang it.
