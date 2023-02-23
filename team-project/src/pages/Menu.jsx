import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../App.css";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TooltipSlider from "../common/TooltipSlider.jsx";
import "rc-slider/assets/index.css";

const ALLERGENS = [
  {
    id: "GL",
    name: "Gluten",
  },
  {
    id: "CR",
    name: "Crustaceans",
  },
  {
    id: "EG",
    name: "Eggs",
  },
  {
    id: "FI",
    name: "Fish",
  },
  {
    id: "PE",
    name: "Peanuts",
  },
  {
    id: "SO",
    name: "Soya",
  },
  {
    id: "MI",
    name: "Milk",
  },
  {
    id: "TR",
    name: "Tree Nuts",
  },
  {
    id: "CE",
    name: "Celery",
  },
  {
    id: "MU",
    name: "Mustard",
  },
  {
    id: "SE",
    name: "Sesame",
  },
  {
    id: "LU",
    name: "Lupin",
  },
  {
    id: "MO",
    name: "Molluscs",
  },
  {
    id: "SH",
    name: "Shellfish",
  },
];

const DIETS = [
  { id: "VGN", name: "Vegan Items" },
  { id: "VEG", name: "Vegetarian Items" },
  { id: "GLT", name: "Gluten-Free Items" },
  { id: "LAC", name: "Lactose-Free Items" },
];

function Order({ isLoggedIn, permission }) {
  const [items, setItems] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fecthAllItems = async () => {
      try {
        const res = await axios.get("http://localhost:8800/orders");
        setItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fecthAllImages = async () => {
      try {
        const res = await axios.get("http://localhost:8800/images");
        setImages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fecthAllItems();
    fecthAllImages();
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


  const [calories_min, setCaloriesMin] = useState(0); 
  const [calories_max, setCaloriesMax] = useState(0);

  const fetchAlltems = async (id) => {
    try {
      const res = await axios.get("http://localhost:8800/orders");
      setItems(res.data);
      //window.location.reload()
    } catch (err) {
      console.log(err);
    }
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

  const setUnavailable = async (id) => {
    try {
      const res = await axios.put(
        "http://localhost:8800/orders/unavailable/" + id
      );
      console.log(res);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const setAvailable = async (id) => {
    try {
      const res = await axios.put(
        "http://localhost:8800/orders/available/" + id
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between">
        <div id="myBtnContainer" className="btn-group">
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

        <div className="flex justify-between">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn m-1">
              Filter
            </label>
            <div
              tabIndex={0}
              className="dropdown-content menu p-4 shadow bg-base-100 rounded-box w-[500px] flex flex-col"
            >
              <div className="gap-2">
                <h3 className="font-bold text-xl">Diet</h3>
                <div className="grid grid-cols-2">
                  {DIETS.map((diet, i) => (
                    <div className="form-control" key={i}>
                      <label className="label cursor-pointer justify-start gap-2">
                        <input
                          type="checkbox"
                          checked={checked.includes("'" + diet.id + "'")}
                          onChange={() => handleCheck(diet.id)}
                          id={diet.id}
                          className="checkbox checkbox-primary"
                        />
                        <span className="label-text">{diet.name}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="divider"></div>

              <div className="gap-2">
                <h3 className="font-bold text-xl">Allergens</h3>
                <div className="grid grid-cols-2">
                  {ALLERGENS.map((allergen, i) => (
                    <div className="form-control" key={i}>
                      <label className="label cursor-pointer justify-start gap-2">
                        <input
                          type="checkbox"
                          checked={checked2.includes("'" + allergen.id + "'")}
                          onChange={() => handleCheck2(allergen.id)}
                          id={allergen.id}
                          className="checkbox checkbox-primary"
                        />
                        <span className="label-text">{allergen.name}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="divider"></div>

              <div className="gap-2">
                <h3 className="font-bold text-xl">Calories</h3>
                <div className="my-4">
                  <TooltipSlider
                    min={0}
                    max={1150}
                    range={true}
                    tipFormatter={(value) => `${value}`}
                    onChange = {(value) => { setCaloriesMax(value[1]); 
                                            setCaloriesMin(value[0])
                    }}
                    
                  />
                  <div>
                    <div>0</div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
      <br></br>
      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search for calories less than.."
            title="Type in a calorie value"
            className="input input-bordered w-96"
            onChange={(e) => {
              if (e.target.value !== "") {
                setFilter(e.target.value);
              } else {
                setFilter("100000");
              }
            }}
          />
          <button className="btn btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid-cols-1 gap-2 grid px-1 lg:grid-cols-2">
        {(items && permission === "Waiter") || permission === "Kitchen"
          ? items
              .filter((item) => item.calories >= Number(calories_min))
              .filter((item) => item.calories <= Number(calories_max))
              .sort((a, b) => a.item_id.localeCompare(b.item_id))
              .map((item) =>
                item.is_available === true ? (
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
                    <div className="flex-1 flex flex-col p-4">
                      <div className="flex justify-between">
                        <div>
                          <h2 className="font-bold text-2xl">{item.name}</h2>
                          <p className="self-start text-xl">Description</p>
                        </div>
                        <div className="flex flex-col text-xl">
                          <p>£{item.price}</p>
                          <span className="self-end">{item.calories}cal</span>
                          <button
                            className="text-2xl font-bold uppercase space-x-2"
                            style={{ backgroundColor: "pink" }}
                            onClick={() => setUnavailable(item.item_id)}
                          >
                            SET UNAVAILABLE
                          </button>
                        </div>
                      </div>
                      <br></br>
                    </div>
                  </div>
                ) : (
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
                    <div className="flex-1 flex flex-col p-4">
                      <div className="flex justify-between">
                        <div>
                          <h2 className="font-bold text-2xl">{item.name}</h2>
                          <p className="self-start text-xl">Description</p>
                        </div>
                        <div className="flex flex-col text-xl">
                          <p>£{item.price}</p>
                          <span className="self-end">{item.calories}cal</span>
                          <button
                            className="text-2xl font-bold uppercase space-x-2"
                            style={{ backgroundColor: "pink" }}
                            onClick={() => setAvailable(item.item_id)}
                          >
                            SET AVAILABLE
                          </button>
                        </div>
                      </div>
                      <br></br>
                    </div>
                  </div>
                )
              )
          : items
              .filter((item) => item.calories >= Number(calories_min))
              .filter((item) => item.calories <= Number(calories_max))
              .sort((a, b) => a.item_id.localeCompare(b.item_id))
              .map((item) =>
                item.is_available === true ? (
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
                            <button
                              onClick={() => handleDecrement(item.item_id)}
                            >
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
                            <button
                              onClick={() => handleIncrement(item.item_id)}
                            >
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
                      <br />
                    </div>
                  </div>
                ) : (
                  <></>
                )
              )}
      </div>
    </div>
  );
}

export default Order;
