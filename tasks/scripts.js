var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

module.exports = function(config) {
	gulp.task('scripts', function() {
		return gulp.src(config.scripts.src)
			.pipe(plumber({
				errorHandler: function(error) {
					notify({
						title: "TASK: Scripts 👎",
						subtitle: "Grab some ☕️  and fix it!",
						message: "<%= error.message %>"
					}).write(error);
					console.log(error.toString());
					this.emit('end');
				}
			}))
			.pipe(jshint())
			.pipe(jshint.reporter('jshint-stylish'))
			.pipe(jshint.reporter('fail'))
			.pipe(concat('main.js'))
			.pipe(rename({suffix: ".min"}))
			.pipe(uglify())
			.pipe(gulp.dest(config.scripts.dest))
			.pipe(notify({
				title: "TASK: Scripts 👍",
				message: "Well Done Bro 👊",
				onLast: true
			}))
	});
};
