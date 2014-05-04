var gulp = require('gulp'),
	browserify = require('gulp-browserify'),
	watch = require('gulp-watch'),
	css = require('gulp-minify-css'),
	react = require('gulp-react');

gulp.task('react', function(){
	gulp.src('./js/*.js')
		.pipe(react())
		.pipe(gulp.dest('./js/react'));
});

gulp.task('css', function(){
	gulp.src('./css/*.css')
		.pipe(css({}))
		.pipe(gulp.dest('./css/dist'));
});

gulp.task('scripts', function(){

	return gulp.src('./js/react/*.js')
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

gulp.task('default', ['react', 'scripts', 'css']);
