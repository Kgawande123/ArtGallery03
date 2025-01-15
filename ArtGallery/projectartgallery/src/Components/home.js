import React from "react";
import "./home.css";
import img1 from "./Abstract Art.jpg";
import img2 from "./Abstract Landscape.webp";
import img4 from "./natureart.jpg";
const Home = () => {
  return (
    <div className="home-container">
      {/* Header Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="abc">Welcome to ArtGallery</h1>
          <p>
            Explore a curated collection of contemporary artworks from emerging and established artists worldwide.
          </p>
          <a href="/gallery" className="explore-button">
            Explore the Gallery
          </a>
        </div>
      </section>

      {/* Art as an Investment Section */}
      <section className="investment-section">
        <h2 className="section-title">Art as an Investment</h2>
        <div className="investment-phrases">
          <div className="investment-item">Art as an Investment</div>
          <div className="investment-item">Record Investment Potential</div>
          <div className="investment-item">Expertise-led Approach</div>
          <div className="investment-item">Creating Modern Heirlooms</div>
          <div className="investment-item">Timeless Investments</div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <div className="animated-text">
            <span>Experience the fusion of creativity and culture at</span>
            <span className="animated-word">ArtGallery</span>
          </div>
          <div className="footer-logos">
            <img src={img1} alt="Logo 1" className="footer-logo" />
            <img src={img2} alt="Logo 2" className="footer-logo" />
            <img src={img4} alt="Logo 3" className="footer-logo" />
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 ArtGallery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
