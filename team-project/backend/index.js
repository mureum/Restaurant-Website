import express  from "express"
const app = express()
app.use(express.json());

import pg from 'pg'
import cors from 'cors'


const client = new pg.Client({
  connectionString: "postgresql://alelentini2001:v2_3yhPH_Kpa29MPQdzBAi6Ap8r8ug4d@db.bit.io:5432/alelentini2001/oaxaca",
  ssl: true
})

client.connect()
app.use(cors())

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