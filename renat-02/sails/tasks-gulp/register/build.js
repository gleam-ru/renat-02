module.exports = function (gulp, plugins) {
	gulp.task('build', function (cb) {
		plugins.sequence(
	        'wiredep',      // bower into head    // особенности минификатора
			// 'copy:dev',
			'copy:head',     // assets + bower
        // 'linkAssetsBuild',
	        'sass:dev',
	        'sync:dev',  // синхронизирую assets
	        'sync:bower',  // синхронизирую bower
			cb
		);
	});
};
