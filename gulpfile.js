

/* File: gulpfile.js */

// Required
var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    browsersync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    babel = require('gulp-babel');
    // plumber = require('gulp-plumber');

// add default watch tasks
gulp.task('default', ['watch', 'sync']);


function errorLog(error) {
    console.error.bind(error);
    this.emit('end');
}

// BUILD JAVASCRIPT - task
// Run through js-hint
// ~then uglify
// ~then concat into main.js
gulp.task('build-js', function() {
    return gulp.src('source/js/**/*.js')
        .pipe(jshint()) // jshint
        .pipe(jshint.reporter('jshint-stylish')) // add color to jshint
        .pipe(babel({
            presets: ['es2015']
        }))
        // .pipe(uglify()) //minify
        .on('error', errorLog) //catch errors in console
        .pipe(concat('bundle.js'))  // concat javascript
        .pipe(gulp.dest('public/js'))
        .pipe(browsersync.stream());
});

// BUILD CSS - task
// Run through sass and log errors
// ~then autoprefixer
// ~then concat into styles.css
gulp.task('build-css', function () {
    return gulp.src('./source/scss/**/*.scss')
        // SaSS 
        .pipe(sass().on('error', sass.logError)) // sass({outputStyle: 'compressed'})
        // AutoPrefixer
        .pipe(autoprefixer('last 2 versions'))
        // place in public folder
        .pipe(gulp.dest('public/styles'))
        // Browser Sync
        .pipe(browsersync.stream());
});
 
// Browser Sync initialization
gulp.task('sync', function() {
    browsersync.init({
        server: {
            baseDir: './'
        }
    });
});

// COMPRESS IMAGES - task
gulp.task('imagemin', function() {
    gulp.src('source/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/img'));
});

// WATCH FILES
// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
    // watch html
    gulp.watch('*.html').on('change', browsersync.reload);
    // watch js
    gulp.watch('source/js/**/*.js', ['build-js']);
    // watch scss
    gulp.watch('source/scss/**/*.scss', ['build-css']);
    // watch images
    gulp.watch('source/img/*', ['imagemin']);
});
