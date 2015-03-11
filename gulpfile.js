var gulp = require('gulp');
// var uglify = require('gulp-uglify');
// var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var connect = require("gulp-connect");
var port = process.env.port || 4000;

var path = {
	HTML: 'app/src/index.html',
	MINIFIED_OUT: 'build.min.js',
	OUT: 'App.js',
	DEST: 'app/dist',
	DEST_BUILD: 'app/dist/build',
	DEST_SRC: 'app/dist/js',
	ENTRY_POINT: './app/src/js/main.js'
};

// live reload server
gulp.task('connect', function() {
	connect.server({
		root: 'app/dist',
		port: port,
		livereload: true
	});
});

// livereload js
gulp.task('js', function() {
	gulp.src('./app/dist/js/*.js')
		.pipe(connect.reload());
});

// livereload html
gulp.task('html', function() {
	gulp.src('./app/dist/*.html')
		.pipe(connect.reload());
});

// copy indext to build folder
gulp.task('copy', function(){
	gulp.src(path.HTML)
		.pipe(gulp.dest(path.DEST));
});

gulp.task('watch', function() {
	gulp.watch(path.HTML, ['copy','html']);
	gulp.watch('./app/src/js/components/*.js',['js']);

	var watcher  = watchify(browserify({
		entries: [path.ENTRY_POINT],
		transform: [reactify],
		debug: true,
		cache: {}, packageCache: {}, fullPaths: true
	}));

	return watcher.on('update', function () {
		watcher.bundle()
			.pipe(source(path.OUT))
			.pipe(gulp.dest(path.DEST_SRC))
			console.log('Updated');
	})
		.bundle()
		.pipe(source(path.OUT))
		.pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('default', ['copy','watch','connect']);