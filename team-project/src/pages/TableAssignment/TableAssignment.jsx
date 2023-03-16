import axios from "axios";
import { useEffect, useState } from "react";

export const TableAssignment = ({ setIsLoggedIn, handleLogin }) => {
  const [tables, setTables] = useState([]);
  const [updatedWaiterss, setUpdatedWaiters] = useState([]);
  const [tableNumb, setTableNumber] = useState();
  const [waiters, setWaiters] = useState([
    {
      username: "John",
      status: true,
      maxTables: 6,
      assignedTables: [
        { tableNo: "1", time: "16:30:00" },
        { tableNo: "2", time: "18:00:00" },
      ],
    },
    {
      username: "Jane",
      status: false,
      maxTables: 7,
      assignedTables: [],
    },
    // ... add more waiters here
  ]);

  const update = async () => {
    try {
      await axios.put(`http://localhost:8800/waiters`, { waiters });
      console.log("Waiters updated!");
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
      setTables(transformedTables); // Set the updatedTables state here
      await axios.put(`http://localhost:8800/waitersAssign`, {
        waiters: updatedWaiterss,
      });

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
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleWaiterStatusChange = (event, index) => {
    const newWaiters = [...waiters];
    const newStatus = event.target.value === "available";
    const currentStatus = newWaiters[index].status;

    // If the new status is 'available', do not set the waiter's assignedTablesCount to 0 if the current status is 'unavailable'
    if (newStatus && currentStatus) {
      newWaiters[index].assignedTables = [];
    }

    newWaiters[index] = {
      ...newWaiters[index],
      status: newStatus,
    };

    if (newWaiters[index].maxTables === 0) {
      newWaiters[index].status = false;
      window.alert("Maximum tables assigned to waiter " + newWaiters[index]);
    }

    setWaiters(newWaiters);
    console.log(newWaiters);
    setUpdatedWaiters(newWaiters);
  };

  const handleAssignTable = (tableNo, selectedWaiter) => {
    const selectedTable = tables.find(
      (table) => table.tableNo === parseInt(tableNo)
    );

    // Reset the waiter value to an empty string if the "--Select--" option is selected
    let selectedWaiterObj;
    if (selectedWaiter === "") {
      selectedWaiterObj = { username: "", assignedTables: [] };
    } else {
      selectedWaiterObj = waiters.find(
        (waiter) => waiter.username === selectedWaiter
      );
    }

    console.log("Max:" + selectedWaiterObj.assignedTables.length);
    if (selectedWaiterObj.assignedTables.length >= 7) {
      window.alert(
        "Maximum tables assigned to waiter " + selectedWaiterObj.username
      );
      // Set the selected waiter to --Select--
      document.getElementById(`select-${tableNo}`).value = "";
      return;
    }

    const previouslyAssignedWaiter = waiters.find(
      (waiter) => waiter.username === selectedTable.waiter
    );

    // Remove the table from the previously assigned waiter's assignedTables array
    if (previouslyAssignedWaiter) {
      const updatedAssignedTables =
        previouslyAssignedWaiter.assignedTables.filter(
          (table) => table.tableNo !== tableNo
        );
      previouslyAssignedWaiter.assignedTables = updatedAssignedTables;
    }

    const updatedWaiters = waiters.map((waiter) => {
      if (waiter.username === selectedWaiterObj.username) {
        const updatedAssignedTables = Array.isArray(waiter.assignedTables)
          ? [...waiter.assignedTables]
          : [];
        updatedAssignedTables.push({
          tableNo: tableNo,
          time: new Date().toLocaleTimeString(),
        });
        return {
          ...waiter,
          assignedTables: updatedAssignedTables,
        };
      }
      return waiter;
    });
    // Set the updated waiters state
    setWaiters(updatedWaiters);
    // Set the updatedWaiterss state
    setUpdatedWaiters(updatedWaiters);

    const updatedTables = tables.map((table) => {
      if (table.tableNo === tableNo) {
        return {
          ...table,
          waiter: selectedWaiterObj.username !== "" ? selectedWaiterObj : null,
        };
      }
      return table;
    });

    // Set the updated tables state
    setTables(updatedTables);
    // Print the assignedTables array
    const assignedTablesArray = updatedWaiters
      .map((waiter) => waiter.assignedtables)
      .filter((tables) => tables !== null);
    console.log("Assigned tables:", assignedTablesArray);
  };

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/waiters`);
        const transformedWaiters = res.data.map((item) => {
          console.log("Assigned Tables: " + item.assignedtables);
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
    };

    fetchAllItems();
  }, []);

  return (
    <div className="container mx-auto flex flex-col gap-10">
      <h1 className="font-bold text-2xl">Waiters</h1>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Empty Slots</th>
            <th>Assigned Tables</th>
          </tr>
        </thead>
        <tbody>
          {waiters.map((waiter, i) => (
            <tr key={i}>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={`https://api.lorem.space/image/face?w=150&h=150&${Math.random()}`}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{waiter.username}</div>
                  </div>
                </div>
              </td>
              <td>
                <select
                  className="select w-40 max-w-xs"
                  value={waiter.status ? "available" : "unavailable"} // update the value prop here
                  onChange={(event) => handleWaiterStatusChange(event, i)}
                >
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                </select>
              </td>
              <td>
                {waiter.maxTables -
                  (waiter.assignedTables ? waiter.assignedTables.length : 0)}
              </td>
              <td>
                {waiter.assignedTables && waiter.assignedTables.length > 0 ? (
                  <td>
                    <div className="dropdown dropdown-bottom">
                      <label tabIndex={0} className="btn m-1">
                        Details
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-slate-300"
                      >
                        <li>
                          <div className="row" style={{ gap: "50px" }}>
                            <span className="column">Table No.</span>
                            <span className="column">Time</span>
                          </div>
                          {waiter.assignedTables.map((table, j) => (
                            <div
                              className="row"
                              style={{ gap: "120px" }}
                              key={j}
                            >
                              <span className="column">{table.tableNo}</span>
                              <span className="column">{table.time}</span>
                            </div>
                          ))}
                        </li>
                      </ul>
                    </div>
                  </td> // move the closing tag here
                ) : (
                  <td>No Tables Assigned</td>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-warning self-end" onClick={() => update()}>
        Update
      </button>

      <h1 className="font-bold text-2xl">Tables</h1>

      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Table No.</th>
            <th>Time</th>
            <th>Waiter</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table, i) => (
            <tr key={i}>
              <td>{table.tableNo}</td>
              <td>{table.time}</td>
              <td>
                <select
                  className="select w-40 max-w-xs"
                  value={table.waiter ? table.waiter.username : ""}
                  onChange={(event) =>
                    handleAssignTable(table.tableNo, event.target.value)
                  }
                  id={`select-${table.tableNo}`}
                >
                  <option value="">--Select--</option>
                  {waiters
                    .filter((waiter) => waiter.status)
                    .map((waiter, j) => (
                      <option value={waiter.username} key={j}>
                        {waiter.username}
                      </option>
                    ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-warning self-end" onClick={() => Assign()}>
        Assign
      </button>
    </div>
  );
};
