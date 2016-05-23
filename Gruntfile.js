module.exports = function(grunt) {

  grunt.initConfig({

    concat: {
      js: {
        src: [
          'bower_components/angular/angular.js',
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
      },
      stage: {
        options: {
          port: 3333,
          base: 'public',
          open: true,
          keepalive: true
        }
      }
    },

    jade: {
      dev: {
        options: {
          data: {
            ENV: { dev: true }
          }
        },
        files: [{
          expand: true,
          cwd:    'jade/',
          src:    ['**/*.jade'],
          dest:   'public/',
          ext:    '.html',
        }]
      },
      stage: {
        options: {
          data: {
            ENV: { dev: false, stage: true, prod: false }
          }
        },
        files: [{
          expand: true,
          cwd:    'jade/',
          src:    ['**/*.jade'],
          dest:   'public/',
          ext:    '.html',
        }]
      },
      prod: {
        options: {
          data: {
            ENV: { dev: false, stage: false, prod: true }
          }
        },
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
      files: ['js/**/*.js', '!js/vendor/*.js'],
      options: {
        jshintrc: true
      }
    },

    stylus: {
      dev: {
        options: {
        },
        files: {
          'public/css/gooey.css': 'styl/gooey.styl'
        }
      }
    },

    uglify: {
      prod: {
        files: {
          'public/js/clutch.min.js': ['public/js/clutch.js']
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
        tasks: ['jade:dev'],
        options: {
          atBegin: true,
          interrupt: true
        }
      },
      stylus: {
        files: 'styl/**/*.styl',
        tasks: ['stylus:dev'],
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
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('default',                     ['jshint', 'stylus:dev', 'concat:js'])
  grunt.registerTask('dev',     'Build & Watch',    ['default', 'jade:dev', 'connect:dev', 'watch'])
  grunt.registerTask('stage',   'Build & Test',     ['default', 'jade:stage', 'uglify', 'connect:stage'])
  grunt.registerTask('prod',    'Build for Deploy', ['default', 'jade:prod', 'uglify'])

}
