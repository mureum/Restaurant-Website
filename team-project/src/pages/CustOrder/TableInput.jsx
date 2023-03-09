import React, { useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';
import "../Login.css";

function TableInput({setTableNumber}) {
  const [userNumber, setUserNumber] = React.useState("");
  const [orderTables, setOrderTables] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    Axios.get("http://localhost:8800/pendingOrders").then((response) => {
      console.log(response.data)
      setOrderTables(response.data);
    });
  }, []);

  const login = () => {
    for (var i = 0; i < orderTables.length; i++) {
      if (
        userNumber == orderTables[i].table_no
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
