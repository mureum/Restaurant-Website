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
  },
  {
    tableNumber: 1,
    orderNumber: 1234,
    customerName: "John Doe",
    time: "12:00",
    details: "",
  },
];

export const OrderTable = ({ nextStepText, isCancellable }) => {
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
          details: item.order_description,
        }));
        setItems(transformedData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAlltems();
  }, []);

  const sendToKitchen = async (selectedItems) => {
    try {
      const itemsToSend = Object.entries(selectedItems)
        .filter(([_, isSelected]) => isSelected)
        .map(([index, _]) => items[index]);

      if (itemsToSend.length === 0) {
        window.alert("Please select at least one order to send to kitchen");
        return;
      }

      const orders = itemsToSend.map(
        ({ tableNumber, orderNumber, customerName, time, details }) => ({
          table: tableNumber,
          orderNumber,
          customerName,
          time,
          details,
        })
      );

      const response = await axios.post(`http://localhost:8800/sendToKitchen`, {
        orders,
      });

      if (response.data.success) {
        window.alert("Selected orders sent to kitchen");
        window.location.reload();
      } else {
        window.alert("Error on sending the orders");
      }
    } catch (err) {
      window.alert("Error on sending the orders");
      console.log(err);
    }
  };

  const deleteOrder = async (selectedItems) => {
    try {
      const itemsToDelete = Object.entries(selectedItems)
        .filter(([_, isSelected]) => isSelected)
        .map(([index, _]) => items[index]);

      if (itemsToDelete.length === 0) {
        window.alert("Please select at least one order to delete");
        return;
      }

      const orderNumbers = itemsToDelete
        .map((item) => item.orderNumber)
        .join(",");

      await axios.delete("http://localhost:8800/deleteOrder", {
        data: { orderNumbers: itemsToDelete.map((item) => item.orderNumber) },
      });

      window.alert("Selected orders deleted from the table");
      window.location.reload();
    } catch (err) {
      window.alert("Error on deleting the orders");
      console.log(err);
    }
  };

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
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectAll}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setSelectAll(checked);
                      setSelectedItems(
                        data
                          .map((_, i) => ({ [i]: checked }))
                          .reduce((a, b) => ({ ...a, ...b }))
                      );
                    }}
                  />
                </label>
              </th>
              <th>Table no.</th>
              <th>Order number</th>
              <th>Customer Name</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order, i) => (
              <tr key={i}>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={selectedItems[i]}
                      onChange={(e) => {
                        setSelectedItems({
                          ...selectedItems,
                          [i]: e.target.checked,
                        });
                      }}
                    />
                  </label>
                </th>
                <td>
                  <div className="font-bold">#{order.tableNumber}</div>
                </td>
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
                <td>{order.customerName}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">{order.time}</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex gap-2 self-end">
        {nextStepText ? (
          <button
            className="btn btn-primary"
            onClick={() => sendToKitchen(selectedItems)}
          >
            {nextStepText}
          </button>
        ) : (
          <></>
        )}
        {isCancellable ? (
          <button
            className="btn btn-warning"
            onClick={() => deleteOrder(selectedItems)}
          >
            Cancel Order
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
