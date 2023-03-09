const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
    user: 'boladale',
    host: 'db.bit.io',
    database: 'alelentini2001/oaxaca', 
    password: 'v2_3z5Rc_3Y3niQU6FKgG7DwzMQZYzsq',
    port: 5432,
    ssl: true,
});

// Read the HTML file
const html = fs.readFileSync("waiterCall.html", "utf-8");

// Create a new DOM for the HTML document
const dom = new JSDOM(html);
const document = dom.window.document;

function callWaiter() {
    const tableNumber = document.getElementById("table").value;
    const problemDescription = document.getElementById("problem").value;

    if ((tableNumber === "") || (problemDescription === "")){
        window.alert("Please enter your table number and Problem Description!");
    } else {
        window.alert("Your request has been sent.");   
        waiterCallInfo(tableNumber, problemDescription);
    }   
}

function waiterCallInfo(tableNumber, problemDescription) {
    let myquery = `INSERT INTO test_Call VALUES (${tableNumber}, '${problemDescription}');`;

    pool.query(myquery,[tableNumber, problemDescription], (err, res) => {
        console.table(res.rows);
    });
}

let table = "test_Call";
let myquery2 = `SELECT * FROM ${table};`;

pool.query(myquery2, (err, res) => {
    console.table(res.rows);
});


console.log(document.getElementById("problem").value);