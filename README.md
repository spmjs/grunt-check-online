# grunt-check-online

> Check if the file is online

## Getting Started

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-check-online
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-check-online');
```

## The "check-online" task

### Overview

In your project's Gruntfile, add a section named `check-online` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),

  'check-online': {
    options: {
        // the response status code should be 404
        statusCode: 404,
        server: 'http://example.com',
        exitOnFail: true
    },
    your_target: {
        files: [{
            cwd: 'directory',
            src: '**/*',
            // path on the server
            dest: '<%= pkg.name %>/<%= pkg.version %>'
        }]
    },
  },
})
```

### Options


#### options.statusCode
Type: `Number`
Default value: `404`

The response should return this status code.

#### options.server
Type: `String`
Default value: `http://localhost`

The server.

#### options.onFailure
Type: `function`
Default value: `null`

Callback when check failed.

## Changelog

`0.1.2`

Update output for error code.

**June 18th, 2013** `0.1.1`

Add option onFailure.

**April 1st, 2013** `0.1.0`

First version.
