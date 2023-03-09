import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { OrderTable } from "./OrderTable";
import { WaiterTable } from "./WaiterTable";
import cooking from "../../assets/cooking.png";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RestaurantProgressBar() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('https://bit.io/ahmedshaed37/ORDER?view=tables#/orders', {
      
      headers: {
        'Authorization': 'Bearer YOUR-BIT.IO-API-KEY'
      }
    })
    .then(response => {
      setOrders(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  const getProgress = (status) => {
    if (status === 'Not Started') {
      return 0;
    } else if (status === 'In Progress') {
      return 50;
    } else if (status === 'Ready') {
      return 100;
    }
  }

  return (
    <div className="progress-bar">
      {orders.map(order => (
        <div key={order.id} className="progress-bar-item" style={{ width: `${getProgress(order.status)}%` }}>
          <span className="progress-bar-text">{order.customerName}</span>
        </div>
      ))}
    </div>
  );
}

export default RestaurantProgressBar;
