import express  from "express"
import pg from 'pg'
import cors from 'cors'

const app = express()
app.use(express.json());



const client = new pg.Client({
  connectionString: "postgresql://alelentini2001:v2_3yhPH_Kpa29MPQdzBAi6Ap8r8ug4d@db.bit.io:5432/alelentini2001/oaxaca",
  ssl: true
})

client.connect((err) => {
    if (err) {
      console.error("Error connecting to PostgreSQL", err.stack);
      process.exit(1);
    }
  });
  
app.use(cors())

app.get("/", (req, res) => {
    try {
        res.json("Hello this is backend")
    }catch (err) {
        return res.json(err)
    }
})

app.get("/logins", async (req,res)=>{
    try {
      const q = "SELECT * FROM logins;"
      client.query(q, (err,data)=>{
        if(err) throw err
        return res.json(data.rows)
      })
    } catch (err) {
      return res.json(err)
    }
  })
  
 
  
  
  

app.listen(8800, ()=>{
    console.log("Connected to backend!")
})
