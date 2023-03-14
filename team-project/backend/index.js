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

app.get("/delivered", async (req,res)=>{
  try {
    const q = "SELECT * FROM delivered;"
    client.query(q, (errors,datas)=>{
      if(errors) throw errors
      return res.json(datas.rows)
    })
  } catch (errors) {
    return res.json(errors)
  }
})

app.delete("/delivered", async (req, res) => {
  try {
    const q = "DELETE FROM delivered;"
    client.query(q, (errors, result) => {
      if (errors) throw errors;
      return res.sendStatus(204); // No Content
    });
  } catch (errors) {
    return res.status(500).json(errors);
  }
});

app.delete("/totalorders", async (req, res) => {
  try {
    const q = "DELETE FROM totalorders;"
    client.query(q, (errors, result) => {
      if (errors) throw errors;
      return res.sendStatus(204); // No Content
    });
  } catch (errors) {
    return res.status(500).json(errors);
  }
});


app.get("/waiters", async (req,res)=>{
  try {
    const q = "SELECT * FROM waiters;"
    client.query(q, (errors,datas)=>{
      if(errors) throw errors
      return res.json(datas.rows)
    })
  } catch (errors) {
    return res.json(errors)
  }
})

app.get("/tables", async (req,res)=>{
  try {
    const q = "SELECT * FROM tables;"
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
  
  app.put("/logins/insert/:username/:password/:permission", async (req, res) => {
    try {
      const username = req.params.username;
      const password = req.params.password;
      const permission = req.params.permission;
  
      const checkUsernameQuery = `SELECT COUNT(*) as count FROM logins WHERE username = '${username}'`;
      client.query(checkUsernameQuery, (err, data) => {
        if (err) return res.status(500).json({ error: "Internal Server Error" });
  
        if (data.rows[0].count > 0) {
          return res.status(400).json({ error: `Username '${username}' already exists` });
        } else {
          const insertQuery = `INSERT INTO logins (username, password, permissions)
                                VALUES ('${username}', '${password}', '${permission}');`;
          client.query(insertQuery, (err, data) => {
            if (err) return res.status(500).json({ error: "Internal Server Error" });
            return res.status(200).json({ message: "User has been inserted successfully" });
          });
        }
      });
    } catch (err) {
      return res.status(500).json({ error: "Internal Server Error" });
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

  app.put("/orders/waiter/:table/:customerName/:time/:itemList/:totCost", async (req, res) => {
    try {
      const table = parseInt(req.params.table);
      const name = req.params.customerName;
      const time = req.params.time;
      const itemList = req.params.itemList;
      const totCost = parseInt(req.params.totCost);
  
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
                            INSERT INTO totalorders (table_no, order_no, customer_name, time, order_description, total_cost) 
                            VALUES (${table}, ${orderNumber}, '${name}', TIME '${time}', '${itemList}', ${totCost});
                            INSERT INTO tables (tableno, time) VALUES (${table}, TIME '${time}')`;
  
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
    
    const deleteQuery = `DELETE FROM inpreparation WHERE order_no IN (${values.map(val => val.split(",")[1]).join(",")})`;

    await client.query(deleteQuery);      
    
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error on sending the orders" });
  }
});

app.post("/makeOrderDelivered", async (req, res) => {
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

    const insertQuery = `INSERT INTO delivered (table_no, order_no, customer_name, time, order_description) VALUES ${values.join(
      ","
    )};`;
    

    await client.query(insertQuery);
    const orderNumbers = orders.map((order) => order.orderNumber).join(",");
    const deleteQuery = `DELETE FROM ready_orders WHERE order_no IN (${orderNumbers})`;

    await client.query(deleteQuery);

    console.log(values);
    
    let deleteQuery2;
    for (const value of values) {
      const tableNo = value.split(",")[0].substring(1); // extract tableNo and remove leading (
        console.log(tableNo);
        deleteQuery2 = `UPDATE waiters 
        SET assignedtables = REGEXP_REPLACE(assignedtables, '{"tableNo":${tableNo},"time":".*?"},?,', '') 
        WHERE assignedtables LIKE '%{"tableNo":${tableNo},%';`;
      await client.query(deleteQuery2);
      console.log(`Deleted assigned tables for table ${tableNo}`);
    }

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
    const deleteQuery = `DELETE FROM waiter_calls WHERE order_no IN (${orderNumberString}); DELETE FROM totalorders WHERE order_no IN (${orderNumberString})`;

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

app.put("/orders/addstock/:id/:amount", async(req,res) => {
  try {
    const id = req.params.id;
    const amount = req.params.amount;
    const q = `UPDATE item SET stock_available = ${amount} WHERE item_id = '${id}';`
    client.query(q, (err,data)=>{
      if (err) return res.json(err);
      return res.json("Item has been updated successfully")
    })
  } catch (err) {
    return res.json(err)
  }
})

app.put("/orders/reduceStock/:id/:amount", async(req,res) => {
  try {
    const id = req.params.id;
    const amount = req.params.amount;
    const q = `UPDATE item SET stock_available = stock_available - ${amount} WHERE item_id = '${id}';`
    client.query(q, (err,data)=>{
      if (err) return res.json(err);
      return res.json("Item has been updated successfully")
    })
  } catch (err) {
    return res.json(err)
  }
})

app.put("/waiters", async (req, res) => {
  try {
    const { waiters } = req.body;

    // Create an array of Promises to execute all database queries asynchronously
    const promises = waiters.map((waiter) => {
      const query = `
        UPDATE waiters
        SET status = '${waiter.status}'
        WHERE username = '${waiter.username}';
      `;
      return client.query(query);
    });

    // Execute all queries and wait for them to complete
    await Promise.all(promises);

    res.json({ message: "Waiters updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating waiters" });
  }
});

// Update waiter status and assigned tables
app.put("/waitersAssign", async (req, res) => {
  try {
    const { waiters } = req.body;

    // Create an array of Promises to execute all database queries asynchronously
    const promises = waiters.map((waiter) => {
      const assignedTables =
  waiter.assignedTables && waiter.assignedTables.length > 0
    ? JSON.stringify(waiter.assignedTables)
    : null;

        
      console.log(assignedTables);

      const query = `
        UPDATE waiters
        SET status = '${waiter.status}', assignedtables = '${assignedTables}'
        WHERE username = '${waiter.username}';
      `;
      return client.query(query);
    });

    // Execute all queries and wait for them to complete
    await Promise.all(promises);

    // Print the assignedTables array once
    const assignedTablesArray = waiters.map((waiter) => waiter.assignedTables).filter((tables) => tables !== null);
    console.log("Assigned tables:", assignedTablesArray);

    res.json({ message: "Waiters updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating waiters" });
  }
});


// Update table waiter assignments
app.put("/tables", async (req, res) => {
  try {
    const { tables } = req.body;

    // Create an array of Promises to execute all database queries asynchronously
    const promises = tables && Array.isArray(tables) ? tables.map((table) => {
      const query = `
        UPDATE tables
        SET waiter = '${table.waiter ? table.waiter.username : null}'
        WHERE tableno = '${table.tableNo}';
      `;
      return client.query(query);
    }) : [];

    // Execute all queries and wait for them to complete
    await Promise.all(promises);

    res.json({ message: "Tables updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating tables" });
  }
});

app.delete("/tables/:tableNo", async (req, res) => {
  try {
    const tableNo = req.params.tableNo;

    const query = `
      DELETE FROM tables
      WHERE tableno = '${tableNo}';
    `;
    await client.query(query);

    res.json({ message: `Table ${tableNo} deleted successfully!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting table" });
  }
});



app.listen(8800, ()=>{
    console.log("Connected to backend!")
})

