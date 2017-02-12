const fs = require('fs');
const child_process = require('child_process');


module.exports = {
  compile: function() {
    child_process.exec("ruby test_ruby.rb", function(error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      return { stdOut: stdout, stdErr: stderr }
    });
  }
}
