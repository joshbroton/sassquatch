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
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'dev',
                        src: '**',
                        dest: 'build/'
                    }
                ]
            }
        },
        cssmin: {
            combine: {
                files: {
                    'build/css/styles.min.css': 'build/css/styles.css'
                }
            }
        },
        concat: {
            build: {
                src: ['build/js/app/*.js'],
                dest: 'build/js/app/concat.js'
            },
            watch: {
                src: ['dev/js/app/*.js'],
                dest: 'dev/js/app.js'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'build/js/app.min.js': 'build/js/app/concat.js'
                }
            }
        },
        clean: {
            build: ['build'],
            cleanup: [
                'build/js/*.js',
                '!build/js/*.min.js',
                'build/js/app',
                'build/css/styles.css',
                'build/css/*.map',
                'build/img/uncompressed',
                'build/scss'
            ],
            afterCacheBust: [
                'build/js/*.min.js',
                'build/css/*.min.css'
            ]
        },
        replace: {
            sources: {
                src: ['build/index.html'],
                dest: 'build/index.html',
                replacements: [{
                    from: /\"js\/[a-z,0-9,.]*.js\"/g,
                    to: function(matchedWord) {
                        if(matchedWord.indexOf('.min.js') == -1) {
                            console.log(matchedWord);
                            return matchedWord.replace('.js', '.min.js');
                        }
                        return matchedWord;
                    }
                },{
                    from: /\"css\/[a-z,0-9,.]*.css\"/g,
                    to: function(matchedWord) {
                        if(matchedWord.indexOf('.min.css') == -1) {
                            console.log(matchedWord);
                            return matchedWord.replace('.css', '.min.css');
                        }
                        return matchedWord;
                    }
                },{
                    from: 'favicon.ico',
                    to: 'favicon.' + Math.floor((Math.random()*10000000)+1) + '.ico'
                }]
            }
        },
        cacheBust: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8,
                baseDir: 'build',
                ignorePatterns: ['img']
            },
            assets: {
                files: [{
                    src: ['build/index.html']
                }]
            }
        },
        compress: {
            build: {
                options: {
                    archive: 'build.' + dateHash() + '.zip'
                },
                files: [
                    {
                        src: ['build/**'],
                        dest: '/'
                    }
                ]
            }
        }
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
