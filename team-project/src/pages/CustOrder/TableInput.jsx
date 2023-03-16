import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';
import "../Login.css";

function TableInput({setTableNumber}) {
  const [userNumber, setUserNumber] = React.useState("");
  const [orderTable, setOrderTables] = React.useState([]);

  const [confirmingItems,setConfirmingItems] = useState([]);
  const[preparingItems,setPreparingItems] = useState([]);
  const[readyItems,setReadyItems] = useState([]);

  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    axios.get("http://localhost:8800/pendingOrders").then((response) => {
      setConfirmingItems(response.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get("http://localhost:8800/currentOrders").then((response) => {
      setPreparingItems(response.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get("http://localhost:8800/readyOrders").then((response) => {
      setReadyItems(response.data);
    });
  }, []);

  

  useEffect(() => {
    setOrderTables(confirmingItems.concat(preparingItems).concat(readyItems));
  }, [confirmingItems,preparingItems,readyItems]);

  const login = () => {
    for (var i = 0; i < orderTable.length; i++) {
      if (
        userNumber == orderTable[i].table_no
      ) {
        setShow(false);
        setTableNumber(userNumber);
        navigate("/CustOrder");  
        return;
      }
    }
    setShow(true);
  };

  return (
    <body className="body">
      <div className="center">
        <h1 style={{ fontWeight: "bold" }}>Enter Table Number</h1>
        <div className="textField">
        <label>Table Number : </label>
          <input
            type="text"
            placeholder="Table"
            onChange={(e) => {
              setUserNumber(e.target.value);
            }}
          />
          <span></span>

        </div>
        <button className="Button" onClick={login}>
          Check Order
        </button>
        <div style={{ color: "red", fontWeight: "bold" }}>
          {" "}
          {show ? <h1>INVALID TABLE NUMBER</h1> : null}
        </div>
      </div>
    </body>
  );
}

export default TableInput;
