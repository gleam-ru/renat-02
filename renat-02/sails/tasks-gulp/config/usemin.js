var rimraf = require('gulp-rimraf');
var usemin = require('gulp-usemin');
var jade = require('gulp-jade');
var html2jade = require('gulp-html2jade');
var options = { nspaces: 2 };
module.exports = function(gulp, plugins, growl) {

    gulp.task('jade2html', function() {
        return gulp.src('views/_layouts/parts/head.jade')
            .pipe(jade({ pretty: true }))
            .pipe(gulp.dest('.tmp/public'))
    });
    gulp.task('useminPrepare', function() {
        return gulp.src('.tmp/public/head.html')
            .pipe(usemin({
                assetsDir: '.tmp/public/',
                css: [plugins.minifyCss(), 'concat'],
                js: [plugins.uglify(), 'concat']
            }))
            .pipe(gulp.dest('.tmp/public'));
    });
    gulp.task('html2jade', function() {
        return gulp.src('.tmp/public/head.html')
            .pipe(html2jade(options))
            .pipe(plugins.rename("_head.jade"))
            .pipe(gulp.dest('./views/_layouts/parts'));
    });
    // gulp.task('fix-template', ['useminPrepare'], function() {
    //     return gulp.src('.tmp/public/head.jade')
    //         .pipe(plugins.rimraf())
    //         .pipe(plugins.rename("head1.jade"))
    //         .pipe(gulp.dest('views/_layouts/parts/'));
    // });

    // gulp.task('fix-paths', ['useminPrepare'], function() {
    //     gulp.src('public/css/site.css')
    //         .pipe(plugins.replace('../', '../bower_components/bootstrap/dist/'))
    //         .pipe(gulp.dest('.tmp/public/css'));
    // });
    // gulp.task('add-headers', ['fix-template'], function() {
    //     gulp.src('views/_layouts/parts/head.jade')
    //         .pipe(plugins.header("<!-- This file is generated — do not edit by hand! -->\n"))
    //         .pipe(gulp.dest('views/_layouts/parts/'));

    //     gulp.src('.tmp/public/concat/production.min.js')
    //         .pipe(plugins.header("/* This file is generated — do not edit by hand! */\n"))
    //         .pipe(gulp.dest('.tmp/public/js'));

    //     gulp.src('.tmp/public/concat/production.min.css')
    //         .pipe(plugins.header("/* This file is generated — do not edit by hand! */\n"))
    //         .pipe(gulp.dest('.tmp/public/css'));
    // });
};
