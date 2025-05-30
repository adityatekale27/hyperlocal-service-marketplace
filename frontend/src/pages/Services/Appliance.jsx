import React, { useState } from 'react';
import './Cleaning.css';
import { FaTv, FaSnowflake, FaTshirt, FaFire } from 'react-icons/fa';

const applianceServices = [
  {
    id: 1,
    name: "TV Installation & Repair",
    icon: <FaTv />,
    description: "LED/LCD TV mounting, setup, and basic repair services.",
    price: "₹499",
    duration: "1 hour",
  },
  {
    id: 2,
    name: "AC Service & Repair",
    icon: <FaSnowflake />,
    description: "Cooling issue check, gas refill, and full AC servicing.",
    price: "₹899",
    duration: "1-2 hours",
  },
  {
    id: 3,
    name: "Washing Machine Repair",
    icon: <FaTshirt />,
    description: "Motor issues, water leakage, and drum malfunction fixes.",
    price: "₹699",
    duration: "1.5 hours",
  },
  {
    id: 4,
    name: "Microwave & Stove Repair",
    icon: <FaFire />,
    description: "Heating issues, buttons malfunction, or minor part replacement.",
    price: "₹599",
    duration: "1 hour",
  },
];

const ApplianceRepair = () => {
  const [selectedService, setSelectedService] = useState(applianceServices[0]);

  const handleSelect = (service) => {
    setSelectedService(service);
  };

  const handleBook = (serviceName) => {
    alert(`Redirecting to payment page for ${serviceName}`);
    window.location.href = "/payment";
  };

  return (
    <div className="cleaning-main">
      <h2 className="cleaning-title">Appliance Repair Services</h2>
      <div className="cleaning-flex-layout">
        {/* Left: Selected Service Box */}
        <div className="selected-service-box">
          <h3>Selected Service</h3>
          <div className="selected-icon">{selectedService.icon}</div>
          <p><strong>{selectedService.name}</strong></p>
          <p>{selectedService.description}</p>
          <p><strong>Price:</strong> {selectedService.price}</p>
          <p><strong>Duration:</strong> {selectedService.duration}</p>
        </div>

        {/* Right: Services Grid */}
        <div className="cleaning-grid">
          {applianceServices.map((service) => (
            <div className="cleaning-card" key={service.id}>
              <div className="icon">{service.icon}</div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <div className="service-bottom">
                <span className="price">{service.price}</span>
                <div>
                  <button className="select-btn" onClick={() => handleSelect(service)}>Select</button>
                  <button className="book-btn" onClick={() => handleBook(service.name)}>Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplianceRepair;
