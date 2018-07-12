var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var postcss = require('gulp-postcss');
var px2rem = require('postcss-px2rem');
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

gulp.task('postcss', function () {
    var processors = [
    px2rem({remUnit:75})
    ];
    return gulp.src('./src/css/mobile.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dist/css/'))
})

gulp.task('default',['postcss','css', 'html', 'js', 'imagemin' ]);

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