module.exports = {
  compile: {
      options : {
        mainConfigFile: 'src/js/main.js',
        baseUrl: 'src/js',
        include: ['main'],
        out: 'dist/main.min.js',
        removeCombined: false,
        findNestedDependencies: true,

        //Removes console.logs for production
        onBuildWrite: function (moduleName, path, contents) {
            if(/(.*)js\/modules\/(.*)/.test(path)) return contents.replace(/console.log(.*);/g, ';');
            return contents;
        }
    }
  }
}
