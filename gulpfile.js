/* File: gulpfile.js */

// grab our gulp packages
var gulp = require('gulp'),
    gutil = require('gulp-util');

gulp.task('default', function() {
    return gutil.log('Gulp is running!');
});