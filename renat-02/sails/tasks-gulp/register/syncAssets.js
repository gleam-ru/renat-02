module.exports = function (gulp, plugins) {
	gulp.task('syncAssets', function(cb) {
		plugins.sequence(
			// 'jst:dev',
			// 'images',
			'copy:head',
			'sass:dev',
			// 'browserify',
			'sync:dev',
			// 'coffee:dev',
			// 'compileAssets',
			// 'images',
			// 'linkAssets',
			cb
		);
	});
};
