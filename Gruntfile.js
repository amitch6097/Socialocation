module.exports = function(grunt) {

  // requirejs compile options
  var compileOptions = {

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

  //Initializing the configuration object
  grunt.initConfig({

    // Task configuration
    ts: {
      default : {
        tsconfig: 'tsconfig.json'
      }
    },
    less: {
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
            // compress: true, // minify css
          },
          files: {
            //compiling base.less into main.min.css
            "./dist/main.min.css": "./src/styles/base.less"
          }
        }
    },
    requirejs: {
        compile: {
            options : compileOptions
        }
    },
    watch: {
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
  });

  // Plugin loading
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Task definition
  grunt.registerTask('default', ['watch']);

};
