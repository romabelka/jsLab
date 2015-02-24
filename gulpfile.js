// something old
var less = require('gulp-less'),
    react = require('gulp-react'),
    plumber = require('gulp-plumber'),
    gulp = require('gulp'),
    browserify = require('gulp-browserify');

gulp.task('less', function () {
    return gulp.src('./app/styles/**/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('./build'))
});

gulp.task('browserify', function() {
    return gulp.src('./app/main.js')
        .pipe(plumber())
        .pipe(browserify({
                extensions: ['.js'],
                insertGlobals: true,
                debug: true
            }))
    .pipe(gulp.dest('./build'))
});

gulp.task('watch', function() {
    gulp.watch('./app/**/*.js', ['browserify']);
    gulp.watch('./app/styles/**/*.less', ['less']);
});

gulp.task('build', ['browserify', 'less']);
gulp.task('default', ['build', 'watch']);