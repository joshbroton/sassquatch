module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                    "tests/tests.css": "tests/tests.scss"
                }
            }
        },
        watch: {
            livereload: {
                options: { livereload: true },
                files: ['tests/*']
            },
            sass: {
                files: 'tests/*.scss',
                tasks: ['sass']
            },
            scripts: {
                files: 'dev/js/app/*.js',
                tasks: 'concat:watch'
            }
        },
        connect: {
            server: {
                options: {
                    port: 8888,
                    hostname: '*',
                    livereload: true,
                    open: true,
                    base: 'dev'
                }
            },
            buildTest: {
                options: {
                    port: 8888,
                    hosthame: '*',
                    open: true,
                    base: 'build',
                    keepalive: true
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('server', [
        'sass',
        'connect:server',
        'watch'
    ]);
};
