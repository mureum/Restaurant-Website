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
    try {
      const q = "SELECT * FROM item;"
      client.query(q, (err,data)=>{
        if(err) throw err
        return res.json(data.rows)
      })
    } catch (err) {
      return res.json(err)
    }
  })
  
  app.get("/orders/diets/:id", async(req,res) => {
    try {
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
        if(err) throw err
        return res.json(data.rows)
      })
    } catch (err) {
      return res.json(err)
    }
  })
  
  app.get("/orders/allergens/:id", async(req,res) => {
    try {
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
        if(err) throw err
        return res.json(data.rows)
      })
    } catch (err) {
      return res.json(err)
    }
  })

  app.get("/orders/itemAndAllergens/:diet/:allergen", async (req, res) => {
    try {
      const diet = req.params.diet;
      const allergen = req.params.allergen;
      const arrayItem = diet.split(",").map(item => item.trim());
      const arrayAllergen = allergen.split(",").map(item => item.trim());
      const diet_length = arrayItem.length;
      const allergen_length = arrayAllergen.length;
      const q = `SELECT i.*
      FROM item i
      WHERE 
        item_ID IN 
        (SELECT item_ID 
         FROM item_allergen 
         WHERE allergen_id IN (${allergen})) 
        AND 
        item_ID IN 
        (SELECT item_ID 
         FROM item_diet 
         WHERE diet_id IN (${diet})) 
         AND 
         (SELECT COUNT(*) FROM item_allergen 
          WHERE item_ID = i.item_ID AND allergen_id IN 
          (${allergen})) = ${allergen_length}
         AND 
         (SELECT COUNT(*) FROM item_diet 
          WHERE item_ID = i.item_ID AND diet_id IN 
          (${diet})) = ${diet_length};`
      client.query(q, (err,data)=>{
        if(err) throw err
        return res.json(data.rows)
      })
    } catch (err) {
      return res.json(err);
    }
  });
  

app.listen(8800, ()=>{
    console.log("Connected to backend!")
})

