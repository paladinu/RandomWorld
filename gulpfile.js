// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');

// Lint Task
gulp.task('lint', function() {
    return gulp.src(['public/javascripts/*.js',
        'public/javascripts/viewmodels/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('public/stylesheets/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ 
            style: 'expanded',
            sourceComments: 'map',
            includePaths : 'public/stylesheets'
            }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/stylesheets'))
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist'))
        .pipe(minifyCss())
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest('dist'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['public/javascripts/*.js',
        'public/javascripts/viewmodels/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('public/javascripts/*.js', ['lint', 'scripts']);
    gulp.watch('public/stylesheets/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);