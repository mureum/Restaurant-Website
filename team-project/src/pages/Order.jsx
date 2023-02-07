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

  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

const handleChange = (e) => {
  setSearchTerm(e.target.value);
  let searchResults = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setSearchResults(searchResults);
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
      </div>
      <br></br>
        <div className="items"  style={{  width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap", margin: "0 auto", maxWidth: "900px"}}>
        {items.map(item => (
        <div className="item" 
          style={{
              display: activeBtn === "all" || activeBtn === item.type_id ? "block" : "none", 
              width: 'auto',
              flexBasis:"40%", 
              height: '100%', 
              backgroundColor: "white" 
            }} key={item.item_ID}>
            <img src={`https://www.themealdb.com/images/ingredients/${item.name}.png`} style={{width: "100%", height: "auto", objectFit: "cover", backgroundColor: "white"}} alt={`${item.name} image`} onError={e => e.target.src=`https://spoonacular.com/cdn/ingredients_100x100/${item.name}.jpg`}/>
            <h2>{item.name}</h2>
            <p>£{item.price}</p>
            <span>{item.calories}cal</span>
            <br></br>
            <button className="text-3xl font-bold text-yellow-100 uppercase space-x-3 add-to-cart">
              <Link to="/">Add to cart</Link>
            </button>
        </div>
      ))}
        </div>
        <br></br>
    </div>
  </div>
  );
}


export default Order;
