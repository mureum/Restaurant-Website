import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../App.css";
import { Link } from 'react-router-dom';

const Cart = ({ isLoggedIn }) => {
  const [cartItems, setItems] = useState([]);
  const location = useLocation();
  const { items, values } = location.state;

  const decrementItemAmount = (index) => {
    const updatedItems = [...cartItems];
    if (updatedItems[index].amount > 0) {
      updatedItems[index].amount -= 1;
      setItems(updatedItems);
    }
  };

  const incrementItemAmount = (index) => {
    const updatedItems = [...cartItems];
    if (updatedItems[index].amount >= 0) {
      updatedItems[index].amount += 1;
      setItems(updatedItems);
    }
  };

  //Function to delete item from cart
  const deleteFromCart = (id) => {
    let updatedCart = cartItems.filter((item) => item.item_id !== id);
    setItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const deleteAllFromCart = () => {
    let updatedCart = cartItems.filter((item) => item.item_id !== item.item_id);
    setItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    if (items) {
      // Group items by item_id and keep the one with the highest amount
      const groupedItems = items.reduce((acc, curr) => {
        const existingItem = acc.find((item) => item.item_id === curr.item_id);
        if (!existingItem || existingItem.amount < curr.amount) {
          return [...acc.filter((item) => item.item_id !== curr.item_id), curr];
        }
        return acc;
      }, []);
      setItems(groupedItems);
      localStorage.setItem("cartItems", JSON.stringify(groupedItems));
    } else {
      const cartData = JSON.parse(localStorage.getItem("cartItems")) || [];
      setItems(cartData);
    }
  }, [items]);

  var total = 0;

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
                  <img
                    src={`https://www.themealdb.com/images/ingredients/${item.name}.png`}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                      backgroundColor: "white",
                    }}
                    alt={`${item.name} image`}
                    onError={(e) =>
                      (e.target.src = `https://spoonacular.com/cdn/ingredients_100x100/${item.name}.jpg`)
                    }
                  />
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
                <Link to="/checkout">
                <button
                  className="text-3xl font-bold text-yellow-100 uppercase space-x-3 delete"
                >

                  Checkout
                </button>
                </Link>
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
      <br></br>
    </div>
  );
};

export default Cart;
