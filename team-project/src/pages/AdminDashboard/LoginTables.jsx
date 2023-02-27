import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { renderToString } from "react-dom/server";

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

export const LoginTables = ({ nextStepText, isCancellable }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchAlltems = async () => {
      try {
        const res = await axios.get("http://localhost:8800/logins");
        const transformedData = res.data.map((item) => ({
          username: item.username,
          password: item.password,
          permission: item.permissions,
        }));
        setItems(transformedData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAlltems();
    console.log(items);
  }, []);

  const deleteUser = async (selectedItems) => {
    try {
      const itemsToSend = Object.entries(selectedItems)
        .filter(([_, isSelected]) => isSelected)
        .map(([index, _]) => items[index]);

      if (itemsToSend.length === 0) {
        window.alert("Please select at least one user to delete");
        return;
      }

      const usernamesToSend = itemsToSend.map(
        (item) => "'" + item.username.replace(/"/g, "'") + "'"
      );
      console.log(usernamesToSend);
      const UsernameNumberString = usernamesToSend.join(",");
      console.log(UsernameNumberString);
      const response = await axios.post(`http://localhost:8800/deleteUser`, {
        usernames: UsernameNumberString,
      });

      if (response.data.success) {
        window.alert("Selected users deleted");
        window.location.reload();
      } else {
        window.alert("Error on deleting the users");
      }
    } catch (err) {
      window.alert("Error on deleting the users");
      console.log(err);
    }
  };

  const data =
    items.length > 0 ? items.sort((a, b) => a.username - b.username) : ORDER;

  // Render the data
  const [selectedItems, setSelectedItems] = useState(
    data.map((_, i) => ({ [i]: false })).reduce((a, b) => ({ ...a, ...b }))
  );

  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const allSelected = Object.values(selectedItems).every((v) => v);
    setSelectAll(allSelected);
  }, [selectedItems]);

  const usernames = Object.entries(selectedItems)
    .filter(([_, isSelected]) => isSelected)
    .map(([index, _]) => data[index].username);

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
              <th>Username</th>
              <th>Password</th>
              <th>Permission</th>
            </tr>
          </thead>
          <tbody>
            {data
              .sort((a, b) => a.username.localeCompare(b.username))
              .map((order, i) => (
                <tr>
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={selectedItems[i]}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setSelectedItems((prevState) => ({
                            ...prevState,
                            [i]: isChecked,
                          }));
                        }}
                      />
                    </label>
                  </th>
                  <td>
                    <div className="font-bold">{order.username}</div>
                  </td>
                  <td>
                    <div>
                      <div className="font-bold">{order.password}</div>
                      <input
                        type="checkbox"
                        id={`my-modal-${order.password}`}
                        className="modal-toggle"
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="font-bold">{order.permission}</div>
                      <input
                        type="checkbox"
                        id={`my-modal-${order.permission}`}
                        className="modal-toggle"
                      />
                    </div>
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
            onClick={() => deleteUser(selectedItems)}
          >
            {nextStepText}
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default LoginTables;
