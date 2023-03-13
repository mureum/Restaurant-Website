import React from 'react';
import { useState, useEffect } from "react";
import Axios from "axios";

function FoodStatisticsTable() {
  const foodItems = [
    { name: 'Beef Burrito', cost: 200, revenue: 1000 },
    { name: 'Beef Quesadilla', cost: 300, revenue: 1200 },
    { name: 'Chicken Soup', cost: 100, revenue: 500 },
    { name: 'Grilled Halloumi', cost: 150, revenue: 750 },
    { name: 'Chipotle Wings', cost: 180, revenue: 900 },
    { name: 'Nachos vegan', cost: 120, revenue: 600 },
    // add more food items here...
  ];

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

  const totalCost = foodItems.reduce((sum, item) => sum + item.cost, 0);
  const totalRevenue = foodItems.reduce((sum, item) => sum + item.revenue, 0);
  const totalProfit = totalRevenue - totalCost;
  const firstFoodItem = foodItems[0].name;
  console.log(firstFoodItem);

  return (
    <div>
      <h1>Food Statistics Table</h1>
      <table>
        <thead>
          <tr>
            <th>Food Item</th>
            <th>Cost</th>
            <th>Revenue</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {foodItems.map(item => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>${item.cost}</td>
              <td>${item.revenue}</td>
              <td>${item.revenue - item.cost}</td>
            </tr>
          ))}
          {items.map(item => (
            <tr key={item.item_id}>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>${item.calories}</td>
              <td>${item.stock_available}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>${totalCost}</td>
            <td>${totalRevenue}</td>
            <td>${totalProfit}</td>
          </tr>
        </tfoot>
      </table>
      <p>{firstFoodItem}</p>
    </div>
  );

  
}

export default FoodStatisticsTable;
