module.exports = {
    options: {
      sourceMaps: false,
      minified: false,
      comments: true,
      babelrc: false
    },
    babelify_js_master: {
      files: {
        '.tmp/babled_scripts.js': 'src/js/scripts.js',
      }
    }
}
