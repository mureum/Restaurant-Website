import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../App.css";
import axios from "axios";

const Cart = () => {
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [itemList, setItemList] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fecthAllImages = async () => {
      try {
        const res = await axios.get("http://localhost:8800/images");
        setImages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fecthAllImages();
  }, []);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(cartData);
  }, []);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const items = cartItems.reduce((acc, item) => {
        if (item.amount > 0) {
          return acc + `${item.amount} ${item.name}, `;
        }
        return acc;
      }, "");
      setItemList(items.slice(0, -2)); // remove the last comma and space
    } else {
      setItemList("");
    }
  }, [cartItems]);

  const decrementItemAmount = (index) => {
    const updatedItems = [...cartItems];
    if (updatedItems[index].amount > 0) {
      updatedItems[index].amount -= 1;
      setCartItems(updatedItems);
    }
  };

  const incrementItemAmount = (index) => {
    const updatedItems = [...cartItems];
    if (updatedItems[index].amount < updatedItems[index].stock_available) {
      updatedItems[index].amount += 1;
      setCartItems(updatedItems);
    } else {
      alert(
        `Not enough stock for ${updatedItems[index].name} (available: ${updatedItems[index].stock_available})`
      );
    }
  };

  //Function to delete item from cart
  const deleteFromCart = (id) => {
    let updatedCart = cartItems.filter((item) => item.item_id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const deleteAllFromCart = () => {
    let updatedCart = cartItems.filter((item) => item.item_id !== item.item_id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const { items } = location.state;
    if (items) {
      // Group items by item_id and keep the one with the highest amount
      const groupedItems = items.reduce((acc, curr) => {
        const existingItem = acc.find((item) => item.item_id === curr.item_id);
        if (!existingItem || existingItem.amount < curr.amount) {
          return [...acc.filter((item) => item.item_id !== curr.item_id), curr];
        }
        return acc;
      }, []);
      setCartItems(groupedItems);
      localStorage.setItem("cartItems", JSON.stringify(groupedItems));
    }
  }, [location.state]);

  var total = 0;

  const [table, setTable] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [time, setTime] = useState(new Date().toLocaleTimeString()); // Initialize the time to the current time

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString()); // Update the time every second
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const deleteFromStock = async (id, amount) => {
    try {
      const res = await axios.put(
        "http://localhost:8800/orders/reduceStock/" + id + "/" + amount
      );
      console.log("Item " + id + " stock reduced by " + amount);
    } catch (err) {
      window.alert("Error sending the order");
      console.log(err);
    }
  };

  const handleSubmit = async (totCost) => {
    // Send order to server
    try {
      const res = await axios.put(
        "http://localhost:8800/orders/waiter/" +
          table +
          "/" +
          customerName +
          "/" +
          time +
          "/" +
          itemList +
          "/" +
          totCost
      );
      console.log(res);
      // Call deleteFromStock for each item in cart
      try {
        for (const item of cartItems) {
          console.log(item.item_id + " - " + item.amount);
          await deleteFromStock(item.item_id, item.amount);
        }
      } catch (err) {
        console.log(err);
        return;
      }
      alert("Your order has been sent!");
      window.location.href = `/payment?tableNo=${table}`;
    } catch (err) {
      window.alert("Error sending the order");
      console.log(err);
    }

    // Reset cart and form
    setCartItems([]);
    setTable("");
    setCustomerName("");
  };

  return (
    <div className="App">
      <p>Don't refresh the page!</p>
      <div className="backgroundofcart">
        <div className="Header">
          <h3 className="Heading">Shopping Cart</h3>
          <button onClick={() => deleteAllFromCart()}>
            <h5 className="Action">Remove all</h5>
          </button>
        </div>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <>
              <div className="items-in-cart">
                <div className="image-box">
                  {images
                    .filter((image) => image.item_id === item.item_id)
                    .map((image) => (
                      <img
                        key={image.item_id}
                        className="lg:w-[250px] object-cover lg:h-[220px] lg:m-0 mx-10 mb-10 lg:self-center"
                        src={image.link}
                        alt={`${item.name} image`}
                      />
                    ))}
                </div>
                <div className="about">
                  <h1 className="title">
                    {item.amount} {item.name}
                  </h1>
                  <h3 className="subtitle" style={{ display: "none" }}>
                    {item.name}
                  </h3>
                </div>
                <div className="prices">
                  <div className="amount">£{item.price * item.amount}</div>{" "}
                  <div style={{ display: "none" }}>
                    {(total = total + parseFloat(item.price * item.amount))}
                  </div>
                </div>
                <br></br>
                <button
                  className="text-3xl font-bold uppercase space-x-3 decrement-increment"
                  onClick={() => decrementItemAmount(index)}
                >
                  -
                </button>
                <button
                  className="text-3xl font-bold uppercase space-x-3 decrement-increment"
                  onClick={() => incrementItemAmount(index)}
                >
                  +
                </button>
                <button
                  className="text-3xl font-bold text-yellow-100 uppercase space-x-3 delete"
                  onClick={() => deleteFromCart(item.item_id)}
                >
                  Delete
                </button>
              </div>
              <br></br>
            </>
          ))
        ) : (
          <div>
            <h1>The Cart is Empty</h1>
          </div>
        )}
        <br></br>
      </div>
      <p className="total-amount"> total = £{total}</p>
      <br></br>
      <button
        className="btn btn-primary"
        htmlFor={`my-modal-toggle-username`}
        onClick={() => {
          document.getElementById("my-modal-toggle-username").checked = true;
        }}
      >
        Call Waiter
      </button>
      <input
        type="checkbox"
        id={`my-modal-toggle-username`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor={`my-modal-toggle-username`}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Call the waiter</h3>
          <label className="form-label">Table Number *</label>
          <input
            type="number"
            className="form-control"
            style={{ border: "1px solid black" }}
            id={`my-modal-username-username`}
            placeholder="Enter your table number"
            onChange={(e) => setTable(e.target.value)}
            required
          />
          <label className="form-label">Customer Name</label>
          <input
            type="text"
            style={{ border: "1px solid black" }}
            className="form-control"
            id={`my-modal-name-username`}
            placeholder="Customer Name"
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <button
            className="btn btn-primary float-right"
            onClick={() => handleSubmit(total)}
          >
            Send Order
          </button>
        </div>
      </div>
      <br></br>
    </div>
  );
};

export default Cart;
