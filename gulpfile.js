'use strict';

var gulp = require('gulp'),
	browserify = require('gulp-browserify'),
	watch = require('gulp-watch'),
	css = require('gulp-minify-css'),
	react = require('gulp-react'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	browser_shim = require('browserify-global-shim').configure({
		'jQuery': '$'
	});

gulp.task('react', function(){
	return gulp.src('./js/*.js')
		.pipe(react())
		.pipe(gulp.dest('./js/react'));
});

gulp.task('css', function(){
	return gulp.src('./css/*.css')
		.pipe(css({}))
		.pipe(gulp.dest('./css/dist'));
});

gulp.task('cssConcat', function(){
	return gulp.src(['./css/dist/offcanvas.css', './css/dist/animate.css', './css/dist/ladda.min.css'])
		.pipe(concat('all.css'))
		.pipe(gulp.dest('./css/dist'));
	});

gulp.task('libs', function(){
	return gulp.src(['./lib/spin.min.js', './lib/ladda.min.js', './lib/ladda.jquery.min.js'])
			   .pipe(concat('laddaLib.min.js'))
			   .pipe(gulp.dest('./lib/dist'));
});

gulp.task('scripts', ['react'], function(){
	return gulp.src('./js/react/*.js')
	.pipe(browserify({
		insertGlobals: false,
		debug: false,
		transform: browser_shim
	})).pipe(gulp.dest('./js/build'));
});

gulp.task('minify', ['scripts'], function(){
	return gulp.src('./js/build/*.js')
			.pipe(uglify())
			.pipe(gulp.dest('./js/dist'));
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
gulp.task('release', ['react', 'scripts', 'css', 'minify', 'libs', 'cssConcat']);


