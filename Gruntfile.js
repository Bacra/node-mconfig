var path = require('path');

module.exports = function(grunt) {
	
	grunt.initConfig({
		concat: {
			options: {
				separator: '\n'
			},
			mconfig: {
				src: ['src/intro.js', 'lib/main.js', 'src/browser.js','src/outro.js'],
				dest: 'dist/mconfig-debug.js'
			}
		},
		uglify: {
			mconfig: {
				src: 'dist/mconfig-debug.js',
				dest: 'dist/mconfig.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['concat', 'uglify']);
};
