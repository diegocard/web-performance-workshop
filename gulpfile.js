var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');

gulp.task('local', function() {
  connect.server();
});

gulp.task('styles', function() {
  return gulp.src('stylesheets/*.css')
    .pipe(concat('styles.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('output'));
});
 
gulp.task('scripts', function() {
  return gulp.src('javascripts/*.js')
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('output'));
});

gulp.task('default', ['local']);
gulp.task('minify', ['styles', 'scripts']);