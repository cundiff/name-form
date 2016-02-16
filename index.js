var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
var app = express();

var db_url = process.env.DATABASE_URL || 'postgres://localhost:5432/adfgvx';

pg.connect(db_url, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});

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
