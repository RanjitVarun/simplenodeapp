var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();
const { Pool } = require('pg');


var http = require('http');
var server = http.Server(app);

app.use(express.static('client'));
app.get('/route', (req, res) => res.send(showTimes()))

server.listen(PORT, function() {
  console.log('server running');
});


const pool = new Pool({
  // connectionString: process.env.DATABASE_URL,
  connectionString:'postgres://azhghldthuhaoq:498d7e4f039bc9ac679c99b0e6ed4ff7a04cdf491cd5ee6a20c583b7fb490e52@ec2-107-21-200-103.compute-1.amazonaws.com:5432/dbba9oh0kb5rl2';
  ssl: true
});

app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM test_table');
    const results = { 'results': (result) ? result.rows : null};
    res.render('pages/db', results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})



showTimes = () => {
  let result = ''
  const times = process.env.TIMES || 5
  for (i = 0; i < times; i++) {
    result += i + ' '
  }
  return result;
}