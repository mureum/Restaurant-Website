import React from "react";
import "./styles.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tableNo = searchParams.get("tableNo");
  console.log("Table number:", tableNo);

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/pendingOrders`);
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
    };
    fetchAllItems();
  }, []);

  const [items, setItems] = useState([]);
  console.log(items);

  const updatePaymentStatus = async (tableNo, status) => {
    try {
      await axios.put(
        `http://localhost:8800/paymentUpdate/` + tableNo + "/" + status
      );
      console.log("Paying Status updated!");
      window.location.href = `/TableInput`;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <form noValidate>
        <div className="row">
          <div className="col">
            <h3 className="title">billing address</h3>

            <div className="inputBox">
              <span>full name :</span>
              <input type="text" placeholder="john deo" required />
            </div>
            <div className="inputBox">
              <span>email :</span>
              <input type="email" placeholder="example@example.com" required />
            </div>
            <div className="inputBox">
              <span>address :</span>
              <input type="text" placeholder="street" required />
            </div>

            <div className="flex">
              <div className="inputBox">
                <span>state :</span>
                <input type="text" placeholder="india" required />
              </div>
            </div>
          </div>

          <div className="col">
            <h3 className="title">payment</h3>

            <div className="inputBox">
              <span>name on card :</span>
              <input type="text" placeholder="mr. john deo" required />
            </div>
            <div className="inputBox">
              <span>card number :</span>
              <input type="number" placeholder="****************" required />
            </div>
            <div className="inputBox">
              <span>exp month :</span>
              <input type="text" placeholder="january" required />
            </div>

            <div className="flex">
              <div className="inputBox">
                <span>exp year :</span>
                <input type="number" placeholder="2022" required />
              </div>
              <div className="inputBox">
                <span>CVV :</span>
                <input type="text" placeholder="1234" required />
              </div>
            </div>
          </div>
        </div>

        <input
          type="submit"
          value="proceed to checkout"
          className="submit-btn btn"
          onClick={(e) => {
            e.preventDefault();
            updatePaymentStatus(tableNo, true);
          }}
        />
        <button
          className="submit-btn btn btn-warning"
          style={{ backgroundColor: "orange" }}
          onClick={(e) => {
            e.preventDefault();
            updatePaymentStatus(tableNo, false);
          }}
        >
          Pay Later
        </button>
      </form>
    </div>
  );
}

export default App;
