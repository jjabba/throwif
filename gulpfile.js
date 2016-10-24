'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jasmine = require('gulp-jasmine');

var DEST = 'build/';

gulp.task('default', ['minify']);

gulp.task('test', function() {
    gulp.src('spec/test.js')
        // gulp-jasmine works on filepaths so you can't have any plugins before it
        .pipe(jasmine())
    }
);

gulp.task('minify', ['test'], function() {
  return gulp.src('throwif.js')
    // This will output the non-minified version
    .pipe(gulp.dest(DEST))
    // This will minify and rename to throwif.min.js
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(DEST));
});
