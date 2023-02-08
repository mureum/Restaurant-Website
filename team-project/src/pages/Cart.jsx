import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import "../App.css";
import { Navbar } from '../common/Navbar';

const Cart = () => {
    const [cartItems, setItems] = useState([])
    const location = useLocation()
    const { items } = location.state 

    //Function to delete item from cart
    const deleteFromCart = (id) => {
        let updatedCart = cartItems.filter((item) => item.item_id !== id);
        setItems(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      };

      useEffect(() => {
        if (items) {
          setItems(items);
          localStorage.setItem("cartItems", JSON.stringify(items));
        } else {
          const cartData = JSON.parse(localStorage.getItem("cartItems")) || [];
          setItems(cartData);
        }
      }, [items]); // here we add the dependency items to useEffect, so when the items are changed, the effect is triggered and sets the localStorage with the updated items.

    return (
        <div className="App">
        <Navbar />
        <p>Don't refresh the page!</p>
            <div className="items"  style={{  width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap", margin: "0 auto", maxWidth: "900px"}}>
            {cartItems && cartItems.length > 0 ? (
                cartItems.map((item) => (
                    <div className={`item ${item.item_id%2===0 ? "rowA" : "rowB"}`}
                    style={{
                        width: 'auto',
                        flexBasis:"40%", 
                        height: '100%', 
                        //backgroundColor: "white" 
                        }} key={item.item_id}>
                        <img src={`https://www.themealdb.com/images/ingredients/${item.name}.png`} style={{width: "100%", height: "auto", objectFit: "cover", backgroundColor: "white"}} alt={`${item.name} image`} onError={e => e.target.src=`https://spoonacular.com/cdn/ingredients_100x100/${item.name}.jpg`}/>
                        <h2>{item.name}</h2>
                        <p>£{item.price}</p>
                        <br></br>
                        <button className="text-3xl font-bold text-yellow-100 uppercase space-x-3 delete" onClick={() => deleteFromCart(item.item_id)}>Delete</button>
                    </div>
                ))
            ) : (
                <div>
                    <h1>The Cart is Empty</h1>
                </div>
            )}
          </div>  
        </div>
    );
}

export default Cart;