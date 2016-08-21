

/* File: gulpfile.js */

// Required
var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    autoprefixer = require('gulp-autoprefixer');

// add default watch tasks
gulp.task('default', ['watch']);

// BUILD JAVASCRIPT
// Run through js-hint
// ~then uglify
// ~then concat into main.js
gulp.task('build-js', function() {
    return gulp.src('source/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(uglify())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('public/assets/js'))
    .pipe(reload({stream: true}));
});

// BUILD CSS
// Run through sass and log errors
// ~then autoprefixer
// ~then concat into styles.css
gulp.task('build-css', function () {
  return gulp.src('./source/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError)) //sass({outputStyle: 'compressed'})
    .pipe(autoprefixer())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('public/assets/stylesheets'))
    .pipe(reload({stream: true}));
});



gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './public/'
        }
    });
});
 

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('source/js/**/*.js', ['build-js']);
  gulp.watch('source/scss/**/*.scss', ['build-css']);
  gulp.watch('source/*.html').on('change', browserSync.reload);
});
