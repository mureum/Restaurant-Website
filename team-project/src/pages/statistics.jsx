import React from 'react';
import { useState, useEffect } from "react";
import Axios from "axios";

function FoodStatisticsTable() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const res = await Axios.get("http://localhost:8800/stock_level");
        setItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllItems();
  }, []);

  const [TotalRev, setRevenue] = useState({});

  useEffect(() => {
    const fetchAllRev = async () => {
      try {
        const res = await Axios.get("http://localhost:8800/SumTotalRevenue");
        setRevenue(res.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchAllRev();
  }, []);
  



  return (
    
    <div>
  <h1 style={{textAlign: 'center', fontWeight: 'bold'}}>Food Statistics</h1>
        {/* Table */}
  <table style={{borderCollapse: 'collapse', width: '100%'}}>
    {/* Table head */}
    <thead>
      <tr style={{border: '1px solid black'}}>
        <th style={{border: '1px solid black', padding: '8px'}}>Item ID</th>
        <th style={{border: '1px solid black', padding: '8px'}}>Is Available</th>
        <th style={{border: '1px solid black', padding: '8px'}}>In Stock</th>
        <th style={{border: '1px solid black', padding: '8px'}}>Sold</th>
      </tr>
    </thead>
    
    {/* Table body */}
    <tbody>
      {items.map(item => (
        <tr key={item.item_id} style={{border: '1px solid black'}}>
          <td style={{border: '1px solid black', padding: '8px'}}>{item.item_id}</td>
          <td style={{border: '1px solid black', padding: '8px'}}>{item.is_available}</td>
          <td style={{border: '1px solid black', padding: '8px'}}>{item.in_stock}</td>
          <td style={{border: '1px solid black', padding: '8px'}}>{item.sold}</td>
        </tr>
      ))}
    </tbody>
  </table>
  <h1 style={{textAlign: 'center', fontWeight: 'bold'}}>Daily Revenue</h1>
  {TotalRev.length > 0 ? (<p>Total Revenue so far: {TotalRev[0].total_revenue_sum}</p>
 ):(<p>Total Revenue is 0</p>) }</div>

  );

  
}

export default FoodStatisticsTable;
