//server
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname + '/dev')).listen(8080);
// connect().use(serveStatic(__dirname + '/release')).listen(8081);

//start gulp task
var gulp = global.gulp  = require('gulp');
require('./gulpfile.js');
gulp.start('dev');