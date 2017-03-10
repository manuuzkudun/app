const express = require('express');
const app = express();
const compilers = require('./compilers');
const extensions = require('./extensions');
const utils = require("./utils");
const sandBox = require("./sandbox");
const bodyParser = require('body-parser');
const parser = require('./parser');

const port = process.env.PORT || 8080;



// This will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', function(req, res){
  res.sendfile("./index.html");
});

app.post('/compile', function(req, res) {

  const languageName = req.body.language;
  const code = req.body.code;
  const stdIn = req.body.stdIn || '';
  const testCode = req.body.test || null;

  const folder= 'temp/' + utils.randomString(10);
  const path= __dirname + "/";
  const vmName=  compilers[languageName.toLowerCase()]; //name of virtual machine that we want to execute
  const timeout=20;//Timeout Value, In Seconds
  const compiler = compilers[languageName.toLowerCase()];
  const codeFilename = "code." + extensions[languageName.toLowerCase()];
  const testFilename = "test." + extensions[languageName.toLowerCase()];
  // Initialize Docker sandbox
  const dockerSandbox = new sandBox({
    timeout: timeout,
    path: path,
    folder: folder,
    vmName: vmName,
    compiler: compiler,
    codeFilename: codeFilename,
    testFilename: testFilename,
    code: code,
    testCode: testCode,
    languageName: languageName,
    stdIn: stdIn
  });

  //data will contain the output of the compiled/interpreted code
  //the result maybe normal program output, list of error messages or a Timeout error
  dockerSandbox.run(function(data,exec_time,err){
    data = testCode ? parser.parseStdOut(data) : data;
    res.json({
      languageName: languageName,
      code: code,
      stdIn: stdIn,
      output: data,
      errors: err
    });
  });

});

app.listen(port, function () {
  console.log('App listening on port ' +  port)
});
