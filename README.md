# lernetz-serve-gulp-task
A gulp task that starts/stops docker containers with docker-compose. It executes docker-compose up/down command within a folder. Means that docker-compose must be installed on the system.

## Usage
The following example will show how to use the serve task.
Simply require the task and you have the gulp tasks ready. 

```javascript
var gulp = require('gulp');
var serve = require( 'lernetz-serve-gulp-task' );
```

Now you start the tasks by run:
```shell
npx gulp ln:serve:up
npx gulp ln:serve:down
```

## Options
The task accepts an parameter object with the following attributes:

 * **folder**: The path to the folder where the docker-compose files lies
 * **project**: The project name for docker to start. Every container will be prefixed with that project name.

```javascript
var gulp = require('gulp');
var serve = require( 'lernetz-serve-gulp-task' )( { folder:"docker/folder", project:"name" } );
```

## Custom tasks
If you like to register the tasks under another name simply us gulp.series like so:
```javascript
gulp.task( 'myName', gulp.series( 'ln:serve:up' );
```