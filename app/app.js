var express = require('express');
var app = express();

app.get('/compile', function (req, res) {
  res.send('Hello World!')
});

app.listen(3000, function () {
  console.log('App listening on port 3000!')
});
