import "./App.css";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Order from "./pages/Menu";
import Cart from "./pages/Cart";
import Login from "./pages/Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/menu" element={<Order />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
