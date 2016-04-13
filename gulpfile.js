var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var purify = require('gulp-purifycss');
var critical = require('critical').stream;

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

// Generate & Inline Critical-path CSS
gulp.task('inline-css', function () {
    return gulp.src('./*.html')
        .pipe(critical({
            base: './',
            inline: true,
            css: [
                './stylesheets/github-dark.css',
                './stylesheets/styles.css',
                './stylesheets/github-dark.css',
                './stylesheets/prism.css'
            ]
        }))
        .pipe(gulp.dest('output'));
});

gulp.task('default', ['local']);
gulp.task('minify', ['minify-styles', 'minify-scripts']);