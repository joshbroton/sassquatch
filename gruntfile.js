module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                    "dev/css/styles.css": "dev/scss/styles.scss"
                }
            }
        },
        watch: {
            livereload: {
                options: { livereload: true },
                files: ['dev/css/*.css', 'dev/js/*.js', 'dev/index.html']
            },
            sass: {
                files: 'dev/scss/*.scss',
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
