module.exports = function (gulp, plugins) {
	gulp.task('default', function(cb) {
		plugins.sequence(
			// 'clean:prod',
			'build',
			// 'browserify',
			'watch:assets',
			// 'images',
			cb
		);
	});
};
