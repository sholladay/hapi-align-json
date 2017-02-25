# hapi-align-json [![Build status for hapi-align-json on Circle CI.](https://img.shields.io/circleci/project/sholladay/hapi-align-json/master.svg "Circle Build Status")](https://circleci.com/gh/sholladay/hapi-align-json "Hapi Align Json Builds")

> Pretty print JSON responses.

## Why?

 - Quick alternative to HTML in some cases.
 - Optimize your API for readability.
 - Has the best formatting.

## Install

```sh
npm install hapi-align-json --save
```

## Usage

Get it into your program.

```js
const alignJson = require('hapi-align-json');
```

Register the plugin on your server.

```js
server.register(perm)
    .then(() => {
        return server.start();
    })
    .then(() => {
        console.log(server.info.uri);
    });
```

Set up a route that serves JSON.

```js
server.route({
    method : 'GET',
    path   : '/',
    handler(request, reply) {
        reply({ foo : 'bar', ping : 'pong', wee : { hi : 'bye',  tea : 'time' }, knick : 'knack', back : 'pack' });
    }
});
```

Visiting the above route will return this formatted JSON response.

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

See our [contributing guidelines](https://github.com/sholladay/hapi-align-json/blob/master/CONTRIBUTING.md "The guidelines for participating in this project.") for more details.

1. [Fork it](https://github.com/sholladay/hapi-align-json/fork).
2. Make a feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. [Submit a pull request](https://github.com/sholladay/hapi-align-json/compare "Submit code to this project for review.").

## License

[MPL-2.0](https://github.com/sholladay/hapi-align-json/blob/master/LICENSE "The license for hapi-align-json.") © [Seth Holladay](http://seth-holladay.com "Author of hapi-align-json.")

Go make something, dang it.
