module.exports = function(grunt) {

  //Initializing the configuration object
  grunt.initConfig({
    ts: require('./.grunt/typescript'),
    less: require('./.grunt/less'),
    watch: require('./.grunt/watch'),
    copy: require('./.grunt/copy'),
    babel: require('./.grunt/babel'),
    uglify: require('./.grunt/uglify'),
    clean: require('./.grunt/clean'),
  });

  // Plugin loading
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-clean');


  // Task definition
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['ts', 'less:production', 'copy:copy_files', 'babel:babelify_js_master','uglify:uglify_js_master', 'clean:clean_tmp']);


};
