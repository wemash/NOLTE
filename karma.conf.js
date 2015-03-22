module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['mocha', 'chai', 'jspm', 'phantomjs-shim'],
    reporters: ['verbose'],
    jspm: {
      packages: 'lib',
      loadFiles: [
        'tests/bootstrap.js',
        'tests/*.test.js',
        'tests/**/*.test.js'
      ],
      serveFiles: [
        'src/*.js',
        'src/**/*.js'
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'PhantomJS'],
    singleRun: false
  });
};
