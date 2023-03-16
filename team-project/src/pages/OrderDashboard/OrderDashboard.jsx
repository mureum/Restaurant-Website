import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { OrderTable } from "./OrderTable";
import cooking from "../../assets/cooking.png";
import { completeOrder, markAsReady, sendToKitchen } from "./orderFunctions";

function OrderDashboard({ isLoggedIn, permission }) {
  const [items, setItems] = useState([]);
  const [currentTab, setCurrentTab] = useState("Assistance");

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
        <div className="tabs tabs-boxed bg-transparent">
          <a
            className={
              "tab text-3xl font-bold" +
              (currentTab === "Assistance" ? " tab-active" : "")
            }
            onClick={() => setCurrentTab("Assistance")}
          >
            Assistance
          </a>
          <a
            className={
              "tab text-3xl font-bold" +
              (currentTab === "Pending Orders" ? " tab-active" : "")
            }
            onClick={() => setCurrentTab("Pending Orders")}
          >
            Pending Orders
          </a>
          <a
            className={
              "tab text-3xl font-bold" +
              (currentTab === "In Preparation" ? " tab-active" : "")
            }
            onClick={() => setCurrentTab("In Preparation")}
          >
            In Preparation
          </a>
          <a
            className={
              "tab text-3xl font-bold" +
              (currentTab === "Ready" ? " tab-active" : "")
            }
            onClick={() => setCurrentTab("Ready")}
          >
            Ready
          </a>
          <a
            className={
              "tab text-3xl font-bold" +
              (currentTab === "Delivered" ? " tab-active" : "")
            }
            onClick={() => setCurrentTab("Delivered")}
          >
            Delivered
          </a>
        </div>
        <div className={currentTab === "Assistance" ? "show" : "hidden"}>
          <h1 className="text-3xl font-bold">
            Assistance <i class="fa-solid fa-circle-question"></i>
          </h1>
        </div>
        <div className={currentTab === "Pending Orders" ? "show" : "hidden"}>
          <h1 className="text-3xl font-bold">
            Pending Orders <i className="fa-solid fa-clipboard"></i>
          </h1>
          <OrderTable
            nextStepText="Send to Kitchen"
            isCancellable={true}
            endPoint="pendingOrders"
            nextCb={sendToKitchen}
          />
        </div>
        <div className={currentTab === "In Preparation" ? "show" : "hidden"}>
          <h1 className="text-3xl font-bold flex gap-4 items-center">
            <span>In Preparation</span>
            <img className="object-cover h-[40px] h-[40px]" src={cooking} />
          </h1>
          <OrderTable
            nextStepText="Mark as Ready"
            endPoint="currentOrders"
            nextCb={markAsReady}
          />
        </div>
        <div className={currentTab === "Ready" ? "show" : "hidden"}>
          <h1 className="text-3xl font-bold">
            Ready <i className="fa-solid fa-bell-concierge"></i>
          </h1>
          <OrderTable
            nextStepText="Mark as Delivered"
            endPoint="readyOrders"
            nextCb={completeOrder}
          />
        </div>
        <div className={currentTab === "Delivered" ? "show" : "hidden"}>
          <h1 className="text-3xl font-bold">
            Delivered <i className="fa-solid fa-circle-check"></i>
          </h1>
          <OrderTable nextStepText="" nextCb={""} endPoint="delivered" />
        </div>
      </div>
    </>
  );
}

export default OrderDashboard;
