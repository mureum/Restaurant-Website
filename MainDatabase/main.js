const { Pool } = require('pg');

// Create a connection pool using the connection information provided on bit.io.
const pool = new Pool({
    user: 'boladale',
    host: 'db.bit.io',
    database: 'alelentini2001/oaxaca', // public database 
    password: 'v2_3z5Rc_3Y3niQU6FKgG7DwzMQZYzsq', // key from bit.io database page connect menu
    port: 5432,
    ssl: true,
});


pool.query("SELECT * FROM Item;", (err, res) => {
    console.table(res.rows);
});

pool.query("SELECT * FROM allergen;", (err, res) => {
    console.table(res.rows);
});