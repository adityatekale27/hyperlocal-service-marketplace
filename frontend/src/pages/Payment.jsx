import React, { useEffect, useState } from "react";
import "./Payment.css";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const service = location.state?.service;

  useEffect(() => {
    if (!service) {
      navigate("/"); // Redirect to home if no service info
    }
  }, [service, navigate]);

  const handleConfirm = () => {
    alert(`Payment of ${service.price} via ${paymentMethod} successful!`);
    // Add your payment integration here
    navigate("/thankyou"); // Redirect after payment
  };

  if (!service) return null;

  return (
    <div className="payment-container">
      <h2>Confirm Your Booking</h2>
      <div className="payment-box">
        <h3>{service.name}</h3>
        <p>{service.description}</p>
        <p><strong>Price:</strong> {service.price}</p>
        <div className="payment-method">
          <label>Select Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="UPI">UPI</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Net Banking">Net Banking</option>
            <option value="Cash on Service">Cash on Service</option>
          </select>
        </div>
        <button className="confirm-btn" onClick={handleConfirm}>
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
