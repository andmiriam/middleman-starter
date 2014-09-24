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
        dest: '<%= paths.src %>/src/vendor.js',
        dependencies: {
          'jquery-requestAnimationFrame': 'jquery'
        },
        bowerOptions: {
          relative: false
        }
      }
    },

    // Concatenate all javascript to source/js/src/all.js
    concat: {
      dist: {
        src: ['<%= paths.src %>/_src/vendor.js', '<%= paths.src %>/_src/main.js'],
        dest: '<%= paths.src %>/_src/all.js',
      },
    },

    // Minify vendor javascript to source/js/build/vendor.min.js
    // Minify all javascript to source/js/build/all.min.js
    uglify: {
      target: {
        files: {
          '<%= paths.src %>/vendor.min.js': ['<%= paths.src %>/_src/vendor.js'],
          '<%= paths.src %>/all.min.js': ['<%= paths.src %>/_src/vendor.js', '<%= paths.src %>/_src/main.js']
        }
      }
    }


  });

  grunt.registerTask('default', ['bower_concat', 'concat', 'uglify']);

};