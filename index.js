var path = require('path');
var gulp = require('gulp');
var merge = require('merge');
var cp = require('child_process');

var options = {
	folder: 'docker/dev',
	project: path.basename( process.cwd() )
}

gulp.task( 'ln:serve:up', ( done ) => {

	function parseOutput( error, stdout, stderr ) {
		var regex = /0\.0\.0\.0:([0-9]*)->([0-9]*)\//g;
		var matches = [];
		var match = regex.exec( stdout );

		while (match != null) {
			matches.push( match );
			match = regex.exec( stdout );
		}
		console.log( '\n---' );
		matches.forEach( ( match ) => {
			console.log( "http://localhost:" + match[1] + " (" + match[2] + ")" );
		});
		console.log( '---' );


		done();
	}

	cp.execSync( 'docker-compose --project-name "' + options.project + '" up -d', { cwd:options.folder } );
	cp.exec( 'docker-compose --project-name "' + options.project + '" ps', { cwd:options.folder }, parseOutput );
});

gulp.task( 'ln:serve:down', ( done ) => {
	cp.execSync( 'docker-compose --project-name "' + options.project + '" down --remove-orphans -v', { cwd:options.folder } );
	done();
});


function entry( changes ) {
    options = merge( options, changes );
    return gulp.series( 'ln:serve:up' );
}

module.exports = entry;