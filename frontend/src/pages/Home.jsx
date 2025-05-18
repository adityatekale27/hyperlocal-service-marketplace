import React from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="main-section">
        <h1 className="title">Welcome to UrbanClone</h1>
        <button
          className="login-btn"
          onClick={() => navigate("/login/customer")}
        >
          Login / Sign Up
        </button>
      </div>

      <footer className="footer">
        <p>
          Want to provide services?{" "}
          <button
            className="partner-btn"
            onClick={() => navigate("/login/provider")}
          >
            Become a Partner
          </button>
        </p>
      </footer>
    </div>
  );
};

export default Home;
