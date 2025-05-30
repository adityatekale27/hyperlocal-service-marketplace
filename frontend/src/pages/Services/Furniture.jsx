import React, { useState } from 'react';
import { GiWoodPile, GiTable, GiDoor, GiSofa } from 'react-icons/gi';

const furnitureServices = [
  {
    id: 1,
    name: "Chair Repair",
    icon: <GiWoodPile />,
    description: "Fixing broken legs, joints, or seat replacements for all types of chairs.",
    price: "₹299",
    duration: "45 mins - 1 hour",
  },
  {
    id: 2,
    name: "Table Fix & Polish",
    icon: <GiTable />,
    description: "Table surface refinishing, wobbly leg fixing, and polishing.",
    price: "₹499",
    duration: "1-2 hours",
  },
  {
    id: 3,
    name: "Door & Handle Repair",
    icon: <GiDoor />,
    description: "Stuck doors, loose handles, and alignment issues.",
    price: "₹399",
    duration: "1 hour",
  },
  {
    id: 4,
    name: "Sofa Frame Fixing",
    icon: <GiSofa />,
    description: "Repairing wooden/metal frames and tightening structural joints.",
    price: "₹699",
    duration: "1.5 hours",
  },
];

const FurnitureRepair = () => {
  const [selectedService, setSelectedService] = useState(furnitureServices[0]);

  const handleSelect = (service) => {
    setSelectedService(service);
  };

  const handleBook = (serviceName) => {
    alert(`Redirecting to payment page for ${serviceName}`);
    window.location.href = "/payment";
  };

  return (
    <div className="cleaning-container">
      <h2 className="cleaning-title">Furniture Repair & Installation</h2>
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
          {furnitureServices.map((service) => (
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

export default FurnitureRepair;
