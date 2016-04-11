var gulp = require('gulp'),
  connect = require('gulp-connect');

gulp.task('local', function() {
  connect.server();
});

gulp.task('default', ['local']);