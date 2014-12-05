module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ' '
      },
      dist: {
        // the files to concatenate
        src: ['src/draw_adapter.js',
              'src/field.js',
              'src/figure.js',
              'src/figure_builder.js',
              'src/game.js',
              'src/app.js'],
        // the location of the resulting JS file
        dest: 'concated.js'
      }
    },

    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! release: <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        preserveComments: false
      },
      dist: {
        files: {
          'index.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    jshint: {
      // define the files to lint
      files: ['gruntfile.js', 'src/**/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
          // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // the default task can be run just by typing "grunt" on the command line
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('hint', ['jshint']);
};
