var browserify = require('browserify');
var source = require('vinyl-source-stream');

module.exports = function(gulp, plugins, growl) {
    gulp.task('browserify', function() {
        return browserify('assets/js/main.js')
            .bundle()
            // Передаем имя файла, который получим на выходе, vinyl-source-stream
            .pipe(source('main.js'))
            .pipe(gulp.dest('.tmp/public/js/'));
    });
};
