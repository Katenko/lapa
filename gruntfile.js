'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        project: {
            javascript: {
                ours: ['madmin/source/js/app.js', 'madmin/source/js/**/*.js', 'madmin/source/js/functions.js']
            },
            secret: grunt.file.readJSON('./secret.json'),
            pkg: grunt.file.readJSON('./package.json')
        },
        concat: {
            javascript_ours: {
                options: {
                    banner: '"use strict";\n'
                },
                src: '<%= project.javascript.ours %>',
                dest: 'madmin/app/js/main.js'
            }
        },
        jshint: { //собираем главный js из наших скриптов ангуляра, сторонние не входят (потом выполняется конкат)
            options: {
                strict: false,
                eqnull: true,
                loopfunc: true,
                laxbreak: true,
                debug: true,
                globals: {
                    angular: true,
                    $: true,
                    _: true
                }
            },
            all: '<%= project.javascript.ours %>'
        },
        copy: { //копируем скрипты сторонних библиотек, библиотек, которые мы засунули в third, так как изменяем и html-файлы + статические файлы
            main: {
                nonull: true,
                files: [
                    {
                        dest: 'madmin/app/js/libs/jquery.min.js',
                        src: 'madmin/source/bower_components/jquery/jquery.min.js'
                    },
                    {
                        dest: 'madmin/app/js/libs/jquery-ui.min.js',
                        src: 'madmin/source/bower_components/jquery-ui/jquery-ui.min.js'
                    },
                    {
                        dest: 'madmin/app/js/libs/angular.js',
                        src: 'madmin/source/bower_components/angular/angular.js'
                    },
                    {
                        dest: 'madmin/app/js/libs/angular-route.js',
                        src: 'madmin/source/bower_components/angular-route/angular-route.js'
                    },
                    {
                        dest: 'madmin/app/js/libs/angular-ui-router.js',
                        src: 'madmin/source/bower_components/angular-ui-router.js'
                    },
                    {
                        dest: 'madmin/app/js/libs/ocLazyLoad.js',
                        src: 'madmin/source/bower_components/ocLazyLoad.js'
                    },
                    {
                        dest: 'madmin/app/js/libs/d3.v3.min.js',
                        src: 'madmin/source/bower_components/d3.v3.min.js'
                    },
                    {
                        dest: 'madmin/app/js/libs/ui-bootstrap.js',
                        src: 'madmin/source/bower_components/angular-bootstrap/ui-bootstrap.js'
                    },
                    {
                        dest: 'madmin/app/js/libs/highstock.js',
                        src: 'madmin/source/bower_components/highstock-release/highstock-all.js'
                    },
                    {
                        dest: 'madmin/app/js/libs/highstock-drilldown.js',
                        src: 'madmin/source/bower_components/highstock-release/modules/drilldown.js'
                    },
                    {
                        dest: 'madmin/app/js/libs/highmaps.js',
                        src: 'madmin/source/bower_components/highmaps-release/highmaps.js'
                    },
                    {
                        dest: 'madmin/app/js/libs/lodash.js',
                        src: 'madmin/source/bower_components/lodash/lodash.js'
                    },
                    {
                        dest: 'madmin/app/js/libs/angular-ui-sortable.js',
                        src: 'madmin/source/bower_components/angular-ui-sortable/sortable.js'
                    },
                    {
                        dest: 'madmin/app/js/libs/moment.js',
                        src: 'madmin/source/bower_components/moment/moment.js'
                    },
                    {
                        expand: true,
                        dest: 'madmin/app/resources',
                        cwd: 'madmin/source/resources',
                        src: '**/*'
                    },
                    {
                        expand: true,
                        dest: 'madmin/app/templates',
                        cwd: 'madmin/source/html/templates',
                        src: '**/*'
                    },
                    {
                        expand: true,
                        dest: 'madmin/app/third',
                        cwd: 'madmin/source/third',
                        src: '**/*'
                    },
                    {
                        expand: true,
                        dest: 'madmin/app/css',
                        cwd: 'madmin/source/css',
                        src: '**/*'
                    },
                    {
                        expand: true,
                        dest: 'madmin/app/fonts',
                        cwd: 'madmin/source/fonts',
                        src: '**/*'
                    },
                    {
                        expand: true,
                        dest: 'madmin/app/images',
                        cwd: 'madmin/source/images',
                        src: '**/*'
                    },
                    {
                        expand: true,
                        dest: 'madmin/app/swf',
                        cwd: 'madmin/source/swf',
                        src: '**/*'
                    },
                    {
                        dest: 'madmin/app/index.html',
                        src: 'madmin/source/html/index.html'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build', ['jshint', 'concat', 'copy']);
    grunt.registerTask('js', ['jshint', 'concat']);
    grunt.registerTask('static', ['copy']);
};
