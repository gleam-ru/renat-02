module.exports = function (gulp, plugins) {
	gulp.task('prod', function(cb) {
		plugins.sequence(
			'clean:prod',
			'copy:prod',
			'sass:dev',
			'browserify',
			'jade2html',
			// 'copy:head',
			'useminPrepare',
			'clean:postprod',
			// 'fix-template',
			// 'fix-paths',
			// 'add-headers',
			// 'compileAssets',
			// 'concat:js',
			// 'concat:css',
			// 'uglify:dist',
			// 'cssmin:dist',
			// 'sails-linker-gulp:prodAssets',
			// 'sails-linker-gulp:prodViews',
   //          'images',
			cb
		);
	});
};
