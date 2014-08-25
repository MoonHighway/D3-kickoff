module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: [
                "*.js",
                "*.json"
            ],
            options: {
                jshintrc: ".jshintrc"
            }
        },
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'https://github.com/MoonTahoe/d3-intro.git',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
            }
        },
        markdown: {
            all: {
                files: [
                    {
                        expand: true,
                        src: 'readme.md',
                        dest: 'class-files',
                        ext: '.html',
                        rename: function (dest, src) {
                            if (src == 'readme.html') {
                                src = 'index.html';
                            }
                            return dest + "/" + src;
                        }
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-markdown');

    grunt.registerTask('convert', ['markdown']);
    grunt.registerTask('check', ['jshint']);
    grunt.registerTask('default', ['check', 'convert', 'bump']);

};