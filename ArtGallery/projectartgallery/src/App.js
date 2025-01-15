import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Import components
import { Navbar, Footer } from "./Components/navbar";
import Home from "./Components/home";
import Gallery from "./Components/gallery";
import Cart from "./Components/addcart";
import Checkout from "./Components/checkout";
import Payment from "./Components/payment";
import About from "./Components/about";
import Contact from "./Components/contact";
import Login from "./Components/Authentication/login";
import Register from "./Components/Authentication/register";
import Profile from "./Components/Authentication/profile";
import Logout from "./Components/Authentication/logout";
import ProtectedRoute from "./Components/Authentication/ProtectedRoute"; // Import ProtectedRoute

// Load your Stripe publishable key
const stripePromise = loadStripe("your-publishable-key-here");

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gallery"
            element={
              <ProtectedRoute>
                <Gallery cart={cart} setCart={setCart} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart cart={cart} setCart={setCart} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout cart={cart} setCart={setCart} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Elements stripe={stripePromise}>
                  <Payment grandTotal={5000} />
                </Elements>
              </ProtectedRoute>
            }
          />

          {/* Catch-all Route */}
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
