module.exports = function(grunt) {

  //Initializing the configuration object
  grunt.initConfig({
    ts: require('./.grunt/typescript'),
    less: require('./.grunt/less'),
    requirejs: require('./.grunt/requirejs'),
    watch: require('./.grunt/watch')
  });

  // Plugin loading
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Task definition
  grunt.registerTask('default', ['watch']);

};
