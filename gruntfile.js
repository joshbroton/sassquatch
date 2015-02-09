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

//for zip creation
var dateHash = function() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    var date = yyyy + '-' + mm + '-' + dd + '.' + today.getTime();
    return date;
}
