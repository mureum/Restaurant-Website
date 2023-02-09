import express  from "express"
import pg from 'pg'
import cors from 'cors'

const app = express()
app.use(express.json());

const client = new pg.Client({
  connectionString: "postgresql://alelentini2001:v2_3yhPH_Kpa29MPQdzBAi6Ap8r8ug4d@db.bit.io:5432/alelentini2001/oaxaca",
  ssl: true
})

client.connect()
app.use(cors())

app.listen(8800, ()=>{
    console.log("Connected to backend!")
})


app.post("/logins", (req,res)=>{
    const q = "SELECT * FROM logins WHERE ? = username AND ? = password;"
    client.query(q, (err,result)=>{
        if (err) {
            console.log(err);
        }

        if(result.length > 0){
            res.send(result);
        } else {
            res.send({message : "Wrong login."})
        }
    })
})
