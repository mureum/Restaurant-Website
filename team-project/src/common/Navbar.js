import logo from "../assets/Oxaca_Restaurants_Logo.png";
import { slide as Menu } from "react-burger-menu";
import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { isElementOfType } from "react-dom/test-utils";
export const Navbar = ({ isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const Login = () => {
    navigate("/Login");
  }

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
          className="text-2xl font-bold text-yellow-100 uppercase space-x-2"
          href="/"
        >
          <span>Home</span>
        </a>
        <a
          id="about"
          className="text-2xl font-bold text-yellow-100 uppercase space-x-2"
          href="/about-us"
        >
          <span>Order Online</span>
          <i className="fa-solid fa-caret-down"></i>
        </a>
        <a
          id="menu"
          className="text-2xl font-bold text-yellow-100 uppercase"
          href="/menu"
        >
          Menus
        </a>
        <a
          className="text-2xl font-bold text-yellow-100 uppercase space-x-2"
          href=""
        >
          <span>Locations</span>
          <i className="fa-solid fa-caret-down"></i>
        </a>
        <a className="text-2xl font-bold text-yellow-100 uppercase" href="">
          Contact Us
        </a>
        <a
          id="contact"
          className="text-4xl font-bold text-yellow-100 uppercase bg-blue-600 space-x-3"
          href="/contact"
        >
          <span>Book Now</span>
          <i className="fa-solid fa-angles-right"></i>
        </a>
      </Menu>

      <ul className="p-3 2xl:flex hidden">
        <li className="p-3 px-6 mx-2 space-x-4 hover:bg-pink-500 bg-blue-500 text-yellow-500 text-3xl font-extrabold font-sans hover:text-yellow-300 uppercase">
          <span>Book Now</span>
          <i className="fa-solid fa-circle-chevron-right"></i>
        </li>
        <li className="p-3 px-6 mx-2 hover:bg-pink-500 text-red-500 text-2xl font-bold font-sans hover:text-yellow-300 uppercase">
          <a href="/">Home</a>
        </li>
        <li className="p-3 px-6 mx-2 space-x-2 hover:bg-pink-500 text-red-500 text-2xl font-bold font-sans hover:text-yellow-300 uppercase">
          <a href="/menu"><span>Order Online</span></a>
          <i className="fa-solid fa-chevron-down"></i>
        </li>
        <li
          className="p-3 px-6 mx-2 hover:bg-pink-500 text-red-500 text-2xl font-bold font-sans hover:text-yellow-300 uppercase"
          href="/menu"
        >
          <a href="/menu">Menus</a>
        </li>
        <li className="p-3 px-6 mx-2 space-x-2 hover:bg-pink-500 text-red-500 text-2xl font-bold font-sans hover:text-yellow-300 uppercase">
          <span>Locations</span>
          <i className="fa-solid fa-chevron-down"></i>
        </li>
        <li className="p-3 px-6 mx-2 hover:bg-pink-500 text-red-500 text-2xl font-bold font-sans hover:text-yellow-300 uppercase">
          <a href="/about-us">Contact Us</a>
        </li>
      </ul>
      {isLoggedIn ? (
        <></>
      ) : (
        <button className="p-2 rounded-full border-2 border-black shadow-md bg-blue-500 text-white font-bold absolute top-5 right-5" onClick = {Login}>
          Staff LogIn
        </button>
      )
      }
    </header>
  );
};
