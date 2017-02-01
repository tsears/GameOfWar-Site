export default class ScriptTasks {
  constructor(gulp, plugins) {
    this.gulp = gulp;
    this.plugins = plugins;
  }

  lint() {
    const self = this;
  	return () => {
      return self.gulp.src([
  			'*.js',
  			'js/**/*.js',
        'gulp-tasks/*.js',
        'test/**/*.js',
  			'!**/*.min.js',
  		])
  		.pipe(self.plugins.eslint())
  		.pipe(self.plugins.eslint.format());
    };
  }

  angularLib() {
    const self = this;
    return () => {
    	return self.gulp.src([
  			'node_modules/angular/angular.min.js',
  		])
  		.pipe(self.plugins.concat('nglib.js'))
  		.pipe(self.plugins.uglify({
        preserveComments: 'license'
      }))
  		.pipe(self.gulp.dest('js/lib'));
    };
  }

  angularPartials() {
    const self = this;
    return () => {
      return self.gulp.src(['Frontend/**/*.html'])
		  .pipe(self.gulp.dest('wwwroot/ng-partials'));
    };
  }

  jsLib() {
    const self = this;
    return () => {
      return self.gulp.src(['lib/**/*.js'])
        .pipe(self.gulp.dest('_assets/js/js/lib'));
    }
  }

  scriptCompile() {
    const self = this;
    return () => {
    	return self.gulp.src('_js/**/*.js')
        .pipe(self.plugins.named())
    		.pipe(self.plugins.webpackStream({
    				module: {
    					loaders: [{
    						loader: 'babel-loader',
    					}]
    				},
    				output: {
    					filename: '[name].min.js',
    				},
    				devtool: 'source-map',
    				plugins: [
    					new self.plugins.webpack.optimize.UglifyJsPlugin({
    						compress: {
    							drop_debugger: false // the linter will warn about the debugger statement, assume it's there intentionally
    						}
    					})
    				]
    		}))
        .pipe(self.gulp.dest('_assets/js/js'))
    };
  }

	jsTest() {
		const self = this;

		return (done) => {
			new self.plugins.karma.Server (
				{
					configFile: __dirname + '/../karma.conf.js',
					singleRun: true
				}, (err) => {
					if (!err) {
						done();
					} else {
						done(new self.plugins.util.PluginError('karma', {
							message: `Tests failed (${err})`
						}));
					}
				}).start();
		};
	}
}
