
import React, { useState } from 'react';
import { FaCut, FaSpa, FaAirFreshener, FaStar } from 'react-icons/fa';
import { GiHairStrands } from 'react-icons/gi';

const services = [
  {
    id: 1,
    name: "Haircut & Styling",
    icon: <FaCut />,
    description: "Trendy haircut and styling by professionals at your doorstep.",
    price: "₹499",
    duration: "45 mins",
  },
  {
    id: 2,
    name: "Facial & Cleanup",
    icon: <FaSpa />,
    description: "Rejuvenating facials and cleanups with herbal and natural products.",
    price: "₹799",
    duration: "1-1.5 hours",
  },
  {
    id: 3,
    name: "Body Spa & Massage",
    icon: <FaStar />,
    description: "Relaxing body massage using aroma oils and expert techniques.",
    price: "₹1199",
    duration: "1.5-2 hours",
  },
  {
    id: 4,
    name: "Hair Color",
    icon: <GiHairStrands />,
    description: "Ammonia-free professional hair coloring and root touch-up.",
    price: "₹999",
    duration: "1 hour",
  },
  {
    id: 5,
    name: "Pedicure & Manicure",
    icon: <FaAirFreshener />,
    description: "Revive your hands and feet with luxury pedicure & manicure service.",
    price: "₹699",
    duration: "1-1.5 hours",
  },
];

const SalonSpa = () => {
  const [selected, setSelected] = useState(services[0]);

  const handleBook = (serviceName) => {
    alert(`Redirecting to payment page for ${serviceName}`);
    window.location.href = "/payment";
  };

  return (
    <div className="service-page">
      <div className="service-sidebar">
        <h3>Selected Service</h3>
        <div className="selected-details">
          <div className="icon-large">{selected.icon}</div>
          <h4>{selected.name}</h4>
          <p>{selected.description}</p>
          <p><strong>Price:</strong> {selected.price}</p>
          <p><strong>Duration:</strong> {selected.duration}</p>
        </div>
      </div>
      <div className="service-grid">
        {services.map((service) => (
          <div className="service-card" key={service.id}>
            <div className="icon">{service.icon}</div>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <div className="service-bottom">
              <span className="price">{service.price}</span>
              <button onClick={() => setSelected(service)}>Select</button>
              <button className="book-btn" onClick={() => handleBook(service.name)}>Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalonSpa;
