const express = require('express');
const app = express();
const utils = require("./utils");
const sandbox = require("./sandbox");
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 8080;

// this will let us get the data from a POST
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendfile("./index.html");
});

app.post('/compile', function(req, res) {
  const langId = req.body.langId;
  const code = req.body.code;
  const stdIn = req.body.stdIn;

  sandbox.compile(code, function(stdout, stderr) {
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
