export default class CssTasks {
  constructor(gulp, plugins) {
    this.gulp = gulp;
    this.plugins = plugins;
  }

  libraryCSSDependencies () {
    let self=  this;
    return () => {
	    return self.gulp.src([
        'node_modules/ng-dialog/css/ngDialog.min.css',
  			'node_modules/ng-dialog/css/ngDialog-theme-default.min.css',
        'node_modules/angular-tooltips/dist/angular-tooltips.min.css',
		  ])
		  .pipe(self.plugins.concat('_css-lib.scss'))
		  .pipe(self.gulp.dest('Frontend/scss/lib'));
    };
  }
}
