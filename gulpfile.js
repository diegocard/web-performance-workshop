var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var purify = require('gulp-purifycss');

gulp.task('local', function() {
    connect.server();
});

gulp.task('minify-styles', function() {
    return gulp.src('stylesheets/*.css')
        .pipe(concat('styles.css'))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('output'));
});

gulp.task('minify-scripts', function() {
    return gulp.src('javascripts/*.js')
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('output'));
});

gulp.task('unused-css', function() {
  return gulp.src('stylesheets/*.css')
    .pipe(purify(['./javascripts/*.js', './*.html']))
    .pipe(gulp.dest('output'));
});

gulp.task('default', ['local']);
gulp.task('minify', ['minify-styles', 'minify-scripts']);