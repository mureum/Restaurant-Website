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

app.get("/orders:id", async(req,res) => {
    const q = "SELECT * FROM Item WHERE item_ID IN (SELECT item_ID  FROM Item_Diet WHERE diet_ID = 'VGN');"
    client.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data.rows)
    })
})

app.listen(8800, ()=>{
    console.log("Connected to backend!")
})