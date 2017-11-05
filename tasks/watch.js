var gulp = require( 'gulp' );
var watch = require( 'gulp-watch' );

module.exports = function( config ) {
	gulp.task( 'watch', ['browser-sync'], function() {
		gulp.watch( config.styles.watch, ['styles'] );
		gulp.watch( config.scripts.src, ['scripts'] );
		gulp.watch( config.pages );
	});
};
