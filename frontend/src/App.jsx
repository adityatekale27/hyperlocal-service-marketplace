import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CustomerLogin from "./pages/CustomerLogin";
import ProviderLogin from "./pages/ProviderLogin";
import './index.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login/customer" element={<CustomerLogin />} />
      <Route path="/login/provider" element={<ProviderLogin />} />
    </Routes>
  );
};

export default App;
