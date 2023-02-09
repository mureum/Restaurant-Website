import "react-responsive-carousel/lib/styles/carousel.min.css";
import logo from "../assets/Oxaca_Restaurants_Logo_White.png";
import menu from "../assets/Menu.png";
import "../App.css";
import { Navbar } from '../common/Navbar';
import React, { useRef } from 'react';
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Cart from "../pages/Cart";


function Order() {
  const [items,setItems] = useState([])

    useEffect(()=>{
        const fecthAllItems = async ()=>{
            try{

                const res = await axios.get("http://localhost:8800/orders")
                setItems(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fecthAllItems()
        setItems([{
      item_id:0,      
      price: "5",
      calories: "200",
      name: "test"

    },
  {
      item_id:0,      
      price: "5",
      calories: "200",
      name: "test"

    },
  {
      item_id:0,      
      price: "£5",
      calories: "200",
      name: "test"

    },
  {
      item_id:0,      
      price: "£5",
      calories: "200",
      name: "test"

    },
  {
      item_id:0,      
      price: "£5",
      calories: "200",
      name: "test"

    },])
    },[])

    const fetchVGNItems = async (id)=>{
      try {
        const res = await axios.get("http://localhost:8800/orders"+id)
          setItems(res.data)
          //window.location.reload()
      }catch(err) {
          console.log(err)
      }
    }

    const handleCheckVgn = async () => {
      setIsChecked(prevState => !prevState);
      if (!isChecked) {
        fetchVGNItems();
      } else {
        fetchAlltems();
      }
    };

    const fetchAlltems = async (id)=>{
      try {
        const res = await axios.get("http://localhost:8800/orders")
          setItems(res.data)
          //window.location.reload()
      }catch(err) {
          console.log(err)
      }
    }

    const divStyle = {
      width: "100vh",
      height: "100%",
      display: "flex",
      flexFlow: "row wrap",
      justifyContent: "space-between",
      maxWidth: "100%",
      maxHeight: "100%"
    };

    const [activeBtn, setActiveBtn] = useState("all");
  const [filterDivs, setFilterDivs] = useState([
    {
      className:"filterDiv MA",
      text:"MA"
    },
    {
      className:"filterDiv all",
      text:"all"
    },
    {
      className:"filterDiv ST",
      text:"ST"
    },

  ]);

  const filterSelection = (c) => {
    setActiveBtn(c)
    let x, i;
    x = document.getElementsByClassName("filterDiv");
    if (c === "all") c = "";
    for (i = 0; i < x.length; i++) {
      if (x[i].className.indexOf(c) > -1) {
        x[i].style.display = "block";
      } else {
        x[i].style.display = "none";
      }
    }
  }

  const [isChecked, setIsChecked] = useState(false);

  const [cart, setCart] = React.useState([]);
  //Function to add item to cart
  const addToCart = (name, id, price) => {
    let cartItems = {
      name: name,
      item_id: id,
      price: price
    }
    setCart([...cart, cartItems])
  }

    const checkListRef = useRef(null);

    const handleClick = (event) => {
      if (checkListRef.current.classList.contains('visible')) {
        checkListRef.current.classList.remove('visible');
      } else {
        checkListRef.current.classList.add('visible');
      }
    };

  return (
    <div className="App">
    <Navbar />
    <div style={{ width: '100%', overflowX: 'auto'}}>

      <br></br>
      <div id="myBtnContainer">
        <button 
          className={activeBtn === "all" ? "btn active" : "btn"} 
          onClick={() => filterSelection("all")}
        >
          Show all
        </button>
        <button 
          className={activeBtn === "MA" ? "btn active" : "btn"} 
          onClick={() => filterSelection("MA")}
        >
          Main
        </button>
        <button 
          className={activeBtn === "ST" ? "btn active" : "btn"} 
          onClick={() => filterSelection("ST")}
        >
          Starters
        </button>
        <button
          className={activeBtn === "SI" ? "btn active" : "btn"}
          onClick={() => filterSelection("SI")}
        >
          Sides
        </button>
        <button
          className={activeBtn === "DE" ? "btn active" : "btn"}
          onClick={() => filterSelection("DE")}
        >
          Desserts
        </button>
        <button
          className={activeBtn === "DR" ? "btn active" : "btn"}
          onClick={() => filterSelection("DR")}
        >
          Drinks
        </button>
        <button className="absolute top-[85px] right-[90px]">
        <Link to="/cart" state={{items: cart}}>
          <img src="https://cdn-icons-png.flaticon.com/512/3081/3081986.png" alt="cart"
          height="30px"
          width="50px"
          />
          </Link>
        </button>
        <div id="list1" className="dropdown-check-list" ref={checkListRef} tabIndex="100">
          <span className="anchor" onClick={handleClick}>Filter</span>
          <ul className="items">
            <li><input type="checkbox" checked={isChecked} onChange={handleCheckVgn}/> VGN Items</li>
          </ul>
        </div>
      </div>
      <br></br>
        <div className="grid-cols-2 gap-4 grid container mx-auto">
        {items.map(item => (
        <div className={`item ${item.item_id%2===0 ? "rowA" : "rowB"}`}
          style={{
              display: activeBtn === "all" || activeBtn === item.type_id ? "block" : "none", 
              width: 'auto',
              flexBasis:"40%", 
              height: '100%', 
              //backgroundColor: "white" 
            }} key={item.item_id}>
            <img src={`https://www.themealdb.com/images/ingredients/${item.name}.png`} style={{width: "100%", 
            height: "auto", objectFit: "cover", 
            backgroundColor: "white"}} alt={`${item.name} image`} 
            onError={e => e.target.src=`https://spoonacular.com/cdn/ingredients_100x100/${item.name}.jpg`}/>
            <h2>{item.name}</h2>
            <p>£{item.price}</p>
            <span>{item.calories}cal</span>
            <br></br>
            <button className="text-3xl font-bold text-yellow-100 uppercase space-x-3 add-to-cart" onClick={() => addToCart(item.name, item.item_id, item.price)}>
              Add to cart
            </button>
        </div>
      ))}
        </div>
        <br></br>
    </div>
    <div>
      {cart.map((item, index) => (
        <div key={index}>
          <p>Name: {item.name}</p>
          <p>Item id: {item.item_id}</p>
          <p>Price: {item.price}</p>
        </div>
      ))}
    </div>
  </div>
  );
}


export default Order;
