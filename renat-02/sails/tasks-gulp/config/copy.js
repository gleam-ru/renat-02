/**
 * Copy files and folders.
 *
 * ---------------------------------------------------------------
 *
 * # assets task config
 * Copies all directories and files, exept coffescript and less fiels, from the sails
 * assets folder into the .tmp/public directory.
 *
 * # build task config
 * Copies all directories nd files from the .tmp/public directory into a www directory.
 *
 */
var rimraf = require('gulp-rimraf');
module.exports = function(gulp, plugins, growl) {
    // Сначала сжимаю картинки, потом копирую папку assets
    gulp.task('copy:assets', function() {
        return gulp.src(['./assets/**/*.!(coffee|less)', '!assets/images{,/**}'])
            .pipe(gulp.dest('.tmp/public'))
            .pipe(plugins.if(growl, plugins.notify({ message: 'Copy assets task complete' })));
    });
    // бовер-компненты
    gulp.task('copy:bower', ['copy:assets'], function() {
        return gulp.src(['./bower_components/**/*.!(coffee|less|scss)'])
            .pipe(gulp.dest('.tmp/public/bower_components'))
    });
    // Копирую бовер-шрифты
    gulp.task('copy:bower_fonts', ['copy:bower'], function() {
        return gulp.src('./bower_components/**/fonts/*')
            .pipe(gulp.dest('.tmp/public/fonts'))

    });
    gulp.task('copy:head', function() {
        return gulp.src('./views/_layouts/parts/head.jade')
            .pipe(plugins.rename("_head.jade"))
            .pipe(gulp.dest('./views/_layouts/parts'));
    });
    // // Копирую бовер-картинки
    // gulp.task('copy:bower_images',['copy:bower'],  function() {
    //       return gulp.src('./bower_components/**/images/*')
    //         .pipe(gulp.dest('.tmp/public/images'))

    // });
    gulp.task('copy:prod', ['copy:assets', 'copy:bower', 'copy:bower_fonts']);
    gulp.task('copy:dev',  ['copy:assets', 'copy:bower']);
    // gulp.task('copy:fonts', ['copy:images'], function() {
    //     return gulp.src(['./assets/fonts/**/*.!(coffee|less|scss)', './bower_components/**/fonts/*'])
    //         .pipe(gulp.dest('.tmp/public/fonts'))

    // });
    // gulp.task('copy:images', ['copy:bower'], function() {
    //     return gulp.src(['./assets/images/**/*.!(coffee|less|scss)','./bower_components/**/images/*'])
    //         .pipe(gulp.dest('.tmp/public/images'))

    // });
    // gulp.task('copy:build', function() {
    //  return gulp.src('.tmp/public/**/*')
    //          .pipe(gulp.dest('www'))
    //          .pipe(plugins.if(growl, plugins.notify({ message: 'Copy build task complete' })));
    // });
};
