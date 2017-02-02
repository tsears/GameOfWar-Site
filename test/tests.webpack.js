var testsContext = require.context('../test', true, /\.spec\.js$/);
testsContext.keys().forEach(testsContext);

var srcContext = require.context('../_js', false, /\.js$/);
srcContext.keys().forEach(srcContext);
