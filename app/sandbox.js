const fs = require('fs');
const exec = require('child_process').exec;


module.exports = {
  compile: function(code, success) {
    fs.writeFile("./test_ruby.rb", code, function(err) {
      if (err) return console.log(err);
      exec("ruby test_ruby.rb", function(error, stdout, stderr) {
        success(stdout, stderr);
      });
    });
  }
}
