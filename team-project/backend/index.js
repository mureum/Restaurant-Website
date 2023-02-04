const express = require('express')
const app = express()
app.use(express.json());

const { Client } = require('pg')

const client = new Client({
  connectionString: "postgresql://alelentini2001:v2_3yhPH_Kpa29MPQdzBAi6Ap8r8ug4d@db.bit.io:5432/alelentini2001/menu",
  ssl: true
})

client.connect()

app.get("/", (req, res) => {
    res.json("Hello this is backend")
})

app.get("/orders", async (req,res)=>{
    const q = "SELECT * FROM item;"
    client.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data.rows)
    })
})

app.listen(8800, ()=>{
    console.log("Connected to backend!")
})