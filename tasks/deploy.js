var gulp = require( 'gulp' );
var rsync = require( 'rsyncwrapper' );
var secrets = require( '../secrets.json' );

module.exports = function( config ) {
	gulp.task( 'deploy', function() {
		rsync( {
			ssh: true,
			port: secrets.servers.production.rsyncPort,
			src: './',
			dest: secrets.servers.production.rsyncDest,
			recursive: true,
			args: ['--verbose'],
			deleteAll: true,
			exclude: [
				'.DS_Store',
				'.AppleDouble',
				'.LSOverride',
				'Thumbs.db',
				'ehthumbs.db',
				'*.cab',
				'*.msi',
				'*.msm',
				'*.msp',
				'*.lnk',
				'.idea/',
				'.ftppass',
				'.tmp/',
				'.Trash-*',
				'.directory',
				'vendor',
				'composer.lock',
				'bower_components',
				'.bower-cache',
				'.bower-registry',
				'.bower-tmp',
				'.sass-cache/',
				'*~',
				'logs',
				'*.log',
				'.editorconfig',
				'.git',
				'.gitignore',
				'.jshintrc',
				'.sass-lint.yml',
				'node_modules',
				'gulpfile.js',
				'secrets.json',
				'LICENSE',
				'package.json',
				'README.md',
				'assets/css/main.min.css.map',
				'assets/images/raw',
				'assets/js/dev',
				'assets/sass'
			],
			compareMode: 'checksum',
			onStdout: function( data ) {
				console.log( data.toString() );
			}
		}, function( error, stdout, stderr, cmd ) {
			if ( error ) {
				console.error( error.message );
			} else {
				console.log( 'DEPLOY SUCCESSFUL!' );
			}
		} );
	} );
};
