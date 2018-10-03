module.exports = {
    uglify_js_master: {
        options: {
            mangle: false
        },
        files: {
            'build/js/scripts.js': ['.tmp/babled_scripts.js']
          }
    }
    
}