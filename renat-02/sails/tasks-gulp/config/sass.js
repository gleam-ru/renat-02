var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
module.exports = function(gulp, plugins, growl) {

    gulp.task('sass:dev', function() {
        return gulp.src('assets/sass/my-style.scss')
            .pipe(
                plugins.sass({
                    expand: true,
                    ext: '.css'
                })
            )
            // .pipe(autoprefixer({
            //     browsers: ['last 4 versions'],
            //     cascade: false
            // }))
            .on('error', sass.logError)
            .pipe(gulp.dest('.tmp/public/css'))
    });
};
