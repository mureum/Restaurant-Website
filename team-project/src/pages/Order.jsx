import "react-responsive-carousel/lib/styles/carousel.min.css";
import logo from "../assets/Oxaca_Restaurants_Logo_White.png";
import menu from "../assets/Menu.png";
import "../App.css";
import { Navbar } from '../common/Navbar';
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';



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
    },[])
    const divStyle = {
      width: "100vh",
      height: "100%",
      display: "flex",
      flexFlow: "row wrap",
      justifyContent: "space-between",
      maxWidth: "100%",
      maxHeight: "100%"
    };
  return (
    <div className="App">
<Navbar />
    <div style={{ width: '100%', overflowX: 'auto'}}>
    <img
        src={menu}
        width="300"
        height="300"
        style={{ marginLeft: "40%", marginTop: "10px", backgroundColor:"black" }}
      />
        <div className="items"  style={{  width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap", margin: "0 auto", maxWidth: "900px"}}>
            {items.map(item => (
                <div className='item' style={{ width: '300px',flexBasis:"30%", height: '33.33%', backgroundColor: "red" }} key={item.item_ID}>
                    {item.cover && <img src={item.cover} alt="" />}
                    <h2>{item.name}</h2>
                    <p>£{item.price}</p>
                    <span>{item.calories}</span>
                </div>
            ))}
        </div>
        <br></br>
    </div>
  </div>
  );
}

export default Order;
