var gulp = require('gulp'),
    react = require('gulp-react');

gulp.task('transpile', function() {
  return gulp.src(['src/*.jsx'])
    .pipe(react())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['transpile']);
