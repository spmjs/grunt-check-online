/*
 * grunt-scp
 * https://github.com/spmjs/grunt-scp
 *
 * Copyright (c) 2013 Hsiaoming Yang
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    'check-online': {
      tasks: {
        options: {
          statusCode: 200,
          server: 'https://a.alipayobjects.com/'
        },
        files: [{
          cwd: 'tasks',
          src: '**/*',
          dest: '<%= pkg.name %>/<%= pkg.version %>'
        }]
      },
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['check-online']);
};
