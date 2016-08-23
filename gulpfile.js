var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');

const del = require('del');

var cheerhelper = require('./scripts/cheerhelper').CheerHelper;

gulp.task('sass', function() {
	gulp.src('./dev/scss/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./dev/css'));
	cheerhelper.log('sass compile success');
});


gulp.task('sass:watch', function() {
	gulp.watch('./dev/scss/*.scss', ['sass']);
});

// backup
gulp.task('backup', function() {
	return gulp.src('./release/**')
		.pipe(zip(new Date().format('yyyyMMdd_hhmmss') + '.zip'))
		.pipe(gulp.dest('./backup'));
});

// clean
gulp.task('clean', ['backup'], function() {
	cheerhelper.log('Starting clean...');
	return del(['./release/**']).then(function(paths) {
		cheerhelper.log('All files cleaned!');
	});
})

// 新建发布目录
gulp.task('move', ['clean'], function() {
	return gulp.src(['./dev/**', '!./dev/scss', '!./dev/scss/**']).pipe(gulp.dest('./release'));
});

// 编译sass&压缩css
gulp.task('sass-compress', ['move'], function() {
	return gulp.src('./dev/scss/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(autoprefixer())
    
		.pipe(gulp.dest('./release/css'));
});

// uglifyJs
gulp.task('uglifyJs', ['sass-compress'], function() {
	return gulp.src(['./dev/js/**/*js'])
		// .pipe(uglify({
		// 	mangle: false,
		// 	compress: {
		// 		drop_console: true
		// 	}
		// }))
		.pipe(gulp.dest('./release/js'));
});

// override
gulp.task('override', ['uglifyJs'], function(){
	return gulp.src('./override/**').pipe(gulp.dest('./release'));
});

//**********************EXECUTABLE************************
gulp.task('dev', ['sass', 'sass:watch']);

gulp.task('release', ['override'], function() {
	gulp.src('./release/**')
		.pipe(zip('YJ_task_latest.zip'))
		.pipe(gulp.dest('./release'));
});

gulp.task('bower', function() {
	gulp.src('./bower_components/**').pipe(gulp.dest('./dev/lib'));
});