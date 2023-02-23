import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { OrderTable } from "./OrderTable";
import { WaiterTable } from "./WaiterTable";
import cooking from "../../assets/cooking.png";

function OrderDashboard({ isLoggedIn, permission }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchAlltems = async () => {
      try {
        const res = await axios.get("http://localhost:8800/pendingOrders");
        const transformedData = res.data.map((item) => ({
          tableNumber: item.table_no,
          orderNumber: item.order_no,
          customerName: item.customer_name,
          time: item.time,
          details: {},
        }));
        setItems(transformedData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAlltems();
    console.log(items);
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
          Pending orders <i className="fa-solid fa-clipboard"></i>
        </h1>
        <OrderTable nextStepText="Send to Kitchen" isCancellable={true} />
        <h1 className="text-3xl font-bold flex gap-4 items-center">
          <span>In preparation</span>
          <img className="object-cover h-[40px] h-[40px]" src={cooking} />
        </h1>
        <OrderTable nextStepText="Mark as Ready" />
        <h1 className="text-3xl font-bold">
          Ready <i className="fa-solid fa-bell-concierge"></i>
        </h1>
        <OrderTable nextStepText="Mark as Delivered" />
        <h1 className="text-3xl font-bold">
          Delivered orders <i className="fa-solid fa-circle-check"></i>
        </h1>
        <OrderTable />
      </div>
    </>
  );
}

export default OrderDashboard;
