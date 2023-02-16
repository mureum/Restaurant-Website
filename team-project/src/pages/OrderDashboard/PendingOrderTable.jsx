import { useState } from "react";

export const PendingOrderTable = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <div className="flex flex-col gap-4">
      <table className="table w-full">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Table no.</th>
            <th>Order number</th>
            <th>Customer Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
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
                      src="/tailwind-css-component-profile-2@56w.png"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Hart Hagerty</div>
                  <div className="text-sm opacity-50">United States</div>
                </div>
              </div>
            </td>
            <td>
              Order #1234
              <br />
              <label
                htmlFor="my-modal"
                className="badge badge-success cursor-pointer"
              >
                Details
              </label>
              <input type="checkbox" id="my-modal" className="modal-toggle" />
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
            </td>
            <td>Test Name</td>
            <th>
              <button className="btn btn-ghost btn-xs">15:55pm</button>
            </th>
          </tr>
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
        <button className="btn btn-primary">Send to Kitchen</button>
        <button className="btn btn-warning">Cancel Order</button>
      </div>
    </div>
  );
};
