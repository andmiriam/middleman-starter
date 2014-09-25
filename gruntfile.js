module.exports = function(grunt){

  var paths = {
    src: 'source/js/'
  };

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    paths: paths,

    pkg: grunt.file.readJSON('package.json'),

    // Concatenate Bower (vendor) dependencies to source/js/vendor.js
    bower_concat: {
      all: {
        mainFiles: {
          'jquery-requestAnimationFrame': 'src/jquery.requestAnimationFrame.js',
        },
        dest: '<%= paths.src %>/_src/vendor/vendor.js',
        dependencies: {
          'jquery-requestAnimationFrame': 'jquery'
        },
        bowerOptions: {
          relative: false
        }
      }
    },

    // Concatenate all javascript to source/js/_dist/all.js
    concat: {
      dist: {
        src: ['<%= paths.src %>/_src/vendor/vendor.js', '<%= paths.src %>/_src/modules/all.js'],
        dest: '<%= paths.src %>/_dist/all.js',
      },
    },

    // Minify all javascript to source/js/all.min.js
    uglify: {
      target: {
        files: {
          '<%= paths.src %>/all.min.js': ['<%= paths.src %>/_dist/all.js']
        }
      }
    }


  });

  grunt.registerTask('default', ['bower_concat', 'concat', 'uglify']);

};