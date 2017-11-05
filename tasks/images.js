var gulp = require( 'gulp' );
var newer = require( 'gulp-newer' );
var imagemin = require( 'gulp-imagemin' );

module.exports = function( config ) {
	gulp.task( 'images', function() {
	return gulp.src( config.images.src, {
		base: config.images.base
	})
		.pipe( newer( config.images.dest ) )
		.pipe(imagemin( {
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		} ) )
		.pipe( gulp.dest( config.images.dest ) )
} );
};
