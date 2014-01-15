var url = require('url');
var path = require('path');
var async = require('async');

// http://stackoverflow.com/questions/11322709/nodejs-https-client-errors-400
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

module.exports = function(grunt) {
  grunt.registerMultiTask('check-online', 'Check if the file is online.', function() {

    var options = this.options({
      // status code should be option.statusCode
      statusCode: 404,
      server: 'http://localhost',
      onFailure: null
    });
    options.server = options.server.replace(/\/$/, '')

    var done = this.async();
    var filename;

    var distfiles = [];
    this.files.forEach(function(fileObj) {
      fileObj.src.forEach(function(filepath) {
        if (fileObj.cwd) {
          filename = filepath;
          filepath = path.join(fileObj.cwd, filepath);
        } else {
          filename = path.relative(fileObj.orig.cwd || '', filepath);
        }
        distfiles.push(path.join(fileObj.dest, filename));
      });
    });

    async.each(distfiles, checkCode, function(err) {
      if (err) {
        grunt.log.write(err);
        options.onFailure && options.onFailure();
        done(false);
        return false;
      }
      done();
    });

    function checkCode(destfile, callback) {
      destfile = destfile.replace(/\\/g, '/');
      var uri = options.server + '/' + destfile.replace(/^\//, '');
      grunt.log.writeln('Check ' + uri);

      var parsed = url.parse(uri);
      var connect = require(parsed.protocol.slice(0, -1));

      // http://stackoverflow.com/questions/12060869/why-is-node-js-only-processing-six-requests-at-a-time
      parsed.agent = false;

      connect.get(parsed, function(res) {
        if (res.statusCode !== options.statusCode) {
          callback('Check ' + 'Status Code: ' + res.statusCode);
        } else {
          callback();
        }
      }).on('error', function(e) {
        if (404 !== options.statusCode) {
          callback('Check ' + 'Status Code: ' + 404);
        } else {
          callback();
        }
      });
    }
  });
};

