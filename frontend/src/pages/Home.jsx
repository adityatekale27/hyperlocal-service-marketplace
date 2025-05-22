import React from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';
import Navbar from "./Navbar/Navbar";
import HeroSection from "./Hero/Hero";
import PopularServices from "./Services/PopularService";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Navbar />
      <div className="main-section">
        <HeroSection />
      </div>
      <PopularServices />
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
