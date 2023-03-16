import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { KitchenTable } from "./KitchenTable";
import { InPreparation } from "./InPreparation";
import { ReadyDelivery } from "./ReadyDelivery";
import cooking from "../../assets/cooking.png";

function KitchenDashboard({ setIsLoggedIn, handleLogin }) {
  const [items, setItems] = useState([]);
  const [currentTab, setCurrentTab] = useState("Pending Orders");

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
        </div>
        <div className={currentTab === "Pending Orders" ? "show" : "hidden"}>
          <h1 className="text-3xl font-bold">
            To be made <i className="fa-solid fa-clipboard"></i>
          </h1>
          <KitchenTable nextStepText="Pick up order" isCancellable={true} />
        </div>
        <div className={currentTab === "In Preparation" ? "show" : "hidden"}>
          <h1 className="text-3xl font-bold flex gap-4 items-center">
            <span>In Preparation</span>
            <img className="object-cover h-[40px] h-[40px]" src={cooking} />
          </h1>
          <InPreparation nextStepText="Mark as Ready" isCancellable={true} />
        </div>

        <div className={currentTab === "Ready" ? "show" : "hidden"}>
          <h1 className="text-3xl font-bold">
            Ready for delivery <i className="fa-solid fa-circle-check"></i>
          </h1>
          <ReadyDelivery nextStepText="Delivered" />
        </div>
      </div>
    </>
  );
}

export default KitchenDashboard;
