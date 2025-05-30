import React from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Navbar/Cart";
import Home from "./pages/Home";
import CustomerLogin from "./pages/Navbar/CustomerLogin";
import ProviderLogin from "./pages/Navbar/ProviderLogin";
import './index.css';
import Profile from "./pages/Navbar/Profile";
import PopularServices from "./pages/Services/PopularService";
import  Cleaning from './pages/Services/Cleaning'
import SalonSpa from "./pages/Services/SalonSpa";
import Appliance from "./pages/Services/Appliance"
import Plumbing from "./pages/Services/Plumber";
import Electrician from "./pages/Services/Electrician";
import FurnitureRepair from "./pages/Services/Furniture";
import Payment from "./pages/Payment";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login/customer" element={<CustomerLogin />} />
      <Route path="/login/provider" element={<ProviderLogin />} />
      <Route path="/cart" element={<Cart />} />  
      <Route path="/profile" element={<Profile />} />
      <Route path="/services" element={<PopularServices />} />
      <Route path="/services/cleaning" element={<Cleaning />} />
      <Route path="/services/salon-spa" element={<SalonSpa />} />
      <Route path="/services/appliance-repair" element={<Appliance />}/>
      <Route path="/services/plumbing" element={< Plumbing />} />
      <Route path="/services/electrician" element={< Electrician />} />
      <Route path="/services/furniture" element={< FurnitureRepair />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
};

export default App;
