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

  app.get("/images", async (req,res)=>{
    try {
      const q = "SELECT * FROM images;"
      client.query(q, (err,data)=>{
        if(err) throw err
        return res.json(data.rows)
      })
    } catch (err) {
      return res.json(err)
    }
  })

app.get("/pendingOrders", async (req,res)=> {
    try {
        const q = "SELECT * FROM waiter_calls;"
        client.query(q, (err,data)=>{
          if(err) throw err
          return res.json(data.rows)
        })
      } catch (err) {
        return res.json(err)
      }
})

app.get("/currentOrders", async (req,res)=> {
  try {
      const q = "SELECT * FROM inpreparation;"
      client.query(q, (err,data)=>{
        if(err) throw err
        return res.json(data.rows)
      })
    } catch (err) {
      return res.json(err)
    }
})

app.get("/logins", async (req,res)=> {
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

app.get("/readyOrders", async (req,res)=> {
  try {
      const q = "SELECT * FROM ready_orders;"
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
  

app.get("/logins", async (req,res)=>{
  try {
    const q = "SELECT * FROM logins;"
    client.query(q, (errors,datas)=>{
      if(errors) throw errors
      return res.json(datas.rows)
    })
  } catch (errors) {
    return res.json(errors)
  }
})

app.put("/orders/unavailable/:id", async(req,res) => {
    try {
      const id = req.params.id;
      const q = `UPDATE Item
        SET is_available = false
        WHERE item_ID = '${id}';`
      client.query(q, (err,data)=>{
        if (err) return res.json(err);
        return res.json("Item has been updated successfully")
      })
    } catch (err) {
      return res.json(err)
    }
  })

  app.put("/logins/update/:prevUsername/:username/:password", async (req, res) => {
    try {
      const prevUsername = req.params.prevUsername;
      const username = req.params.username;
      const password = req.params.password;
      const q = `UPDATE logins
        SET username = '${username}', password = '${password}'
        WHERE username = '${prevUsername}';`;
      client.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json("User has been updated successfully");
      });
    } catch (err) {
      return res.json(err);
    }
  });
  
  

  app.put("/orders/available/:id", async(req,res) => {
    try {
      const id = req.params.id;
      const q = `UPDATE Item
        SET is_available = true
        WHERE item_ID = '${id}';`
      client.query(q, (err,data)=>{
        if (err) return res.json(err);
        return res.json("Item has been updated successfully")
      })
    } catch (err) {
      return res.json(err)
    }
  })

  app.put("/orders/waiter/:table/:customerName/:time/:itemList", async (req, res) => {
    try {
      const table = parseInt(req.params.table);
      const name = req.params.customerName;
      const time = req.params.time;
      const itemList = req.params.itemList;
  
      // Retrieve the maximum order number from the totalorders table
      const maxOrderNumberQuery = `SELECT MAX(order_no) as max_order_no FROM totalorders`;
      const { rows } = await client.query(maxOrderNumberQuery);
      const maxOrderNumber = parseInt(rows[0].max_order_no) || 0;
  
      // If the maximum order number has reached 1000, clear the totalorders table
      if (maxOrderNumber === 1000) {
        const clearTable = `DELETE FROM totalorders;`;
        await client.query(clearTable);
      }
  
      // Increment the order number
      const orderNumber = maxOrderNumber + 1;
  
      // Insert the new order into the waiter_calls and totalorders tables
      const insertQuery = `INSERT INTO waiter_calls (table_no, order_no, customer_name, time, order_description) 
                            VALUES (${table}, ${orderNumber}, '${name}', TIME '${time}', '${itemList}');
                            INSERT INTO totalorders (table_no, order_no, customer_name, time, order_description) 
                            VALUES (${table}, ${orderNumber}, '${name}', TIME '${time}', '${itemList}')`;
  
      await client.query(insertQuery);
  
      console.log("Success");
      return res.json("Item has been updated successfully");
    } catch (err) {
      console.log("Error");
      return res.json(err);
    }
  });
  

app.post("/sendToKitchen", async (req, res) => {
  try {
    const orders = req.body.orders;

    if (orders.length === 0) {
      res.status(400).json({ error: "Please select at least one order to send to kitchen" });
      return;
    }

    const values = orders.map(
      ({ table, orderNumber, customerName, time, details }) =>
        `(${table}, ${orderNumber}, '${customerName}', TIME '${time}', '${details}')`
    );

    const insertQuery = `INSERT INTO inpreparation (table_no, order_no, customer_name, time, order_description) VALUES ${values.join(
      ","
    )};`;

    await client.query(insertQuery);

    const orderNumbers = orders.map((order) => order.orderNumber).join(",");
    const deleteQuery = `DELETE FROM waiter_calls WHERE order_no IN (${orderNumbers})`;

    await client.query(deleteQuery);

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error on sending the orders" });
  }
});

app.post("/makeOrderReady", async (req, res) => {
  try {
    const orders = req.body.orders;

    if (orders.length === 0) {
      res.status(400).json({ error: "Please select at least one order to send to kitchen" });
      return;
    }

    const values = orders.map(
      ({ table, orderNumber, customerName, time, details }) =>
        `(${table}, ${orderNumber}, '${customerName}', TIME '${time}', '${details}')`
    );

    const insertQuery = `INSERT INTO ready_orders (table_no, order_no, customer_name, time, order_description) VALUES ${values.join(
      ","
    )};`;
    

    await client.query(insertQuery);
    const orderNumbers = orders.map((order) => order.orderNumber).join(",");
    const deleteQuery = `DELETE FROM inpreparation WHERE order_no IN (${orderNumbers})`;

    await client.query(deleteQuery);

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error on sending the orders" });
  }
});


app.delete('/deleteUser', async (req, res) => {
  try {
    const usernames = req.body.usernames.map(username => username.replace(/"/g, ''));
    console.log(usernames);
      
    const deleteQuery = `DELETE FROM logins WHERE username IN (${usernames.join(",")})`;

    client.query(deleteQuery, (err, data) => {
      if (err) {
        console.log("Error");
        console.error(err);
        return res.json(err);
      }
      console.log("Users deleted from the database");
      res.json({ success: true });
    });
  } catch (err) {
    console.log("Error");
      return res.json(err);
  }
})


app.delete("/deleteOrder", async (req, res) => {
  try {
    const { orderNumbers } = req.body;

    // Construct a comma-separated string of order numbers to delete
    const orderNumberString = orderNumbers.join(",");

    // Delete all orders with the given order numbers from the database
    const deleteQuery = `DELETE FROM waiter_calls WHERE order_no IN (${orderNumberString})`;

    client.query(deleteQuery, (err, data) => {
      if (err) {
        console.log("Error");
        return res.json(err);
      }
      console.log("Orders deleted from the database");
      res.json({ message: "Orders deleted from the database" });
    });
  } catch (err) {
    console.log("Error");
    return res.json(err);
  }
});

app.delete("/completeOrder", async (req, res) => {
  try {
    const { orderNumbers } = req.body;

    // Construct a comma-separated string of order numbers to delete
    const orderNumberString = orderNumbers.join(",");

    // Delete all orders with the given order numbers from the database
    const deleteQuery = `DELETE FROM ready_orders WHERE order_no IN (${orderNumberString})`;

    client.query(deleteQuery, (err, data) => {
      if (err) {
        console.log("Error");
        return res.json(err);
      }
      console.log("Orders deleted from the database");
      res.json({ message: "Orders deleted from the database" });
    });
  } catch (err) {
    console.log("Error");
    return res.json(err);
  }
});




app.listen(8800, ()=>{
    console.log("Connected to backend!")
})

