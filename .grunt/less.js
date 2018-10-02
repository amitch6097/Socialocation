module.exports = {
  development: {
      options: {
        compress: false,  // no minification in dev
      },
      files: {
        //compiling base.less into styles.css
        "./src/styles/styles.css":"./src/styles/base.less"
      }
  },
  production: {
    options: {
      cleancss: true, // minify css
      compress: true, // minify css
    },
    files: {
      //compiling base.less into main.min.css
      "./dist/main.min.css": "./src/styles/base.less"
    }
  }
}
