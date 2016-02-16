var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/adfgvx';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE winners(id SERIAL PRIMARY KEY, name VARCHAR(40) not null)');
query.on('end', function() { client.end(); });
