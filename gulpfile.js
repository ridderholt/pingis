var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	browserify = require('gulp-browserify'),
	watch = require('gulp-watch'),
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

gulp.task('scripts', function(){

	return gulp.src('./js/*.js')
		.pipe(browserify({
			insertGlobals: false,
			debug: false,
		})).pipe(gulp.dest('./js/build'));

});

gulp.task('watch', function(){
	watch({glob: './js/*.js'}, function(files){
		return files.pipe(browserify({
			insertGlobals: false,
			debug: false,
		})).pipe(gulp.dest('./js/build'));
	})
});

gulp.task('default', ['scripts', 'uglify', 'css', 'watch']);
