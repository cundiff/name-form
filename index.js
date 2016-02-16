var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser());

app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('index');
});

app.post('/', function(req, res){
  var userName = req.body.userName;
  res.render('fame', {name: userName});
});

app.listen(app.get('port'));
