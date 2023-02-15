import "./App.css";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Order from "./pages/Menu";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import React from "react";
import { Navbar } from "./common/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(() => {
    // Use the stored value of isLoggedIn, or false if it hasn't been set
    return JSON.parse(localStorage.getItem('isLoggedIn')) || false;
  });

  // Store the isLoggedIn state in localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);
  return (
    <BrowserRouter>
      <div className="App">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn}/>} />
          <Route path="/about-us" element={<AboutUs isLoggedIn={isLoggedIn}/>} />
          <Route path="/menu" element={<Order isLoggedIn={isLoggedIn}/>} />
          <Route path="/cart" element={<Cart isLoggedIn={isLoggedIn}/>} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
