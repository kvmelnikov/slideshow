var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');
var spritesmith = require('gulp.spritesmith');

gulp.task('copy',function() {
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
    gulp.src('src/assets/**/*.*')
        .pipe(gulp.dest('dist/assets'))
    gulp.src('src/assets/vendors/**/*.*')
        .pipe(gulp.dest('dist/assets/vendors'))
});
gulp.task('styles', function() {
    gulp.src('src/assets/less/**/*.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('src/assets/css'))
});

gulp.task('sprite', function() {
    var spriteData = gulp.src('./src/assets/images/templ/*.*') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.less',
            }));

    spriteData.img.pipe(gulp.dest('./src/assets/images/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('./src/assets/less/')); // путь, куда сохраняем стили
});

gulp.task('default',[ 'copy','styles'], function() {
    gulp.watch('src/assets/less/**/*.less', ['styles']);
    gulp.watch('src/**/*.*', ['copy']);
});
