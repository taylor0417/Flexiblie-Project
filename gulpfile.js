var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

gulp.task('html', function () {
    gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'))
});

gulp.task('css', function () {
    gulp.src('./src/css/*')
        .pipe(csso())
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('js', function () {
    gulp.src('./src/js/*')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('imagemin', function () {
    gulp.src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
});


gulp.task('default',['css', 'html', 'js', 'imagemin' ]);

gulp.task('dev', ['default'], function() {
    browserSync.init({
        server: "./dist",
        port: 3000,
        notify: false
    });
    gulp.watch("./src/*.html",['html']).on('change', reload);
    gulp.watch("./src/css/*",['css']).on('change', reload);
    gulp.watch("./src/js/*.js",['js']).on('change', reload);
});