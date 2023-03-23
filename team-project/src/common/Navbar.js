import logo from "../assets/Oxaca_Restaurants_Logo.png";
import { slide as Menu } from "react-burger-menu";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export const Navbar = ({
  isLoggedIn,
  setIsLoggedIn,
  permission,
  setPermission,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const Login = () => {
    navigate("/Login");
  };
  const LogOut = () => {
    setIsLoggedIn(false);
    setPermission("");
    window.location.href = "/";
  };

  const styles = {
    bmBurgerButton: {
      position: "absolute",
      width: "36px",
      height: "30px",
      right: "36px",
      top: "100px",
    },
    bmBurgerBars: {
      background: "#373a47",
    },
    bmBurgerBarsHover: {
      background: "#a90000",
    },
    bmCrossButton: {
      height: "24px",
      width: "24px",
    },
    bmCross: {
      background: "#bdc3c7",
    },
    bmMenuWrap: {
      position: "fixed",
      left: 0,
      right: 0,
      width: "100%",
      height: "auto",
      marginTop: "100px",
    },
    bmMenu: {
      background: "#e60065",
      fontSize: "1.15em",
    },
    bmMorphShape: {
      fill: "#373a47",
    },
    bmItemList: {
      color: "#b8b7ad",
      display: "flex",
      flexDirection: "column",
    },
    bmItem: {
      display: "inline-block",
      borderBottom: "solid",
      borderWidth: "2px",
      padding: "20px 0",
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.3)",
      left: 0,
      right: 0,
      marginTop: "100px",
    },
  };

  useEffect(() => {
    const deleteAllItems = async () => {
      try {
        const currentTime = new Date();
        const endOfDay = new Date(
          currentTime.getFullYear(),
          currentTime.getMonth(),
          currentTime.getDate() + 1,
          0,
          0,
          0
        );
        const timeUntilEndOfDay = endOfDay - currentTime;

        setTimeout(async () => {
          const res = await axios.delete("http://localhost:8800/delivered");
          const res2 = await axios.delete("http://localhost:8800/totalorders");
        }, timeUntilEndOfDay);
      } catch (err) {
        console.log(err);
      }
    };

    deleteAllItems();
  }, []);

  return (
    <header className="flex items-center text-center">
      <img
        src={logo}
        width="300"
        height="300"
        style={{ marginLeft: "10px", marginTop: "10px" }}
      />

      <Menu isOpen={isOpen} styles={styles} right>
        <a
          id="home"
          className="text-4xl font-bold text-yellow-100 uppercase"
          href="/"
        >
          Home
        </a>
        <a
          id="menu"
          className="text-4xl font-bold text-yellow-100 uppercase"
          href="/menu"
        >
          Order Online
        </a>
        <a
          id="TableInput"
          className="text-4xl font-bold text-yellow-100 uppercase"
          href="/TableInput"
        >
          Track Order
        </a>

        <a
          className="text-4xl font-bold text-yellow-100 uppercase"
          href="about-us"
        >
          Contact Us
        </a>
        <a
          id="contact"
          className="text-4xl font-bold text-yellow-100 uppercase bg-blue-600 space-x-3"
          href="/contact"
        ></a>
      </Menu>

      <ul className="p-3 2xl:flex space-x-40 hidden">
        <li className="p-3 px-6 mx-2 hover:bg-pink-500 bg-blue-500 text-yellow-500 text-6xl font-extrabold font-sans hover:text-yellow-300 uppercase">
          <a href="/menu">
            <span>Order Online </span>
          </a>
          <i className="fa-solid fa-circle-chevron-right"></i>
        </li>
        <li className="p-3 px-6 mx-2 hover:bg-pink-500 text-red-500 text-5xl font-extrabold font-sans hover:text-yellow-300 uppercase">
          <a href="/">Home</a>
        </li>

        <li className="p-3 px-6 mx-2 hover:bg-pink-500 text-red-500 text-5xl font-extrabold font-sans hover:text-yellow-300 uppercase">
          <a href="/TableInput">Track Order</a>
        </li>

        <li className="p-3 px-6 mx-2 hover:bg-pink-500 text-red-500 text-5xl font-extrabold font-sans hover:text-yellow-300 uppercase">
          <a href="/about-us">Contact Us</a>
        </li>
      </ul>
      {isLoggedIn ? (
        permission === "Waiter" ? (
          <Menu isOpen={isOpen} styles={styles} right>
            <li>
              <a
                className="text-2xl font-bold text-yellow-100 uppercase space-x-2"
                href="/menu"
              >
                Edit Menu
              </a>
            </li>
            <li>
              <a
                className="text-2xl font-bold text-yellow-100 uppercase space-x-2"
                href="/table-assignment"
              >
                Table Assignment
              </a>
            </li>
            <li>
              <a
                className="text-2xl font-bold text-yellow-100 uppercase space-x-2"
                href="/order-dashboard"
              >
                Order Dashboard
              </a>
            </li>
            <li>
              <button
                className="text-2xl font-bold text-yellow-100 uppercase space-x-2"
                onClick={LogOut}
              >
                Logout
              </button>
            </li>
          </Menu>
        ) : // <button className="p-2 rounded-full border-2 border-black shadow-md bg-blue-500 text-white font-bold absolute top-5 right-5" onClick = {LogOut}>
        //   Staff LogOut
        // </button>
        permission === "Kitchen" ? (
          <Menu isOpen={isOpen} styles={styles} right>
            <li>
              <a
                className="text-2xl font-bold text-yellow-100 uppercase space-x-2"
                href="/menu"
              >
                Edit Menu
              </a>
            </li>
            <li>
              <a
                className="text-2xl font-bold text-yellow-100 uppercase space-x-2"
                href="/kitchen-dashboard"
              >
                Kitchen Dashboard
              </a>
            </li>
            <li>
              <button
                className="text-2xl font-bold text-yellow-100 uppercase space-x-2"
                onClick={LogOut}
              >
                Logout
              </button>
            </li>
          </Menu>
        ) : permission === "Admin" ? (
          <Menu isOpen={isOpen} styles={styles} right>
            <li>
              <a
                className="text-2xl font-bold text-yellow-100 uppercase space-x-2"
                href="/menu"
              >
                Edit Menu
              </a>
            </li>
            <li>
              <a
                className="text-2xl font-bold text-yellow-100 uppercase space-x-2"
                href="/admin-dashboard"
              >
                Admin Dashboard
              </a>
            </li>
            <li>
              <a
                className="text-2xl font-bold text-yellow-100 uppercase space-x-2"
                href="/statistics"
              >
                statistics
              </a>
            </li>
            <li>
              <a
                className="text-2xl font-bold text-yellow-100 uppercase space-x-2"
                href="/table-assignment"
              >
                Table Assignment
              </a>
            </li>
            <li>
              <a
                className="text-2xl font-bold text-yellow-100 uppercase space-x-2"
                href="/order-dashboard"
              >
                Order Dashboard
              </a>
            </li>
            <li>
              <a
                className="text-2xl font-bold text-yellow-100 uppercase space-x-2"
                href="/kitchen-dashboard"
              >
                Kitchen Dashboard
              </a>
            </li>
            <li>
              <button
                className="text-2xl font-bold text-yellow-100 uppercase space-x-2"
                onClick={LogOut}
              >
                Logout
              </button>
            </li>
          </Menu>
        ) : (
          <></>
        )
      ) : (
        <button
          className="p-2 rounded-full border-2 border-black shadow-md bg-blue-500 text-white text-2xl font-bold absolute top-5 right-5"
          onClick={Login}
        >
          Staff LogIn
        </button>
      )}
    </header>
  );
};
