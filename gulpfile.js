/**
 *
 * Gulpfile setup
 *
 * @since 1.0.0
 * @author Douglas Rosa
 * @package simple-wp-gulp
 *
 */

var gulp = require( 'gulp' );
var glob = require( 'glob' );
var path = require( 'path' );

// Get wordpress main directory
var dirPath = path.normalize( __dirname ).split( path.sep );
var wpPath = dirPath[dirPath.length-4];

var config = {
	project: {
		name:  wpPath,
		port: 3000,
		phpPort: 8888,
		localhost: 'localhost'
	},
	pages: '**/*.php',
	styles: {
		src: 'assets/sass/main.scss',
		dest: 'assets/css',
		min: 'assets/css/*.css',
		partials: 'assets/sass/partials/*.s+(a|c)ss',
		watch: 'assets/sass/**/*.s+(a|c)ss',
		prefix: ['last 2 versions', 'ie 8', 'ie 9', '> 1%']
	},
	scripts: {
		src: 'assets/js/dev/*.js',
		dest: 'assets/js/dist',
		min: 'assets/js/dist/*.js',
		main: 'assets/js/dev/main.js'
	},
	images: {
		src: 'assets/images/raw/*',
		dest: 'assets/images',
		base: 'assets/images/raw'
	}
};

glob.sync( 'tasks/*.js', { realpath: true } ).forEach( function ( file ) {
	require( file )( config );
} );

gulp.task( 'default', ['clean', 'styles', 'scripts', 'images', 'watch'] );
