# @lernetz/gulp-serve

Gulp-compatible wrapper functions around `docker-compose` to start Docker containers with proper project name and port listing.


## Usage

This package exports two asynchronous functions `serve` and `stopServe`. Because they follow the error-first callback pattern, they can be used with Gulp as follows:

```javascript
// In your Gulpfile:

// Using classic Gulp syntax:
const gulp = require('gulp');
const {serve, stopServe} = require('@lernetz/gulp-serve');
gulp.task('serve', serve());
gulp.task('serve:stop', stopServe());

// Or, using the newer Gulp 4 syntax:
const {serve, stopServe} = require('@lernetz/gulp-serve');
module.exports = {
    'serve': serve(),
    'serve:stop': stopServe(),
};
```

Then run the defined tasks from the command line:

```shell
npx gulp serve
npx gulp serve:stop
```


## Options

The two functions can be configured to use non-default options via an `options` argument:

```javascript
module.exports = {
    'serve': serve(options),
    'serve:stop': stopServe(options),
};
```

The `options` object allows you to specify the following properties:

 * `folder`: The path to the folder containing the `docker-compose.yml` file. The default is `'docker/dev'`.

 * `name`: The project name to be used by `docker-compose`. Every container will be prefixed with that project name. By default, the name of the current directory will be used.
