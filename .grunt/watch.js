module.exports = {
  less: {
      // Watch all .less files from the styles directory)
      files: ['src/styles/*.less'],
      tasks: ['less'],
      // Reloads the browser
      options: {
        livereload: true
      }
  },
  ts: {
      // Watch all .ts files from the styles directory)
      files: ['src/**/*.ts'],
      tasks: ['ts'],
      // Reloads the browser
      options: {
        livereload: true
      }
  },
  requirejs: {
      // Watch only main.js so that we do not constantly recompile the .js files
      files: [ 'src/js/main.js' ],
      tasks: [ 'requirejs' ],
      // Reloads the browser
      options: {
        livereload: true
      }
  }
}
