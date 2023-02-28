import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { renderToString } from "react-dom/server";

const USERS = [
  {
    username: "Username1",
    password: "Password1",
    permission: "Waiter",
  },
  {
    username: "Username2",
    password: "Password2",
    permission: "Kitchen",
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
        (item) => "'" + item.username.replace(/'/g, "''") + "'"
      );
      const usernamesQueryString = usernamesToSend.join(",");
      const response = await axios.delete("http://localhost:8800/deleteUser", {
        data: { usernames: usernamesToSend },
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

  const updateUser = async (prevUsername, username, password) => {
    try {
      console.log(prevUsername + " " + username + " " + password);
      const response = await axios.put(
        `http://localhost:8800/logins/update/` +
          prevUsername +
          "/" +
          username +
          "/" +
          password
      );
      if (response.status === 200) {
        window.alert("User updated successfully");
        setSelectedItems({});
        window.location.reload();
      } else {
        window.alert("Error updating user");
        console.log("response.err");
      }
    } catch (err) {
      window.alert("Error updating user");
      console.log(err);
    }
  };

  const data =
    items.length > 0 ? items.sort((a, b) => a.username - b.username) : USERS;

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
                    <input
                      type="checkbox"
                      id={`my-modal-${order.username}`}
                      className="modal-toggle"
                    />
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
                    <div className="font-bold">{order.username}</div>
                    <div>
                      <label
                        htmlFor={`my-modal-toggle-${order.username}`}
                        className="badge badge-success cursor-pointer"
                      >
                        Update
                      </label>
                      <input
                        type="checkbox"
                        id={`my-modal-toggle-${order.username}`}
                        className="modal-toggle"
                      />
                      <div className="modal">
                        <div className="modal-box relative">
                          <label
                            htmlFor={`my-modal-toggle-${order.username}`}
                            className="btn btn-sm btn-circle absolute right-2 top-2"
                          >
                            ✕
                          </label>
                          <h3 className="text-lg font-bold">
                            Update {order.username}
                          </h3>
                          <p>Username</p>
                          <input
                            type="text"
                            id={`my-modal-username-${order.username}`}
                            style={{ border: "1px solid black" }}
                            defaultValue={order.username}
                          />
                          <p>Password</p>
                          <input
                            type="password"
                            id={`my-modal-password-${order.username}`}
                            style={{ border: "1px solid black" }}
                          />
                          <button
                            className="btn btn-primary float-right"
                            onClick={() =>
                              updateUser(
                                order.username,
                                document.getElementById(
                                  `my-modal-username-${order.username}`
                                ).value,
                                document.getElementById(
                                  `my-modal-password-${order.username}`
                                ).value
                              )
                            }
                          >
                            Update User
                          </button>
                        </div>
                      </div>
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
