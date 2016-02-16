var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
var app = express();

var db_url = process.env.DATABASE_URL || 'postgres://localhost:5432/adfgvx';

app.use(bodyParser());

app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('index');
});

app.post('/', function(req, res){
  var userName = req.body.userName;
  var winners = [];

  pg.connect(db_url, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    client.query("INSERT INTO winners(name) values($1)", [userName]);

    var query = client.query("SELECT * FROM winners ORDER BY id ASC");

    query.on('row', function(row) {
      winners.push(row);
    });

    query.on('end', function() {
      done();
      res.render('fame', {winners: winners});
    });
  });
});

app.listen(app.get('port'));
