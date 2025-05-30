import React, { useState } from 'react';
import './Cleaning.css';
import { FaToilet, FaRug, FaBroom, FaBuilding } from 'react-icons/fa6';
import { FaHome } from 'react-icons/fa';
import { GiSofa } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';


const cleaningServices = [
  {
    id: 1,
    name: "Home Cleaning",
    icon: <FaHome />,
    description: "Complete house cleaning including rooms, kitchen, and balconies.",
    price: "₹999",
    duration: "1-2 hours",

  },
  {
    id: 2,
    name: "Bathroom Cleaning",
    icon: <FaToilet />,
    description: "Deep cleaning of toilets, tiles, mirrors, and sinks using disinfectants.",
    price: "₹499",
    duration: "2-3 hours",
  },
  {
    id: 3,
    name: "Sofa Cleaning",
    icon: <GiSofa />,
    description: "Vacuuming, stain removal, and freshening up your sofa sets.",
    price: "₹799",
    duration: "1 hour",
  },
  {
    id: 4,
    name: "Carpet Cleaning",
    icon: <FaRug />,
    description: "Thorough carpet cleaning with high-grade equipment and eco-friendly solutions.",
    price: "₹599",
    duration: "1 hour",
  },
  {
    id: 5,
    name: "Kitchen Deep Clean",
    icon: <FaBroom />,
    description: "Degreasing and sanitization of kitchen counters, cabinets, and appliances.",
    price: "₹699",
    duration: "1-2 hours",
  },
  {
    id: 6,
    name: "Office Cleaning",
    icon: <FaBuilding />,
    price: "₹1499",
    duration: "2-4 hours",
    description: "Professional cleaning for small to medium-sized office spaces.",
  },
];

const Cleaning = () => {
  const [selectedService, setSelectedService] = useState(null);
  const navigate= useNavigate();

  const handleBook = (service) => {
  navigate("/payment", { state: { service } });
};

  return (
    <div className="cleaning-layout">
      <div className="cleaning-sidebar">
        <h3>Selected Service</h3>
        {selectedService ? (
          <div className="selected-service-box">
            <div className="icon">{selectedService.icon}</div>
            <h4>{selectedService.name}</h4>
            <p>{selectedService.description}</p>
            <p><strong>Price:</strong> {selectedService.price}</p>
            <p><strong>Duration:</strong> {selectedService.duration}</p>
          </div>
        ) : (
          <p>No service selected.</p>
        )}
      </div>

      <div className="cleaning-main">
        <h2 className="cleaning-title">Cleaning Services</h2>
        <div className="cleaning-grid">
          {cleaningServices.map((service) => (
            <div className="cleaning-card" key={service.id}>
              <div className="icon">{service.icon}</div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <p><strong>Price:</strong> {service.price}</p>
              <p><strong>Duration:</strong> {service.duration}</p>
              <div className="service-buttons">
                <button className="select-btn" onClick={() => setSelectedService(service)}>Select</button>
                <button className="book-btn" onClick={() => handleBook(service)}>Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cleaning;
