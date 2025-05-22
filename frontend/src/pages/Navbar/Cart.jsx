import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";
import './Cart.css'

const Cart = () => {
  const { cartItems, increaseQty, decreaseQty, removeItem } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (!cartItems.length) {
    return (
      <div className="cart empty-cart">
        <h2>Your Cart is Empty</h2>
        <Link to="/">Back</Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2 className="cart-title">Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.map(({ id, name, description, quantity, price }) => (
          <div key={id} className="cart-item">
            <div className="item-details">
              <h3 className="item-name">{name}</h3>
              <p className="item-description">{description}</p>
            </div>
            <div className="item-quantity">
              <button
                className="qty-btn"
                onClick={() => decreaseQty(id)}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="qty-number">{quantity}</span>
              <button
                className="qty-btn"
                onClick={() => increaseQty(id)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <div className="item-price">${price * quantity}</div>
            <button
              className="remove-item-btn"
              onClick={() => removeItem(id)}
              aria-label="Remove item"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <span className="total-label">Total:</span>
        <span className="total-amount">${totalPrice}</span>
      </div>

      <button className="checkout-btn" onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
