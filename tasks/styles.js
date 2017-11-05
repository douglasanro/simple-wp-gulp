var gulp = require( 'gulp') ;
var sass = require( 'gulp-sass' );
var rename = require( 'gulp-rename' );
var sourcemaps = require( 'gulp-sourcemaps' );
var autoprefixer = require( 'gulp-autoprefixer' );
var plumber = require( 'gulp-plumber' );
var notify = require( 'gulp-notify' );


module.exports = function( config ) {
	gulp.task( 'styles', ['clean', 'sass-lint'], function() {
		return gulp.src( config.styles.src )
			.pipe( plumber( {
				errorHandler: function( error ) {
					console.log( error )
					notify( {
						title: "TASK: Styles 👎",
						subtitle: "Grab some ☕️  and fix it!",
						message: "<%= error.message %>"
					} ).write( error );
					this.emit( 'end' );
				}
			}))
			.pipe( sourcemaps.init() )
			.pipe(sass( { outputStyle: 'compressed' } ).on( 'error', sass.logError ) )
			.pipe( rename( { suffix: '.min' } ) )
			.pipe( autoprefixer( config.styles.prefix ) )
			.pipe( sourcemaps.write( '/' ) )
			.pipe( gulp.dest( config.styles.dest ) )
			.pipe( notify( {
				title: "TASK: Styles 👍",
				message: "Well Done Bro 👊",
				onLast: true
			} ) )
	} );
};
