import React, { useState } from 'react';
import { FaPlug, FaLightbulb, FaFan, FaBolt } from 'react-icons/fa';
import './Cleaning.css'

const electricianServices = [
  {
    id: 1,
    name: "Fan Installation",
    icon: <FaFan />,
    description: "Ceiling or wall fan fitting and electrical wiring setup.",
    price: "₹299",
    duration: "30-60 mins",
  },
  {
    id: 2,
    name: "Light Fitting",
    icon: <FaLightbulb />,
    description: "Tube lights, bulbs, chandeliers, and wall light installations.",
    price: "₹199",
    duration: "30-45 mins",
  },
  {
    id: 3,
    name: "Socket & Switch Repair",
    icon: <FaPlug />,
    description: "Fixing or replacing faulty sockets and switches.",
    price: "₹249",
    duration: "30 mins",
  },
  {
    id: 4,
    name: "Power Backup Setup",
    icon: <FaBolt />,
    description: "Inverter connection, testing, and power backup management.",
    price: "₹799",
    duration: "1-2 hours",
  },
];

const Electrician = () => {
  const [selectedService, setSelectedService] = useState(electricianServices[0]);

  const handleSelect = (service) => {
    setSelectedService(service);
  };

  const handleBook = (serviceName) => {
    alert(`Redirecting to payment page for ${serviceName}`);
    window.location.href = "/payment";
  };

  return (
    <div className="cleaning-container">
      <h2 className="cleaning-title">Electrician Services</h2>
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
          {electricianServices.map((service) => (
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

export default Electrician;
