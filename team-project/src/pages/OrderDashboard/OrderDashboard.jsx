import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { OrderTable } from "./OrderTable";

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
    <>
      <div className="flex flex-col gap-10 container mx-auto">
        <div className="form-control self-end">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search…"
              className="input input-bordered"
            />
            <button className="btn btn-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <h1 className="text-3xl font-bold">
          Pending orders <i class="fa-solid fa-clipboard"></i>
        </h1>
        <OrderTable nextStepText="Send to Kitchen" isCancellable={true} />
        <h1 className="text-3xl font-bold">
          In preparation <i class="fa-solid fa-fire-burner"></i>
        </h1>
        <OrderTable nextStepText="Mark as Ready" />
        <h1 className="text-3xl font-bold">Ready</h1>
        <OrderTable nextStepText="Mark as Delivered" />
        <h1 className="text-3xl font-bold">Delivered orders</h1>
        <OrderTable />
      </div>
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
    </>
  );
}

export default OrderDashboard;
