const gulp = require('gulp');
const sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
const browserSync = require('browser-sync').create();

//  compile scss into css 

function style() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        //  stream changes to all browsers
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);

}

gulp.task('uglify', () => {
    return gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./minjs'));
});

exports.style = style;
exports.watch = watch;
