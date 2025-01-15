import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./checkout.css";

const Checkout = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  // Calculate the total price of products
  const totalPrice = cart.reduce((acc, item) => {
    const price = parseFloat(item.price);
    return !isNaN(price) ? acc + price : acc;
  }, 0);

  // Shipping and tax
  const shippingCharge = 50.0;
  const tax = totalPrice * 0.15;
  const grandTotal = totalPrice + shippingCharge + tax;

  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty. Add items to proceed.");
      return;
    }

    if (!billingDetails.name || !billingDetails.email || !billingDetails.address || !billingDetails.city || !billingDetails.state || !billingDetails.zip) {
      alert("Please fill in all the billing details.");
      return;
    }

    // Save billing details and pass to payment
    fetch("http://127.0.0.1:8000/api/billingdata/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(billingDetails),
    })
      .then(() => {
        // Navigate to the payment page with grandTotal in the state
        navigate("/payment", { state: { cart, grandTotal } });
      })
      .catch((error) => {
        console.error("Error submitting billing details:", error);
        alert("Failed to place order. Please try again.");
      });
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="checkout-content">
        <div className="billing-details">
          <h2>Billing Details</h2>
          <form onSubmit={handleSubmit}>
            {["name", "email", "address", "city", "state", "zip"].map((field) => (
              <div className="form-group" key={field}>
                <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type={field === "email" ? "email" : "text"}
                  id={field}
                  name={field}
                  value={billingDetails[field]}
                  onChange={(e) => setBillingDetails((prevDetails) => ({ ...prevDetails, [field]: e.target.value }))}
                  required
                />
              </div>
            ))}
            <button type="submit" className="submit-button">Place Order</button>
          </form>
        </div>
        <div className="cart-summary">
          <h2>Your Order</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              <div className="cart-items">
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-img" />
                    <div className="cart-item-details">
                      <p>{item.name}</p>
                      <p>₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <table className="summary-table">
                <tbody>
                  <tr>
                    <td>Total Products</td>
                    <td>₹{totalPrice.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Shipping Charge</td>
                    <td>₹{shippingCharge.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Tax (15%)</td>
                    <td>₹{tax.toFixed(2)}</td>
                  </tr>
                  <tr className="total-row">
                    <td><strong>Grand Total</strong></td>
                    <td><strong>₹{grandTotal.toFixed(2)}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
