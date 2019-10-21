var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();
const {Pool}=require('pg');

var http = require('http');
var server = http.Server(app);

app.use(express.static('client'));


server.listen(PORT, function() {
  console.log('server running');
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  
   ssl: true
});


//   pool.connect();
// pool.query('Select * from Employee;' , (err,res) =>{
//   if(err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   pool.end();
// });


app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM Employee');
    const results = { 'results': (result) ? result.rows : null};
   res.send(results);

  } catch (err) {
    console.error(err);
  res.send("Error " + err);
  }
})



 