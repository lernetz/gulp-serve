# @lernetz/gulp-serve

Gulp-compatible wrapper functions around `docker-compose` to start Docker containers with proper project name and port listing.


## Usage

The following example demonstrates how to use the `startServe` and `stopServe` functions.

```javascript
// In your Gulpfile:

// Using classic Gulp syntax:
const gulp = require('gulp');
const {startServe, stopServe} = require('@lernetz/gulp-serve');
gulp.task('serve:start', startServe);
gulp.task('serve:stop', stopServe);

// Or, using the newer Gulp 4 syntax:
const {startServe, stopServe} = require('@lernetz/gulp-serve');
module.exports = {
    'serve:start': startServe,
    'serve:stop': stopServe,
};
```

Then run the defined tasks from the command line:

```shell
npx gulp serve:start
npx gulp serve:stop
```


## Options

The two functions can be configured to use non-default options via `.with(options)`:

```javascript
module.exports = {
    'serve:start': startServe.with(options),
    'serve:stop': stopServe.with(options),
};
```

The `options` object allows you to specify the following properties:

 * `folder`: The path to the folder containing the `docker-compose.yml` file. The default is `'docker/dev'`.

 * `name`: The project name to be used by `docker-compose`. Every container will be prefixed with that project name. By default, the name of the current directory will be used.
