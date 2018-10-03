module.exports = {
    copy_files: {
          files: [


            // App & Main & Index
            {expand: true, flatten: true, src: ['src/js/app.js'], dest: 'build/js/'},
            {expand: true, flatten: true, src: ['src/js/main-prod.js'], dest: 'build/js/',
                //function to rename file
                rename: function(dest, src) {
                    return dest + src.replace('-prod','');
                  }
            },

            // all the lib files
            {expand: true, cwd: 'src', src: ['js/lib/**'], dest: 'build/'},

            // Images
            {expand: true, cwd: 'src', src: ['img/**'], dest: 'build/'},

            // Index
            {expand: true, cwd: 'src', src: ['index.html'], dest: 'build/'},

            // Server
            {expand: true, cwd: 'src', src: ['index.js'], dest: 'build/'},

            //Templates
            {expand: true, cwd: 'src', src: ['js/views/templates/*'], dest: 'build/'},
          ],
    }
}
