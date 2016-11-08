var wiredep = require('wiredep').stream;
module.exports = function(gulp, plugins, growl) {
    gulp.task('wiredep', function() {
        gulp.src('views/_layouts/parts/head.jade')
            .pipe(wiredep({
                directory: './bower_components',
                ignorePath: "../../..",
                exclude: [
                    'vue-dnd',
                    'highcharts',
                    'bootstrap-treeview.*',
                    'bootstrap-tagsinput.*',
                    'alloy-editor-all-min.js',
                    'alloy-editor-ocean-min.css',
                    'jquery.dataTables.css',
                    // 'vue.js',
                ],
                src: [
                    'views/_layouts/parts/head.jade',
                ],
                fileTypes: {
                    jade: {
                        replace: {
                            js: 'script(src="{{filePath}}")'
                        }
                    }
                }
            }))
            .pipe(gulp.dest('./views/_layouts/parts'));
    })
};
