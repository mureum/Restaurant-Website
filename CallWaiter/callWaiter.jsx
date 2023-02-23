import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";

function WaiterCall() {
  const location = useLocation();
  const { itemList: itemList } = location.state;
  const [table, setTable] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [time, setTime] = useState(new Date().toLocaleTimeString()); // Initialize the time to the current time

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString()); // Update the time every second
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:8800/orders/waiter/" +
          table +
          "/" +
          customerName +
          "/" +
          time +
          "/" +
          itemList
      );
      console.log(res);
      window.location.href = "/";
    } catch (err) {
      window.alert("Error on sending the order");
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          margin: "100px",
          border: "2px solid rgb(11, 79, 110)",
          borderRadius: "10px",
          padding: "35px",
          backgroundColor: "rgb(223, 223, 223)",
        }}
      >
        <div className="mb-3">
          <label className="form-label">Table Number *</label>
          <input
            type="number"
            className="form-control"
            id="table"
            placeholder="Enter your table number"
            onChange={(e) => setTable(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Customer Name</label>
          <input
            type="text"
            className="form-control"
            id="problem"
            placeholder="Customer Name"
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="submit" id="call" className="btn btn-secondary">
            Call for Waiter
          </button>
        </div>
      </div>
    </form>
  );
}

export default WaiterCall;
