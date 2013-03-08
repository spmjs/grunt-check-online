
var url = require('url');
var path = require('path');
var async = require('async');

module.exports = function(grunt) {
  grunt.registerMultiTask('check-online', 'Check if the file is online.', function() {

    var options = this.options({
      // status code should be option.statusCode
      statusCode: 404,
      server: 'http://localhost'
    });
    options.server = options.server.replace(/\/$/, '')

    var done = this.async();
    var filename, destfile;


    async.each(this.files, function(fileObj, cb) {
      check(fileObj, cb)
    }, function(err) {
      if (err) {
        grunt.log.error('Error ' + err);
        return false;
      }
      done();
    });

    function check(fileObj, cb) {
      async.each(fileObj.src, function(filepath, cb) {
        if (fileObj.cwd) {
          filename = filepath;
          filepath = path.join(fileObj.cwd, filepath);
        } else {
          filename = path.relative(fileObj.orig.cwd, filepath);
        }
        destfile = path.join(fileObj.dest, filename);
        checkCode(destfile, cb)
      }, function(err) {
        cb(err);
      });
    }

    function checkCode(destfile, callback) {
      destfile = destfile.replace(/\\/g, '/');
      var uri = options.server + '/' + destfile.replace(/^\//, '');
      grunt.log.writeln('Check ' + uri);

      var parsed = url.parse(uri);
      var connect = require(parsed.protocol.slice(0, -1));

      connect.get(parsed, function(res) {
        if (res.statusCode !== options.statusCode) {
          callback('Status Code: ' + res.statusCode);
        } else {
          callback();
        }
      });
    }
  });
};
