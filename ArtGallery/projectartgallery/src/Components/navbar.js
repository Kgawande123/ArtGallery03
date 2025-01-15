import React from "react";
import { Link, useNavigate } from "react-router-dom"; 
import art from "./attachment_129501680.png"; 
import "./navbar.css";


const Navbar = () => {
  const navigate = useNavigate(); 

 
  const handleLogout = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  return (
    <header>
      <nav className="navbar">
        <div className="logo-container">
          <img src={art} alt="ArtGallery Logo" className="logo" />
          <span className="logo-text">ArtGallery</span>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/gallery" className="nav-link">
              Gallery
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
          {/* Conditionally show Logout and Login/Register based on authentication */}
          {localStorage.getItem("token") ? (
            <li>
              <button onClick={handleLogout} className="nav-link">
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

// Footer component
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            ArtGallery connects art enthusiasts with exceptional pieces from
            emerging and established artists worldwide.
          </p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="nav-link">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li>
              <Link to="/logout" className="nav-link">
                Logout
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Subscribe</h3>
          <form>
            <label htmlFor="newsletter-email" className="sr-only">
              Enter your email
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email"
              className="newsletter-input"
            />
            <button type="submit" className="subscribe-button">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 ArtGallery. All Rights Reserved.
      </div>
    </footer>
  );
};

export { Navbar, Footer };
