var gulp = require( 'gulp' );
var browserSync = require( 'browser-sync' ).create();

module.exports = function( config ) {
	gulp.task( 'browser-sync', function() {
		browserSync.init( {
			files: [config.pages, config.styles.min, config.scripts.min],
			proxy: config.project.localhost + ':' + config.project.phpPort + '/' + config.project.name,
			port: config.project.port,
			open: false
		} );
	} );
};
