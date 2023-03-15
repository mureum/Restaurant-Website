import React from 'react';
import { useState, useEffect } from "react";
import Axios from "axios";

function FoodStatisticsTable() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fecthAllItems = async () => {
      try {
        const res = await Axios.get("http://localhost:8800/orders");
        setItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fecthAllItems();
  }, []);

  

  return (
    <div>
      <h1>Food Statistics Table</h1>
      <table>
        <thead>
          <tr>
            <th>Food Item</th>
            <th>Price</th>
            <th>Revenue</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.item_id}>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>${item.calories}</td>
              <td>${item.stock_available}</td>
            </tr>
          ))}
        </tbody>
      
      </table>
    </div>
  );

  
}

export default FoodStatisticsTable;
