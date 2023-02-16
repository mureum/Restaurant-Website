import "../App.css";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function OrderDashboard({ isLoggedIn, permission }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fecthAllItems = async () => {
      try {
        const res = await axios.get("http://localhost:8800/pendingOrders");
        setItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fecthAllItems();
  }, []);

  return (
    <div className="App">
      <div style={{ width: "100%", overflowX: "auto" }}>
        <div className="grid-cols-1 gap-2 grid px-1 lg:grid-cols-2">
          {items && permission === "Waiter" ? (
            items.map((item) => (
              <div className="flex bg-yellow-100 flex-col-reverse lg:flex-row m-6 p-4 min-h-[300px]">
                <div className="flex flex-col text-xl">
                  <p>Table Number: {item.tablenumber}</p>
                  <span className="self-end">{item.problemdescription}</span>
                  <button
                    className="text-2xl font-bold uppercase space-x-2"
                    style={{ backgroundColor: "pink" }}
                  >
                    SEND TO KITCHEN
                  </button>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderDashboard;
