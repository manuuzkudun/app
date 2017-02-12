const express = require('express');
const app = express();
const utils = require("./utils");

app.get('/compile', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  const randomString = utils.randomString(10);
  console.log(randomString);
  console.log('App listening on port 3000!')
});
