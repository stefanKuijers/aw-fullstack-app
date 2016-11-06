
/*
    gulp index
*/ 'use strict';


/*
    Requires
*/
// all the node modules which we depend on
var gulp = require('gulp');

var plugin = require('./plugin.js')();
var config = require('./config.js')(gulp, plugin);


/* 
    Tasks
*/
// each one of these can be called from the commandline.
// example: $ gulp browserSync
gulp.task('browserSync', config.browserSync.task);
gulp.task('watch', config.watch.task);
gulp.task('javascript', config.javascript.task);
gulp.task('sass', config.sass.task);
gulp.task('vendor', config.bower.task);

var defaultTasks = ['browserSync'];
if (config.bower.enabled) {defaultTasks.unshift('vendor');}
if (config.sass.enabled) {defaultTasks.unshift('sass');}
if (config.javascript.enabled) {defaultTasks.unshift('javascript');}

// to run execute: $ gulp
// this will first run; the tasks added to the defaultTasks array.
// after that we run the watch task.
gulp.task(
    'default', 
    defaultTasks, 
    config.watch.task
);


// to run execute: $ gulp build
// this will create all the front end resources
var buildTasks = [];
if (config.javascript.enabled) {buildTasks.push('javascript');}
if (config.sass.enabled) {buildTasks.push('sass');}
if (config.bower.enabled) {buildTasks.push('vendor');}

gulp.task(
    'build', 
    buildTasks
);

