import React from "react";
import { Link } from "react-router-dom";
import { FiUser, FiShoppingCart, FiSearch } from "react-icons/fi";
import './Navbar.css'
import Cart from "./Cart";
import Profile from "./Profile";


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          QuickServe
        </Link>
      </div>

      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search for services..."
          className="search-input"
        />
        <FiSearch className="search-icon" />
      </div>


      {/* Right - Icons and Login */}
      <div className="navbar-right">
        <Link to="/cart" className="navbar-icon">
          <FiShoppingCart />
        </Link>
        <Link to="/profile" className="navbar-icon">
          <FiUser />
        </Link>
        <Link to="/login/customer" className="navbar-login-btn">
          Login / Signup
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
