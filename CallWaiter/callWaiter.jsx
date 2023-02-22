import React from 'react';
import { useState } from "react";
import { JSDOM } from "jsdom";
import { Pool } from 'pg';
import fs from 'fs';

const pool = new Pool({
  user: 'boladale',
  host: 'db.bit.io',
  database: 'alelentini2001/oaxaca', 
  password: 'v2_3z5Rc_3Y3niQU6FKgG7DwzMQZYzsq',
  port: 5432,
  ssl: true,
});

const html = fs.readFileSync("waiterCall.html", "utf-8");
const dom = new JSDOM(html);
const document = dom.window.document;

function callWaiter(event) {
  const tableNumber = document.getElementById("table").value;
  const problemDescription = document.getElementById("problem").value;

  if ((tableNumber === "") || (problemDescription === "")) {
    window.alert("Please enter your table number and problem description!");
  } else {
    window.alert("Your request has been sent.");   
    waiterCallInfo(tableNumber, problemDescription);
  }   
  event.preventDefault();
}

function waiterCallInfo(tableNumber, problemDescription) {
  let myquery = `INSERT INTO test_Call VALUES (${tableNumber}, '${problemDescription}');`;

  pool.query(myquery, [tableNumber, problemDescription], (err, res) => {
    console.table(res.rows);
  });
}

function WaiterCall() {
  const [table, setTable] = useState("");
  const [problem, setProblem] = useState("");

  const handleSubmit = (event) => {
    callWaiter(event);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{margin: "100px", border: "2px solid rgb(11, 79, 110)", borderRadius: "10px", padding: "35px", backgroundColor: "rgb(223, 223, 223)"}}>
        <div className="mb-3">
          <label className="form-label">Table Number *</label>
          <input
            type="number"
            className="form-control"
            id="table"
            placeholder="Enter your table number"
            value={table}
            onChange={(e) => setTable(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Problem Description</label>
          <input
            type="text"
            className="form-control"
            id="problem"
            placeholder="Describe your issue if possible"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          />
        </div>
        <div style={{display: "flex", justifyContent: "center"}}>
          <button
            type="submit"
            id="call"
            className="btn btn-secondary"
          >
            Call for Waiter
          </button>
        </div>
      </div>
    </form>
  );
}

export default WaiterCall;
