import { useState } from "react";

const ORDER = [
  {
    tableNumber: 1,
    orderNumber: 1234,
    customerName: "John Doe",
    time: "12:00",
    details: {},
  },
  {
    tableNumber: 1,
    orderNumber: 1234,
    customerName: "John Doe",
    time: "12:00",
    details: {},
  },
];

export const OrderTable = ({ nextStepText, isCancellable }) => {
  const [selectedItems, setSelectedItems] = useState(
    ORDER.map((_, i) => ({ [i]: false })).reduce((a, b) => ({ ...a, ...b }))
  );

  return (
    <div className="flex flex-col gap-4">
      <table className="table w-full">
        <thead>
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={Object.values(selectedItems).every((v) => v)}
                  onChange={(e) => {
                    for (const [key] of Object.entries(selectedItems)) {
                      selectedItems[key] = e.target.checked;
                    }
                    setSelectedItems({ ...selectedItems });
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
          {ORDER.map((order, i) => (
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
                    <div className="font-bold">Order {order.tableNumber}</div>
                    <label
                      htmlFor="my-modal"
                      className="badge badge-success cursor-pointer"
                    >
                      Details
                    </label>
                    <input
                      type="checkbox"
                      id="my-modal"
                      className="modal-toggle"
                    />
                    <div className="modal">
                      <div className="modal-box relative">
                        <label
                          htmlFor="my-modal"
                          className="btn btn-sm btn-circle absolute right-2 top-2"
                        >
                          ✕
                        </label>
                        <h3 className="text-lg font-bold">Details</h3>
                        <p className="py-4">Order Details</p>
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
      <div className="flex gap-2 self-end">
        {nextStepText ? (
          <button className="btn btn-primary">{nextStepText}</button>
        ) : (
          <></>
        )}
        {isCancellable ? (
          <button className="btn btn-warning">Cancel Order</button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
