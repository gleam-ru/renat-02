/**
 * Clean files and folders.
 *
 * ---------------------------------------------------------------
 *
 * This gulp task is configured to clean out the contents in the .tmp/public of your
 * sails project.
 *
 */
var rimraf = require('gulp-rimraf');
module.exports = function(gulp, plugins, growl) {
    gulp.task('clean:dev', function(cb) {
        return rimraf('.tmp/public', cb);
    });
    gulp.task('clean:build', function() {
        return gulp.src(['www/**/*.*', 'www{,/**}'], { read: false })
            .pipe(plugins.rimraf({ force: true }))
            .pipe(plugins.if(growl, plugins.notify({ message: 'Clean task complete' })));
    });
    gulp.task('clean:prod', function() {
        return gulp.src(['.tmp/public'], { read: false })
            .pipe(plugins.rimraf({ force: true }));
    });
    gulp.task('clean:postprod', ['html2jade'], function() {
        return gulp.src([
            '.tmp/public/ViewControllers', 
            '.tmp/public/head.html', 
            '.tmp/public/js/*',
            '.tmp/public/css/*',
            '!.tmp/public/js/combined.min.js',
            '!.tmp/public/css/combined.min.css', 
            '.tmp/public/bower_components',
            ])
            .pipe(rimraf({ force: true }));
    });
};
