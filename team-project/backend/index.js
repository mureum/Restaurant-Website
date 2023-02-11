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

app.get("/orders/diets/:id", async(req,res) => {
    const id = req.params.id;
    const array = id.split(",").map(item => item.trim());
    const id_length = array.length;
    const q = `SELECT i.*
    FROM item i
    WHERE 
      (SELECT COUNT(*) FROM Item_Diet 
      WHERE item_ID = i.item_ID AND diet_ID IN 
      (${id})) = ${id_length};`
    client.query(q, (err,data)=>{
    if(err) return res.json(err)
    return res.json(data.rows)
    })
    })

    app.get("/orders/allergens/:id", async(req,res) => {
        const id = req.params.id;
        const array = id.split(",").map(item => item.trim());
        const id_length = array.length;
        const q = `SELECT i.*
        FROM item i
        WHERE 
          (SELECT COUNT(*) FROM item_allergen 
          WHERE item_ID = i.item_ID AND allergen_id IN 
          (${id})) = ${id_length};`
        client.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data.rows)
        })
        })

app.listen(8800, ()=>{
    console.log("Connected to backend!")
})

