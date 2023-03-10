import axios from "axios";
import { useEffect, useState } from "react";

export const TableAssignment = ({ setIsLoggedIn, handleLogin }) => {
  const [tables, setTables] = useState([]);
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
      await axios.put(`http://localhost:8800/tables`, tables);
      await axios.put(`http://localhost:8800/waiters`, waiters);
      console.log("Tables and waiters updated!");
    } catch (err) {
      console.log(err);
    }
  };

  const handleWaiterStatusChange = (event, index) => {
    const newWaiters = [...waiters];
    newWaiters[index].status = event.target.value === "available";
    setWaiters(newWaiters);
  };

  const handleAssignTable = (tableNo, selectedWaiter) => {
    const selectedTable = tables.find((table) => table.tableNo === tableNo);

    if (!selectedTable || !selectedWaiter) {
      return;
    }

    if (selectedTable.waiter) {
      // The table is already assigned to a waiter
      return;
    }

    const updatedWaiters = waiters.map((waiter) => {
      if (waiter.username === selectedWaiter.username) {
        const updatedAssignedTables = Array.isArray(waiter.assignedTables)
          ? [...waiter.assignedTables]
          : [];
        updatedAssignedTables.push({
          tableNo: tableNo,
          time: new Date().toISOString(),
        });
        return {
          ...waiter,
          assignedTables: updatedAssignedTables,
        };
      }
      return waiter;
    });

    const updatedTables = tables.map((table) => {
      if (table.tableNo === tableNo) {
        return {
          ...table,
          waiter: selectedWaiter,
        };
      }
      return table;
    });

    setWaiters(updatedWaiters);
    setTables(updatedTables);
  };

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/waiters`);
        const transformedWaiters = res.data.map((item) => ({
          username: item.username,
          status: item.status,
          assignedTables: item.assignedTables,
          maxTables: 7,
        }));
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
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Name</th>
            <th>Status</th>
            <th>Empty Slots</th>
            <th>Assigned Tables</th>
          </tr>
        </thead>
        <tbody>
          {waiters.map((waiter, i) => (
            <tr key={i}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
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
                  value={waiter.status ? "available" : "unavailable"}
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
                          {waiter.assignedTables &&
                            waiter.assignedTables.length > 0 &&
                            waiter.assignedTables.map((table, j) => (
                              <div
                                className="row"
                                style={{ gap: "50px" }}
                                key={j}
                              >
                                <span className="column">{table.tableNo}</span>
                                <span className="column">{table.time}</span>
                              </div>
                            ))}
                        </li>
                      </ul>
                    </div>
                  </td>
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
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Table No.</th>
            <th>Time</th>
            <th>Waiter</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table, i) => (
            <tr key={i}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>{table.tableNo}</td>
              <td>{table.time}</td>
              <td>
                <select
                  className="select w-40 max-w-xs"
                  value={table.waiter ? table.waiter.username : ""}
                  onChange={(event) =>
                    handleAssignTable(
                      table.tableNo,
                      waiters.findIndex(
                        (waiter) => waiter.username === event.target.value
                      )
                    )
                  }
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
