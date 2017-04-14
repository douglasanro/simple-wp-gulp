/**
 *
 * Gulpfile setup
 *
 * @since 1.0.0
 * @author Douglas Rosa
 * @package simple-wp-gulp
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassLint = require('gulp-sass-lint');
var jshint = require('gulp-jshint');
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var del = require('del');
var rsync = require('rsyncwrapper');
var secrets = require('./secrets.json');

// Get wordpress main directory
var dirPath = __dirname.split('/');
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
		partials: 'assets/sass/partials/*.s+(a|c)ss',
		watch: 'assets/sass/**/*.s+(a|c)ss',
		prefix: ['last 2 versions', 'ie 8', 'ie 9', '> 1%']
	},
	scripts: {
		src: 'assets/js/dev/*.js',
		dest: 'assets/js/dist',
		main: 'assets/js/dev/main.js'
	},
	images: {
		src: 'assets/images/raw/*',
		dest: 'assets/images',
		base: 'assets/images/raw'
	}
};

gulp.task('clean', function() {
	return del(['build']);
});

gulp.task('browser-sync', ['clean'], function() {
	browserSync.init({
		proxy: config.project.localhost + ':' + config.project.phpPort + '/' + config.project.name,
		port: config.project.port,
		open: false
	});
});

gulp.task('sass', ['clean'], function() {
	return gulp.src(config.styles.src)
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(rename({suffix: '.min'}))
		.pipe(autoprefixer(config.styles.prefix))
		.pipe(sourcemaps.write('/'))
		.pipe(gulp.dest(config.styles.dest))
});

gulp.task('sass-lint', ['clean'], function() {
	return gulp.src([config.styles.partials, config.styles.src])
		.pipe(sassLint({
			configFile: '.sass-lint.yml'
		}))
		.pipe(sassLint.format())
		.pipe(sassLint.failOnError())
});

gulp.task('js', ['clean'], function() {
	return gulp.src(config.scripts.src)
		.pipe(concat('main.js'))
		.pipe(rename({suffix: ".min"}))
		.pipe(uglify())
		.pipe(gulp.dest(config.scripts.dest))
});

gulp.task('jshint', ['clean'], function() {
	return gulp.src(config.scripts.main)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'))
});

gulp.task('images', ['clean'], function() {
	return gulp.src(config.images.src, {
		base: config.images.base
	})
		.pipe(newer(config.images.dest))
		.pipe(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest(config.images.dest))
});

gulp.task('deploy', function() {
	rsync({
		ssh: true,
		port: secrets.servers.production.rsyncPort,
		src: './',
		dest: secrets.servers.production.rsyncDest,
		recursive: true,
		args: [ '--verbose' ],
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
			'LICENSE',
			'package.json',
			'README.md',
			'assets/css/main.min.css.map',
			'assets/images/raw',
			'assets/js/dev',
			'assets/sass'
		],
		compareMode: 'checksum',
		onStdout: function(data) {
			console.log(data.toString());
		}
	}, function(error, stdout, stderr, cmd) {
		if (error) {
			console.error(error.message);
		} else {
			console.log('DEPLOY SUCCESSFUL!');
		}
	});
});

 gulp.task('watch', ['browser-sync'], function() {
	gulp.watch(config.styles.watch, ['sass', reload]);
	gulp.watch(config.scripts.src, ['js', reload]);
	gulp.watch(config.pages, reload);
 });

gulp.task('default', ['clean', 'sass', 'sass-lint', 'js', 'jshint', 'images', 'watch']);
