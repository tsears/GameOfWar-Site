import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import ScriptTasks from './gulp-tasks/scripts';
import CssTasks from './gulp-tasks/css';
import DevTasks from './gulp-tasks/dev';
import AssetTasks from './gulp-tasks/assets';
import Named from 'vinyl-named';

let plugins = gulpLoadPlugins({
	pattern: [
		'gulp-*',
		'gulp.*',
		'webpack*',
    'karma',
		'vinyl-named'
	]
});
plugins.named = Named;

// Script Tasks
let scriptTasks = new ScriptTasks(gulp, plugins);
gulp.task('lint', scriptTasks.lint());
gulp.task('angularLib', scriptTasks.angularLib());
gulp.task('scriptCompile', scriptTasks.scriptCompile());
gulp.task('angularPartials', scriptTasks.angularPartials());
gulp.task('jsLib', ['angularPartials', 'angularLib', 'scriptCompile'], scriptTasks.jsLib());
gulp.task('jsTest', scriptTasks.jsTest());

// Dev Tasks
let devTasks = new DevTasks(gulp, plugins);
gulp.task('watch', devTasks.watch());

gulp.task('default',
  [
    'lint',
    'angularLib',
    'scriptCompile',
    'jsTest',
    'angularPartials',
		'jsLib',
    'watch',
  ]
);
