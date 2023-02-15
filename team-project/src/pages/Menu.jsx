import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../App.css";
import { Navbar } from "../common/Navbar";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Order({ isLoggedIn }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fecthAllItems = async () => {
      try {
        const res = await axios.get("http://localhost:8800/orders");
        setItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fecthAllItems();
  }, []);

  const fetchFilterDiets = async (id) => {
    try {
      const res = await axios.get("http://localhost:8800/orders/diets/" + id);
      setItems(res.data);
      //window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };
  const fetchFilterAllergens = async (id) => {
    try {
      const res = await axios.get(
        "http://localhost:8800/orders/allergens/" + id
      );
      setItems(res.data);
      //window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFilterItemAllergens = async (diet, allergen) => {
    try {
      const res = await axios.get(
        "http://localhost:8800/orders/itemAndAllergens/" + diet + "/" + allergen
      );
      setItems(res.data);
      //window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  const [checked, setChecked] = useState([]); //diet

  const handleCheck = async (id) => {
    setChecked((prevState) => !prevState);
    const newChecked = new Set(checked);
    id = "'" + id + "'";
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setChecked(Array.from(newChecked));
    if (newChecked.size === 0) {
      if (checked2[0] === undefined) {
        fetchAlltems();
      } else {
        const combinedId = Array.from(checked2).join(",");
        fetchFilterAllergens(combinedId);
      }
    } else {
      const combinedId = Array.from(newChecked).join(",");
      console.log(combinedId);
      if (checked2[0] === undefined) {
        fetchFilterDiets(combinedId);
      } else {
        fetchFilterItemAllergens(combinedId, checked2);
      }
    }
  };

  const [checked2, setChecked2] = useState([]); //allergens

  const handleCheck2 = async (id) => {
    setChecked2((prevState) => !prevState);
    const newChecked = new Set(checked2);
    id = "'" + id + "'";
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setChecked2(Array.from(newChecked));
    if (newChecked.size === 0) {
      if (checked[0] === undefined) {
        fetchAlltems();
      } else {
        const combinedId = Array.from(checked).join(",");
        console.log("Combined Id: " + combinedId);
        fetchFilterDiets(combinedId);
      }
    } else {
      const combinedId = Array.from(newChecked).join(",");
      console.log(combinedId);
      if (checked[0] === undefined) {
        fetchFilterAllergens(combinedId);
      } else {
        fetchFilterItemAllergens(checked, combinedId);
      }
    }
  };

  const fetchAlltems = async (id) => {
    try {
      const res = await axios.get("http://localhost:8800/orders");
      setItems(res.data);
      //window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  const divStyle = {
    width: "100vh",
    height: "100%",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between",
    maxWidth: "100%",
    maxHeight: "100%",
  };

  const [activeBtn, setActiveBtn] = useState("all");

  const filterSelection = (c) => {
    setActiveBtn(c);
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
  };

  const [cart, setCart] = React.useState([]);
  //Function to add item to cart
  const addToCart = (name, id, price, amount) => {
    let cartItems = {
      name: name,
      item_id: id,
      price: price,
      amount: amount,
    };
    if (amount > 0) {
      setCart([...cart, cartItems]);
    }
  };

  const checkListRef1 = useRef(null);
  const checkListRef2 = useRef(null);

  const handleClick1 = (event) => {
    if (checkListRef1.current.classList.contains("visible")) {
      checkListRef1.current.classList.remove("visible");
    } else {
      checkListRef1.current.classList.add("visible");
    }
  };

  const handleClick2 = (event) => {
    if (checkListRef2.current.classList.contains("visible")) {
      checkListRef2.current.classList.remove("visible");
    } else {
      checkListRef2.current.classList.add("visible");
    }
  };

  const [filter, setFilter] = useState(100000);
  const [value, setValue] = useState({});

  const handleChange = (id) => (e) => {
    setValue({ ...value, [id]: e.target.value });
  };

  const handleDecrement = (id) => {
    setValue({ ...value, [id]: (value[id] || 0) - 1 });
  };

  const handleIncrement = (id) => {
    setValue({ ...value, [id]: (value[id] || 0) + 1 });
  };

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} />
      <div style={{ width: "100%", overflowX: "auto" }}>
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
            <Link to="/cart" state={{ items: cart }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3081/3081986.png"
                alt="cart"
                height="30px"
                width="50px"
              />
            </Link>
          </button>
          <div
            id="list1"
            className="dropdown-check-list absolute right-60"
            ref={checkListRef1}
            tabIndex="100"
          >
            <span className="anchor" onClick={handleClick1}>
              Filter Diet
            </span>
            <ul className="items">
              <li>
                <input
                  type="checkbox"
                  checked={checked.includes("'VGN'")}
                  onChange={() => handleCheck("VGN")}
                  id="VGN"
                />
                Vegan Items
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={checked.includes("'VEG'")}
                  onChange={() => handleCheck("VEG")}
                  id="VEG"
                />
                Vegetarian Items
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={checked.includes("'GLT'")}
                  onChange={() => handleCheck("GLT")}
                  id="GLT"
                />
                Gluten-Free Items
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={checked.includes("'LAC'")}
                  onChange={() => handleCheck("LAC")}
                  id="LAC"
                />
                Lactose-Free Items
              </li>
            </ul>
          </div>
          <div
            id="list2"
            className="dropdown-check-list absolute right-10"
            ref={checkListRef2}
            tabIndex="100"
          >
            <span className="anchor" onClick={handleClick2}>
              Allergens
            </span>
            <ul className="items">
              <li>
                <input
                  type="checkbox"
                  checked={checked2.includes("'GL'")}
                  onChange={() => handleCheck2("GL")}
                  id="GL"
                />
                Gluten
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={checked2.includes("'CR'")}
                  onChange={() => handleCheck2("CR")}
                  id="CR"
                />
                Crustaceans
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={checked2.includes("'EG'")}
                  onChange={() => handleCheck2("EG")}
                  id="EG"
                />
                Eggs
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={checked2.includes("'FI'")}
                  onChange={() => handleCheck2("FI")}
                  id="FI"
                />
                Fish
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={checked2.includes("'PE'")}
                  onChange={() => handleCheck2("PE")}
                  id="PE"
                />
                Peanuts
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={checked2.includes("'SO'")}
                  onChange={() => handleCheck2("SO")}
                  id="SO"
                />
                Soya
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={checked2.includes("'MI'")}
                  onChange={() => handleCheck2("MI")}
                  id="MI"
                />
                Milk
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={checked2.includes("'TR'")}
                  onChange={() => handleCheck2("TR")}
                  id="TR"
                />
                Tree Nuts
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={checked2.includes("'CE'")}
                  onChange={() => handleCheck2("CE")}
                  id="CE"
                />
                Celery
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={checked2.includes("'MU'")}
                  onChange={() => handleCheck2("MU")}
                  id="MU"
                />
                Mustard
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={checked2.includes("'SE'")}
                  onChange={() => handleCheck2("SE")}
                  id="SE"
                />
                Sesame
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={checked2.includes("'LU'")}
                  onChange={() => handleCheck2("LU")}
                  id="LU"
                />
                Lupin
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={checked2.includes("'MO'")}
                  onChange={() => handleCheck2("MO")}
                  id="MO"
                />
                Molluscs
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={checked2.includes("'SH'")}
                  onChange={() => handleCheck2("SH")}
                  id="SH"
                />
                Shellfish
              </li>
            </ul>
          </div>
        </div>
        <br></br>
        <input
          className="calories"
          type="text"
          placeholder="Search for calories less than.."
          title="Type in a calorie value"
          onChange={(e) => {
            if (e.target.value !== "") {
              setFilter(e.target.value);
            } else {
              setFilter("100000");
            }
          }}
        />
        <div className="grid-cols-1 gap-2 grid px-1 lg:grid-cols-2">
          {items
            .filter((item) => item.calories < Number(filter))
            .map((item) => (
              <div
                className="flex bg-yellow-100 flex-col-reverse lg:flex-row m-6 p-4 min-h-[300px]"
                key={item.item_id}
                style={{
                  display:
                    activeBtn === "all" || activeBtn === item.type_id
                      ? "block"
                      : "none",
                }}
              >
                <img
                  className="lg:w-[250px] object-cover lg:h-[220px] lg:m-0 mx-10 mb-10 lg:self-center"
                  src={`https://www.themealdb.com/images/ingredients/${item.name}.png`}
                  alt={`${item.name} image`}
                  onError={(e) =>
                    (e.target.src = `https://spoonacular.com/cdn/ingredients_100x100/${item.name}.jpg`)
                  }
                />
                <div className="flex-1 flex flex-col p-4">
                  <div className="flex justify-between">
                    <div>
                      <h2 className="font-bold text-2xl">{item.name}</h2>
                      <p className="self-start text-xl">Description</p>
                    </div>
                    <div className="flex flex-col text-xl">
                      <p>£{item.price}</p>
                      <span className="self-end">{item.calories}cal</span>
                      <div key={item.item_id}>
                        <button onClick={() => handleDecrement(item.item_id)}>
                          -
                        </button>
                        <input
                          type="text"
                          value={value[item.item_id] || 0}
                          onChange={handleChange(item.item_id)}
                          placeholder="Insert the amount.."
                          title="Type in a calorie value"
                          id={item.item_id}
                          style={{
                            backgroundColor: "transparent",
                            width: "50px",
                            textAlign: "center",
                          }}
                        />
                        <button onClick={() => handleIncrement(item.item_id)}>
                          +
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          addToCart(
                            item.name,
                            item.item_id,
                            item.price,
                            value[item.item_id]
                          )
                        }
                      >
                        <i className="fa-solid fa-cart-plus py-3 fa-2x"></i>
                      </button>
                    </div>
                  </div>
                  <br></br>
                </div>
              </div>
            ))}
        </div>
        <br></br>
      </div>
    </div>
  );
}

export default Order;
