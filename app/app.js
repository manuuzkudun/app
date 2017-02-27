const express = require('express');
const app = express();
const utils = require("./utils");
const sandbox = require("./sandbox");
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 8080;

// app.use(cors());
// This will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.all('*', function(req, res, next)
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', function(req, res){
  res.sendfile("./index.html");
});

app.post('/compile', function(req, res) {
  const langId = req.body.langId;
  const code = req.body.code;
  const stdIn = req.body.stdIn;
  const test = req.body.test;

  console.log('here is what we get ' + req)

  sandbox.compile(code, test, function(stdout, stderr) {
    console.log('error we get' + stderr);
    res.json({
      langId: langId,
      code: code,
      stdIn: stdIn,
      output: stdout,
      errors: stderr
    });
  });
});


app.listen(port, function () {
  console.log('App listening on port ' +  port)
});
