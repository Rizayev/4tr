const gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync');

gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 version']), ' > 1%', 'ie 8', 'ie 7', {cascade: true})
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function () {
});

gulp.task('css-libs', ['sass'], function () {
    return gulp.src('app/css/libs.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'));
});
gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: './app',
        },
        notify: false
    });
});

gulp.task('clean', function () {
    return del.sync('dist');
});
gulp.task('clear', function () {
    return cache.clearAll();
});
gulp.task('img', function () {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'))
});

gulp.task('watch', ['browserSync', 'css-libs', 'scripts', 'img'], function () {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean', 'sass', 'scripts'], function () {

    var buildCss = gulp.src([
        'app/css/*.css',
    ])
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src([
        'app/js/**/*',
    ])
        .pipe(gulp.dest('dist/js'));

    var buildHtmk = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));

});
