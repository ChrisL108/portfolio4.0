

/* File: gulpfile.js */

// Required
var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer');
    // plumber = require('gulp-plumber');

// add default watch tasks
gulp.task('default', ['watch']);

function errorLog(error) {
    console.error.bind(error);
    this.emit('end');
}

// BUILD JAVASCRIPT
// Run through js-hint
// ~then uglify
// ~then concat into main.js
gulp.task('build-js', function() {
    return gulp.src('source/js/**/*.js')
        .pipe(jshint()) // jshint
        .pipe(jshint.reporter('jshint-stylish')) // add color to jshint
        .pipe(uglify()) //minify
        .on('error', errorLog) //catch errors
        .pipe(concat('bundle.js'))  // put all javascript into one file
        .pipe(gulp.dest('public/assets/js'))
        .pipe(browserSync.stream());
});

// BUILD CSS
// Run through sass and log errors
// ~then autoprefixer
// ~then concat into styles.css
gulp.task('build-css', function () {
    return gulp.src('./source/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError)) //sass({outputStyle: 'compressed'})
        .pipe(autoprefixer())
        
        .pipe(gulp.dest('public/assets/stylesheets'))
        .pipe(browserSync.stream());
});
 

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {

    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('source/js/**/*.js', ['build-js']);
    gulp.watch('source/scss/**/*.scss', ['build-css']);
    gulp.watch('*.html').on('change', browserSync.reload);
});
