const fs = require('fs');
const exec = require('child_process').exec;

// module.exports.compile = function (code, test, success) {
//   fs.writeFile("./temp/code.rb", code, function(err) {
//     if (err) return console.log(err);
//     fs.writeFile("./temp/test.rb", test, function(err) {
//       if (err) return console.log(err);
//       exec("ruby ./temp/test.rb", function(error, stdout, stderr) {
//         success(stdout, stderr);
//         console.log(stdout);
//       });
//     });
//   });
// }

module.exports.compile = function (code, test, success) {
  fs.writeFile("./temp/code.rb", code, function(err) {
    if (err) return console.log(err);
    fs.writeFile("./temp/test.rb", test, function(err) {
      if (err) return console.log(err);
      exec("ruby ./temp/code.rb", function(error, stdout, stderr) {
        success(stdout, stderr);
        console.log(stdout);
      });
    });
  });
}
