var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sourceFile = './js/main.js';
var sourceFolder = './js';
var vueify = require('vueify');
var destFolder = './js/';
var destFile = 'build.js';
var watchify = require('watchify')

    function scripts(){
		var bundler =  browserify({
			entries: [sourceFile], 
    		debug: true, 
  			cache: {},
  			poll: true,
  			packageCache: {},
  			fullPaths: true,
  			plugin: [watchify]
    	}).transform(vueify)

		var rebundle = function() {
			var stream = bundler.bundle();
			stream = stream.pipe(source(destFile));
			return stream.pipe(gulp.dest(destFolder));
		};

  		bundler.on('update', rebundle);
  		bundler.on('log', function(data) {
    		console.log(data);
		});
		bundler.on('error', function(data) {
    		console.log(data);
		});
  		return rebundle();
}

gulp.task('browserify', function(){
  return scripts()
})

gulp.task('default', ['browserify']);
