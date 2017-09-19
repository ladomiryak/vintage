import gulp from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';

const paths = {
    css: ['public/css/**/*.css'],
    scss: ['public/scss/**/*.scss']
};

gulp.task('scss', () => {
    return gulp.src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('css',  () => {
    return gulp.src(paths.css)
        .pipe(postcss([autoprefixer({browsers: ['ie >= 10', 'last 4 versions', '> 1%']})]))
        .pipe(gulp.dest('public/css'));
});

gulp.task('default', () => {
    gulp.watch(paths.scss, ['scss']);
    gulp.watch(paths.css, ['css']);
});
