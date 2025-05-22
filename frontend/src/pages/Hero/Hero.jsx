import React from "react";
import { Link } from "react-router-dom";
// Import icons from react-icons (using some fitting ones)
import { GiBroom, GiHairStrands, GiToolbox, GiElectric, GiWaterDrop, GiSnowflake1 } from "react-icons/gi";


import "./Hero.css";

const domains = [
  { name: "Cleaning", link: "/services/cleaning", icon: <GiBroom /> },
  { name: "Salon & Spa", link: "/services/salon-spa", icon: <GiHairStrands /> },
  { name: "Appliance Repair", link: "/services/appliance-repair", icon: <GiToolbox /> },
  { name: "Electrician", link: "/services/electrician", icon: <GiElectric /> },
  { name: "Plumbing", link: "/services/plumbing", icon: <GiWaterDrop /> },
  { name: "AC Repair", link: "/services/ac-repair", icon: <GiSnowflake1 /> },
];

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-left">
        <div className="hero-content">
          <h1>Get Expert Services at Your Doorstep</h1>
          <p>Trusted professionals. Quick booking. Affordable prices.</p>
          <Link to="/services" className="hero-btn">
            Explore Services
          </Link>
          <div className="hero-image">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCUGzhIGxVL6LeWV34KzmNP3jyLj0iykO7PA&s" alt="Service Illustration" />
          </div>
        </div>
      </div>

      <div className="hero-right">
        <h2>Choose Your Domain</h2>
        <div className="domain-grid">
          {domains.map((domain) => (
            <div key={domain.name} className="domain-card">
              <div className="domain-icon">{domain.icon}</div>
              <h3>{domain.name}</h3>
              <Link to={domain.link} className="domain-btn">
                Explore
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
