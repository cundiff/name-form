var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(process.env.port || 3000, function () {
  console.log('Example app listening on port 3000!');
});
