import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

import { deleteOrder } from "./orderFunctions";
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

export const OrderTable = ({
  nextStepText,
  isCancellable,
  endPoint,
  nextCb,
}) => {
  const [items, setItems] = useState([]);
  const [tables, setTables] = useState([]);
  const [updatedWaiterss, setUpdatedWaiters] = useState([]);
  const [tableNumb, setTableNumber] = useState();
  const [waiters, setWaiters] = useState([]);

  useEffect(() => {
    const fetchAlltems = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/${endPoint}`);
        const transformedData = res.data.map((item) => ({
          tableNumber: item.table_no,
          orderNumber: item.order_no,
          customerName: item.customer_name,
          time: item.time,
          details: item.order_description,
          paid: item.paid,
          waiter: item.waiter,
        }));
        setItems(transformedData);
      } catch (err) {
        console.log(err);
      }
      try {
        const res = await axios.get(`http://localhost:8800/tables`);
        const transformedTables = res.data.map((item) => ({
          tableNo: item.tableno,
          time: item.time,
          waiter: item.waiter,
        }));
        setTables(transformedTables);
      } catch (err) {
        console.log(err);
      }
      try {
        const res = await axios.get(`http://localhost:8800/waiters`);
        const transformedWaiters = res.data.map((item) => {
          const assignedTables = item.assignedtables
            ? JSON.parse(item.assignedtables)
            : [];
          const maxTables = 7;
          const status = item.status; // set status based on fetched data

          return {
            username: item.username,
            status: status,
            assignedTables: Array.isArray(assignedTables) ? assignedTables : [],
            maxTables: maxTables,
          };
        });
        setWaiters(transformedWaiters);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAlltems();
  }, []);

  console.log(waiters);

  const update = async () => {
    try {
      await axios.put(`http://localhost:8800/payment`, { items });
      console.log("Paying Status updated!");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };


  const Assign = async () => {
    try {
      await axios.put(`http://localhost:8800/tables`, { tables });
      const updatedTables = await axios.get(`http://localhost:8800/tables`);
      const transformedTables = updatedTables.data.map((item) => ({
        tableNo: item.tableno,
        time: item.time,
        waiter: item.waiter,
      }));
      console.log(tables);
      console.log(updatedWaiterss);
      setTables([...tables, ...transformedTables]); // Append the new table to the existing array of tables
      await axios.put(`http://localhost:8800/waitersAssign`, {
        waiters: updatedWaiterss,
      });
      try {
        await axios.put(`http://localhost:8800/waiterAssign`, { items });
      } catch (err) {
        console.log(err);
      }
      let tablesSelected = [];
      for (let i = 0; i < tables.length; i++) {
        if (tables[i].waiter) {
          tablesSelected.push(tables[i].tableNo);
        }
      }

      // Delete the table from the database
      for (let i = 0; i < tablesSelected.length; i++) {
        await axios.delete(`http://localhost:8800/tables/${tablesSelected[i]}`);
        console.log(`Table ${tableNumb} deleted`);
      }

      console.log("Tables and waiters updated!");
      //window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handlePaymentStatusChange = (event, index) => {
    const newItems = [...items];
    const newStatus = event.target.value === "paid";
    const currentStatus = newItems[index].paid;

    newItems[index] = {
      ...newItems[index],
      paid: newStatus,
    };

    if (newItems[index].maxTables === 0) {
      newItems[index].paid = false;
      window.alert(
        "Maximum tables assigned to waiter " + newItems[index].waiter
      );
    }

    setItems(newItems);

    console.log(newItems);
    setUpdatedWaiters(newItems);
  };

  const handleAssignTable = (tabless, selectedWaiter) => {
    const tableNo = tabless.tableNumber;
    console.log("TABLE NO: " + tableNo + " SELECTED WAITER: " + selectedWaiter);
    const selectedTable = tables.find(
      (table) => table.tableNo === parseInt(tableNo)
    );
    console.log("SelectedTable: ", selectedTable);

    // Reset the waiter value to an empty string if the "--Select--" option is selected
    let selectedWaiterObj;
    if (selectedWaiter === "") {
      selectedWaiterObj = { username: "", assignedTables: [] };
    } else {
      selectedWaiterObj = waiters.find(
        (waiter) => waiter.username === selectedWaiter
      );
    }

    if (
      selectedWaiterObj &&
      selectedWaiterObj.assignedTables.length >= selectedWaiterObj.maxTables
    ) {
      window.alert(
        "Maximum tables assigned to waiter " + selectedWaiterObj.username
      );
      return;
    }

    const previouslyAssignedWaiter = selectedTable
      ? waiters.find((waiter) => waiter.username === selectedTable.waiter)
      : null;
    console.log("previouslyAssignedWaiter: ", previouslyAssignedWaiter);

    const updatedItems = items.map((item) => {
      if (item.tableNumber === parseInt(tableNo)) {
        return {
          ...item,
          waiter:
            selectedWaiterObj.username !== ""
              ? selectedWaiterObj.username
              : null,
        };
      }
      return item;
    });

    setItems(updatedItems);

    // Remove the table from the previously assigned waiter's assignedTables array
    if (previouslyAssignedWaiter) {
      const updatedAssignedTables =
        previouslyAssignedWaiter.assignedTables.filter(
          (table) => table.tableNo !== tableNo
        );
      previouslyAssignedWaiter.assignedTables = updatedAssignedTables;
    }

    const updatedWaiters = waiters.map((waiter) => {
      if (selectedWaiterObj && waiter.username === selectedWaiterObj.username) {
        const updatedAssignedTables = waiter.assignedTables
          ? [...waiter.assignedTables]
          : [];
        updatedAssignedTables.push({
          tableNo: tableNo,
          time: tabless.time,
        });
        console.log("Updated", updatedAssignedTables);
        console.log("Waiter", waiter);
        return {
          ...waiter,
          assignedTables: updatedAssignedTables,
        };
      }
      return waiter;
    });
    console.log("WAITERS", waiters);

    // Set the updatedWaiters state
    setWaiters(updatedWaiters);
    setUpdatedWaiters(updatedWaiters);

    const updatedTables = tables.map((table) => {
      if (table.tableNo === tableNo) {
        return {
          ...table,
          waiter:
            selectedWaiterObj.username !== ""
              ? selectedWaiterObj.username
              : null,
        };
      }
      return table;
    });

    // Set the updated tables state
    setTables(updatedTables);

    // Print the assignedTables array
    const assignedTablesArray = updatedWaiters
      .map((waiter) => waiter.assignedTables)
      .flat()
      .filter((table, index, self) => {
        return (
          table &&
          self.findIndex(
            (t) => t.tableNo === table.tableNo && t.time === table.time
          ) === index
        );
      });

    console.log("Assigned tables:", assignedTablesArray);
    console.log("Tables array: ", tables);
  };

  const assign = () => {
    console.log(waiters);
    console.log(updatedWaiterss);
    if (updatedWaiterss.length > 0) {
      Assign();
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
              {endPoint === "pendingOrders" ? <th>Assigned Waiter</th> : <></>}
              <th>Payment</th>
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
                          ></label>
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
                {endPoint === "pendingOrders" ? (
                  <td>
                    {order.waiter != undefined ? (
                      <p>{order.waiter}</p>
                    ) : (
                      <select
                        className="select select-bordered w-40 max-w-xs"
                        onChange={(event) =>
                          handleAssignTable(order, event.target.value)
                        }
                        id={`select-${order.tableNumber}`}
                      >
                        <option value="">
                          {order.waiter != undefined
                            ? order.waiter
                            : "--Select--"}
                        </option>
                        {waiters
                          .filter((waiter) => waiter.status)
                          .map((waiter, j) => (
                            <option value={waiter.username} key={j}>
                              {waiter.username}
                            </option>
                          ))}
                      </select>
                    )}
                  </td>
                ) : (
                  <></>
                )}
                <td>
                  <select
                    className="select select-bordered w-35 max-w-xs"
                    value={order.paid ? "paid" : "unpaid"}
                    onChange={(event) => handlePaymentStatusChange(event, i)}
                  >
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex gap-2 self-end">
        {nextStepText ? (
          <button
            className="btn btn-primary"
            onClick={() => nextCb(selectedItems, items)}
          >
            {nextStepText}
          </button>
        ) : (
          <></>
        )}
        {isCancellable ? (
          <button
            className="btn btn-warning"
            onClick={() => deleteOrder(selectedItems, items)}
          >
            Cancel Order
          </button>
        ) : (
          <></>
        )}
        <button className="btn btn-warning" onClick={() => assign()}>
          Assign
        </button>
        <button className="btn btn-warning" onClick={() => update()}>
          Update
        </button>
      </div>
    </div>
  );
};
