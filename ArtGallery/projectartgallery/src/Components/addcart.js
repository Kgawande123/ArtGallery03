import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./addcart.css"; 

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();

 
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart)); 
    } else {
      
    }
  }, [setCart]);

  
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart)); 
    }
  }, [cart]);

  // Safely calculate total prices
  const totalPrice = cart.reduce((acc, item) => acc + Number(item.price || 0), 0);
  const shippingCharge = 50.0;
  const tax = totalPrice * 0.15;
  const grandTotal = totalPrice + shippingCharge + tax;

  // Handle item removal from cart
  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage

    // Optionally, remove item from the API as well
    fetch(`http://127.0.0.1:8000/api/cart/${cart[index].id}`, {
      method: "DELETE",
    }).catch((error) => console.error("Error removing item from cart:", error));
  };

  // Handle clearing cart
  const handleClearCart = () => {
    const confirmation = window.confirm("Are you sure you want to clear your cart?");
    if (confirmation) {
      setCart([]);
      localStorage.removeItem("cart"); // Remove cart from localStorage
      fetch("http://127.0.0.1:8000/api/cart", {
        method: "DELETE",
      }).catch((error) => console.error("Error clearing cart:", error));
    }
  };

  const handleProceedToCheckout = () => {
    alert("Proceeding to checkout.");
    navigate("/checkout");
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. Start adding items!</p>
      ) : (
        <div className="cart-details">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img src={item.image} alt={item.name} className="cart-img" />
                  </td>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>
                    <button onClick={() => handleRemoveItem(index)} className="remove-btn">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="checkout-cart-summary">
            <h3>Cart Summary</h3>
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
                  <td>
                    <strong>Grand Total</strong>
                  </td>
                  <td>
                    <strong>₹{grandTotal.toFixed(2)}</strong>
                  </td>
                </tr>
              </tbody>
            </table>

            <button onClick={handleProceedToCheckout} className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      <div className="buttons-container">
        <button onClick={handleClearCart} className="clear-cart-btn">
          Clear Cart
        </button>
      </div>

      <Link to="/gallery">
        <button className="continue-shopping-btn">Continue Shopping</button>
      </Link>
    </div>
  );
};

export default Cart;
