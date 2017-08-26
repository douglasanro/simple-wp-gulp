var gulp = require('gulp');
var sassLint = require('gulp-sass-lint');
var notify = require('gulp-notify');

module.exports = function(config) {
	gulp.task('sass-lint', function() {
		return gulp.src([config.styles.partials, config.styles.src])
			.pipe(sassLint({
				configFile: '.sass-lint.yml',
			}))
			.pipe(sassLint.format())
			.pipe(sassLint.failOnError())
			.on("error", notify.onError({
				title: "TASK: Sass Lint 👎",
				subtitle: "Grab some ☕️  and fix it!",
				message: "<%= error.message %>"
			}))
	})
};
