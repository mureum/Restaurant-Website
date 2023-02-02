import logo from "../assets/Oxaca_Restaurants_Logo.png";
import { slide as Menu } from "react-burger-menu";
import React, { useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const styles = {
    bmBurgerButton: {
      position: "fixed",
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
    <header className="flex items-center">
      <img
        src={logo}
        width="300"
        height="300"
        style={{ marginLeft: "10px", marginTop: "10px" }}
      />

      <Menu isOpen={isOpen} styles={styles} right>
        <a
          id="home"
          className="text-3xl font-bold text-yellow-100 uppercase space-x-3"
          href="/"
        >
          <span>Home</span>
          <i className="fa-solid fa-angle-down"></i>
        </a>
        <a
          id="about"
          className="text-3xl font-bold text-yellow-100 uppercase"
          href="/about-us"
        >
          About
        </a>
        <a
          id="contact"
          className="text-3xl font-bold text-yellow-100 uppercase"
          href="/contact"
        >
          Contact
        </a>
        <a className="text-3xl font-bold text-yellow-100 uppercase" href="">
          Settings
        </a>
        <a
          id="contact"
          className="text-4xl font-bold text-yellow-100 uppercase bg-blue-600"
          href="/contact"
        >
          Book Now
        </a>
      </Menu>

      <ul className="p-3 2xl:flex hidden">
        <li className="p-3 px-6 mx-2 space-x-4 hover:bg-pink-500 bg-blue-500 text-yellow-500 text-2xl font-extrabold font-sans hover:text-yellow-300 uppercase">
          <span>Book Now</span>
          <i className="fa-solid fa-circle-chevron-right"></i>
        </li>
        <li className="p-3 px-6 mx-2 hover:bg-pink-500 text-red-500 text-xl font-bold font-sans hover:text-yellow-300 uppercase">
          Home
        </li>
        <li className="p-3 px-6 mx-2 space-x-2 hover:bg-pink-500 text-red-500 text-xl font-bold font-sans hover:text-yellow-300 uppercase">
          <span>Order Online</span>
          <i className="fa-solid fa-chevron-down"></i>
        </li>
        <li className="p-3 px-6 mx-2 hover:bg-pink-500 text-red-500 text-xl font-bold font-sans hover:text-yellow-300 uppercase">
          Menus
        </li>
        <li className="p-3 px-6 mx-2 space-x-2 hover:bg-pink-500 text-red-500 text-xl font-bold font-sans hover:text-yellow-300 uppercase">
          <span>Locations</span>
          <i className="fa-solid fa-chevron-down"></i>
        </li>
        <li className="p-3 px-6 mx-2 hover:bg-pink-500 text-red-500 text-xl font-bold font-sans hover:text-yellow-300 uppercase">
          Contact Us
        </li>
      </ul>
    </header>
  );
};
