import axios from "axios";
import { useEffect, useState } from "react";

export const TableAssignment = ({ setIsLoggedIn, handleLogin }) => {
  const [waiters, setWaiters] = useState([]);

  const update = () => {
    // TODO
    // Call the backend to update
  };

  useEffect(() => {
    const fetchAlltems = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/getAvailableWaiters`
        );
        const transformedData = res.data.map((item) => ({
          tableNumber: item.table_no,
          orderNumber: item.order_no,
          customerName: item.customer_name,
          time: item.time,
          details: item.order_description,
        }));
        setWaiters(transformedData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAlltems();
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
          {/* row 1 */}
          <tr>
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
                  <div className="font-bold">Hart Hagerty</div>
                </div>
              </div>
            </td>
            <select className="select w-40 max-w-xs">
              <option>Available</option>
              <option>Unavailable</option>
            </select>
            <th></th>
            <th>
              <div className="dropdown dropdown-bottom">
                <label tabIndex={0} className="btn m-1">
                  Details
                </label>
                <ul tabIndex={0} className="dropdown-content menu bg-slate-300">
                  <li>
                    <div className="row" style={{ gap: "50px" }}>
                      <span className="column">Tables no.</span>
                      <span className="column">Time</span>
                    </div>
                  </li>
                </ul>
              </div>
            </th>
          </tr>
          {/* row 2 */}
          <tr>
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
                  <div className="font-bold">Brice Swyre</div>
                </div>
              </div>
            </td>
            <select className="select w-40 max-w-xs">
              <option>Available</option>
              <option>Unavailable</option>
            </select>
            <th></th>
            <th>
              <div className="dropdown dropdown-bottom">
                <label tabIndex={0} className="btn m-1">
                  Details
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu  bg-slate-300"
                >
                  <li>
                    <div className="row" style={{ gap: "50px" }}>
                      <span className="column">Tables no.</span>
                      <span className="column">Time</span>
                    </div>
                  </li>
                </ul>
              </div>
            </th>
          </tr>
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </tfoot>
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
          {/* row 1 */}
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>
              <div className="flex items-center space-x-3">
                <div>
                  <div className="font-bold">Hart Hagerty</div>
                </div>
              </div>
            </td>
            <td>
              Zemlak, Daniel and Leannon
              <br />
              <span className="badge badge-ghost badge-sm">
                Desktop Support Technician
              </span>
            </td>
            <td>Purple</td>
          </tr>
          {/* row 2 */}
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>
              <div className="flex items-center space-x-3">
                <div>
                  <div className="font-bold">Brice Swyre</div>
                </div>
              </div>
            </td>
            <td>
              Carroll Group
              <br />
              <span className="badge badge-ghost badge-sm">Tax Accountant</span>
            </td>
            <td>Red</td>
          </tr>
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </tfoot>
      </table>
      <button className="btn btn-warning self-end" onClick={() => update()}>
        Update
      </button>
    </div>
  );
};
