var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	css = require('gulp-minify-css');

gulp.task('uglify', function(){
	gulp.src('./js/*.js')
		.pipe(uglify({}))
		.pipe(gulp.dest('./js/dist'));
});

gulp.task('css', function(){
	gulp.src('./css/*.css')
		.pipe(css({}))
		.pipe(gulp.dest('./css/dist'));
});

gulp.task('default', ['uglify', 'css']);