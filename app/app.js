const express = require('express');
const app = express();
const utils = require("./utils");
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();

const port = process.env.PORT || 3000;

// this will let us get the data from a POST
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.post('/compile', function(req, res) {
  const langId = req.body.langId;
  const code = req.body.code;
  const stdin = req.body.stdin;
  res.json({
    langId: langId,
    code: code,
    stdIn: stdIn
  });
});

app.use('/api', router);

app.listen(port, function () {
  console.log('App listening on port 3000!')
});
