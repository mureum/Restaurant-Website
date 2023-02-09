import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Home from "./pages/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Menu" element={<Menu />} />
          <Route path="Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
