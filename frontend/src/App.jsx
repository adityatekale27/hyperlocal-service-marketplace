import React from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Navbar/Cart";
import Home from "./pages/Home";
import CustomerLogin from "./pages/Navbar/CustomerLogin";
import ProviderLogin from "./pages/Navbar/ProviderLogin";
import './index.css';
import Profile from "./pages/Navbar/Profile";
import PopularServices from "./pages/Services/PopularService";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login/customer" element={<CustomerLogin />} />
      <Route path="/login/provider" element={<ProviderLogin />} />
      <Route path="/cart" element={<Cart />} />  
      <Route path="/profile" element={<Profile />} />
      <Route path="/services" element={<PopularServices />} />
    </Routes>
  );
};

export default App;
