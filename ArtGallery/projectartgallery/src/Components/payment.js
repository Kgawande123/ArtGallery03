import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom"; 
import "./payment.css";

// Load Stripe with your publishable key
const stripePromise = loadStripe("pk_test_51Q67SgKwHBaWFQM7Bn0GzMHYkljdHa55ERW0ZC2vtt6szKJlNcss3C81DHRyPn2J8RZNm8WDY1pGkdUaAFbQYagx00SGWjt3Ho");

const CheckoutForm = ({ cart, grandTotal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe.js has not loaded yet.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      setLoading(true);

    
      const response = await fetch("http://127.0.0.1:8000/api/payment/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: grandTotal, currency: "usd" }), 
      });

      const { clientSecret } = await response.json();

      // Confirm payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (stripeError) {
        setError(stripeError.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setSuccess(true);
        alert("Payment successful!");
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  
  if (!cart || !grandTotal) {
    return <p>Error: Grand Total or Cart not available.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h2>Complete Your Payment</h2>

      {/* Display Grand Total */}
      <p><strong>Grand Total: ₹{grandTotal.toFixed(2)}</strong></p>

      {/* Payment Details Section */}
      <div className="form-group">
        <label htmlFor="card-element">Card Details</label>
        <CardElement
          id="card-element"
          className="card-element"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                fontFamily: "Arial, sans-serif",
                "::placeholder": {
                  color: "#000",
                },
              },
              invalid: {
                color: "#fa755a",
              },
            },
          }}
        />
      </div>

      {/* Error or Success Messages */}
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Payment was successful!</p>}

      {/* Submit Button */}
      <div className="form-actions">
        <button type="submit" disabled={!stripe || loading} className="payment-button">
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </form>
  );
};

const PaymentPage = () => {
  const location = useLocation();
  const { cart, grandTotal } = location.state || {}; 

  return (
    <Elements stripe={stripePromise}>
      <div className="payment-container">
      
        <div className="payment-body">
          <CheckoutForm cart={cart} grandTotal={grandTotal} />
        </div>
      </div>
    </Elements>
  );
};

export default PaymentPage;
