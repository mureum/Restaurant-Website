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
  {
    tableNumber: 1,
    orderNumber: 1234,
    customerName: "John Doe",
    time: "12:00",
    details: "",
    status : "Awaiting confirmation",
  },
];

export const CustDashboard = ({tableNumber }) => {
  const [items, setItems] = useState([]);

  const [confirmingItems,setConfirmingItems] = useState([]);
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
          status : "Awaiting confirmation",
        }));
        setConfirmingItems(transformedData);
        console.log("CONFIRMING :");
        console.log(transformedData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAlltems();
  }, []);


  useEffect(() => {
    setItems(confirmingItems);
  }, [confirmingItems]);


  const data =
    items.length > 0
      ? items.sort((a, b) => a.orderNumber - b.orderNumber)
      : ORDER;

  // Render the data
  const [selectedItems, setSelectedItems] = useState(
    data.map((_, i) => ({ [i]: false })).reduce((a, b) => ({ ...a, ...b }))
  );
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const allSelected = Object.values(selectedItems).every((v) => v);
    setSelectAll(allSelected);
  }, [selectedItems]);

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
                { order.tableNumber == tableNumber &&
                <td>
                  <div className="font-bold">#{order.tableNumber}</div>
                </td>
                } 
                { order.tableNumber == tableNumber &&
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
                { order.tableNumber == tableNumber &&
                  <td>{order.customerName}</td>
                }
                { order.tableNumber == tableNumber &&
                <th>
                  <button className="btn btn-ghost btn-xs">{order.time}</button>
                </th>
                }
                { order.tableNumber == tableNumber &&
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
