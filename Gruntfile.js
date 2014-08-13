module.exports = function(grunt) {

  grunt.initConfig({

    concat: {
      js: {
        src: [
          'bower_components/angular/angular.js',
          'bower_components/chroma-js/chroma.js',
          'node_modules/lodash/dist/lodash.js',
          'js/clutch.js',
          'js/*/*.js'
        ],
        dest: 'public/js/clutch.js'
      }
    },

    connect: {
      dev: {
        options: {
          port: 3333,
          base: 'public',
          livereload: 35729,
          open: true
        }
      }
    },

    jade: {
      build: {
        files: [{
          expand: true,
          cwd:    'jade/',
          src:    ['**/*.jade'],
          dest:   'public/',
          ext:    '.html',
        }]
      }
    },

    jshint: {
      files: ['js/**/*.js'],
      options: {
        jshintrc: true
      }
    },

    stylus: {
      build: {
        options: {
        },
        files: {
          'public/css/gooey.css': 'styl/gooey.styl'
        }
      }
    },

    watch: {
      options: {
        livereload: {
          files: ['public/**/*'],
          port: 35729,
          base: '/public'
        }
      },
      js: {
        files: ['js/**/*.js'],
        tasks: ['concat:js'],
        options: {
          atBegin: true,
          interrupt: true
        }
      },
      jade: {
        files: 'jade/**/*.jade',
        tasks: ['jade:build'],
        options: {
          atBegin: true,
          interrupt: true
        }
      },
      stylus: {
        files: 'styl/**/*.styl',
        tasks: ['stylus:build'],
        options: {
          atBegin: true,
          interrupt: true
        }
      }
    }

  })

  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-contrib-jade')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-stylus')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-rework')

  grunt.registerTask('default', ['jshint', 'jade:build', 'stylus:build', 'concat:js'])
  grunt.registerTask('dev', ['default', 'connect:dev', 'watch'])

}
