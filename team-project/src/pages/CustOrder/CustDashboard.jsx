import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

const ORDER = [
  {
    tableNumber: 1,
    orderNumber: 1234,
    customerName: "John Doe",
    time: "12:00",
    details: "",
    status : "Awaiting confirmation",
  },
];

export const CustDashboard = ({tableNumber}) => {
  const [items, setItems] = useState([]);

  const [confirmingItems,setConfirmingItems] = useState([]);
  const[preparingItems,setPreparingItems] = useState([]);
  const[readyItems,setReadyItems] = useState([]);

  useEffect(() => {
    const fetchAlltems = async () => {
      try {
        const res = await axios.get("http://localhost:8800/pendingOrders");
        
        const transformedData = res.data.map((item) => ({
          tableNumber: item.table_no,
          orderNumber: item.order_no,
          customerName: item.customer_name,
          time: item.time,
          details: item.order_description,
          status : "Awaiting confirmation!",
        }));
        setConfirmingItems(transformedData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAlltems();
  }, []);

  useEffect(() => {
    const fetchAlltems = async () => {
      try {
        const res = await axios.get("http://localhost:8800/currentOrders");
        
        const transformedData = res.data.map((item) => ({
          tableNumber: item.table_no,
          orderNumber: item.order_no,
          customerName: item.customer_name,
          time: item.time,
          details: item.order_description,
          status : "Being prepared now!",
        }));
        setPreparingItems(transformedData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAlltems();
  }, []);

  useEffect(() => {
    const fetchAlltems = async () => {
      try {
        const res = await axios.get("http://localhost:8800/readyOrders");
        
        const transformedData = res.data.map((item) => ({
          tableNumber: item.table_no,
          orderNumber: item.order_no,
          customerName: item.customer_name,
          time: item.time,
          details: item.order_description,
          status : "Being delivered by waiter now!",
        }));
        setReadyItems(transformedData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAlltems();
  }, []);

  useEffect(() => {
    setItems(confirmingItems.concat(preparingItems).concat(readyItems));
  }, [confirmingItems,preparingItems,readyItems]);


  const data =
    items.length > 0
      ? items.sort((a, b) => a.orderNumber - b.orderNumber)
      : ORDER;

  return (
    <div className="flex flex-col gap-4">
      {items.length > 0 && (
        <table className="table w-full">
          <thead>
            <tr>
              <th>Table no.</th>
              <th>Order number</th>
              <th>Customer Name</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((order, i) => (
              <tr key={i}>
                { tableNumber == (order.tableNumber) && 
                <td>
                  <div className="font-bold">#{order.tableNumber}</div>
                </td> 
                }
                { tableNumber == (order.tableNumber) &&
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src="https://api.lorem.space/image/burger?w=150&h=150"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                    <div className="font-bold">Order {order.orderNumber}</div>
                      <label
                        htmlFor={`my-modal-${order.orderNumber}`}
                        className="badge badge-success cursor-pointer"
                      >
                        Details
                      </label>
                      <input
                        type="checkbox"
                        id={`my-modal-${order.orderNumber}`}
                        className="modal-toggle"
                      />
                      <div className="modal">
                        <div className="modal-box relative">
                          <label
                            htmlFor={`my-modal-${order.orderNumber}`}
                            className="btn btn-sm btn-circle absolute right-2 top-2"
                          >
                            ✕
                          </label>
                          <h3 className="text-lg font-bold">Details</h3>
                          <p className="py-4">{order.details}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                }
                
                { tableNumber == (order.tableNumber) &&
                  <td>{order.customerName}</td>
                }
                
                <th>
                  { tableNumber == (order.tableNumber) &&
                  <button className="btn btn-ghost btn-xs">{order.time}</button>
                  }
                </th>
                  { tableNumber == (order.tableNumber) &&
                    <td>{order.status}</td> 
                  }            
              </tr>
            ))}
          </tbody>
        </table>

      )}
    </div>
  );
};

export default CustDashboard
