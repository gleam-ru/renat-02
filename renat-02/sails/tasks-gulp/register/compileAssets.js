module.exports = function (gulp, plugins) {
	gulp.task('compileAssets', function(cb) {
		plugins.sequence(
			'wiredep',
			'clean:dev',
			'jst:dev',
			'less:dev',
			'copy:dev',
			'copy:bower',
			'browserify',
			cb
		);
	});
};
