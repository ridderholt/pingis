'use strict';

var gulp = require('gulp'),
	browserify = require('gulp-browserify'),
	watch = require('gulp-watch'),
	css = require('gulp-minify-css'),
	react = require('gulp-react'),
	jshint = require('gulp-jshint');

gulp.task('react', function(){
	return gulp.src('./js/*.js')
		.pipe(react())
		.pipe(gulp.dest('./js/react'));
});

gulp.task('css', function(){
	gulp.src('./css/*.css')
		.pipe(css({}))
		.pipe(gulp.dest('./css/dist'));
});

gulp.task('scripts', ['react'], function(){
	return gulp.src('./js/react/*.js')
	.pipe(browserify({
		insertGlobals: false,
		debug: false
	})).pipe(gulp.dest('./js/build'));
});

gulp.task('jshint', function(){
	gulp.src('./js/react/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter());
});

gulp.task('watch', function(){
	gulp.watch('./js/*.js', ['react', 'scripts']);
});

gulp.task('default', ['react', 'scripts', 'css']);
