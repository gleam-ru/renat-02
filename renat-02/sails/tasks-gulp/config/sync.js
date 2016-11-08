// todo: get it working properly.
/**
 * A gulp task to keep directories in sync. It is very similar to grunt-contrib-copy
 * but tries to copy only those files that has actually changed.
 *
 * ---------------------------------------------------------------
 *
 * Synchronize files from the `assets` folder to `.tmp/public`,
 * smashing anything that's already there.
 *
 *
 */
module.exports = function(gulp, plugins, growl) {
	gulp.task('sync:dev', function() {
		return gulp.src(['./assets/**/*'])
				.pipe(plugins.changed('.tmp/public'))
				.pipe(gulp.dest('.tmp/public'))
	});
	gulp.task('sync:bower', function() {
		return gulp.src(['./bower_components/**/*'])
				.pipe(plugins.changed('.tmp/public'))
				.pipe(gulp.dest('.tmp/public/bower_components'))
	});
};
