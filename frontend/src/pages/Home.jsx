import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';
import Navbar from "./Navbar/Navbar";
import HeroSection from "./Hero/Hero";
import PopularServices from "./Services/PopularService";

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Simple check for token presence
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="home-container">
      <Navbar />
      <div className="main-section">
        <HeroSection />
      </div>
      <PopularServices />
      
      <footer className="footer">
        {!isLoggedIn ? (
          <p>
            Please <button onClick={() => navigate("/login")}>Login</button> to access your account.
          </p>
        ) : (
          <p>
            Welcome back! <button onClick={() => {
              localStorage.removeItem("token");
              setIsLoggedIn(false);
            }}>Logout</button>
          </p>
        )}
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
