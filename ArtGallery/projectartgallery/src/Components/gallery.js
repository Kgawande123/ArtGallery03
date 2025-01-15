import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; // Import
import img1 from "./Abstract Art.jpg";
import img2 from "./Abstract Landscape.webp";
import img3 from "./Modern Art.jpg";
import img4 from "./natureart.jpg";
import img5 from "./popart.jpg";
import img6 from "./abstract sculpture.jpg";
import "./gallery.css";

const sampleProducts = [
  { id: 1, name: "Abstract Art", type: "Painting", price: 150, image: img1 },
  { id: 2, name: "Landscape Art", type: "Painting", price: 200, image: img2 },
  { id: 3, name: "Modern Art", type: "Sculpture", price: 250, image: img3 },
  { id: 4, name: "Nature Art", type: "Photography", price: 100, image: img4 },
  { id: 5, name: "Pop Art", type: "Painting", price: 300, image: img5 },
  { id: 6, name: "Abstract Sculpture", type: "Sculpture", price: 350, image: img6 },
];

const Gallery = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPrice, setFilterPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/products/"); 
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts(sampleProducts); 
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const isProductInCart = cart.some((item) => item.id === product.id);

    if (isProductInCart) {
      alert("This product is already in your cart!");
      return;
    }

    setCart([...cart, product]);
    alert(`${product.name} has been added to your cart!`);
    setTimeout(() => {
      navigate("/cart");
    }, 500);
  };

  const filteredProducts = products.filter((product) => {
    return (
      (filterName === "" || product.name.toLowerCase().includes(filterName.toLowerCase())) &&
      (filterType === "" || product.type === filterType) &&
      (filterPrice === 0 || product.price <= filterPrice)
    );
  });

  return (
    <div className="gallery-container">
      <h1>Art Gallery</h1>

      {/* Cart Icon with Inline CSS */}
      <div
        className="cart-icon"
        onClick={() => navigate("/cart")}
        style={{
          position: "absolute",
          
          right: "200px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f1f1f1",
          padding: "10px",
          borderRadius: "50%",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        <FaShoppingCart
          style={{
            fontSize: "24px",
            color: "#333",
            transition: "color 0.3s ease",
          }}
        />
        {cart.length > 0 && (
          <span
            className="cart-count"
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              backgroundColor: "red",
              color: "white",
              fontSize: "12px",
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {cart.length}
          </span>
        )}
      </div>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by Name"
          onChange={(e) => setFilterName(e.target.value)}
          value={filterName}
        />
        <select onChange={(e) => setFilterType(e.target.value)} value={filterType}>
          <option value="">All Types</option>
          <option value="Painting">Painting</option>
          <option value="Sculpture">Sculpture</option>
          <option value="Photography">Photography</option>
        </select>
        <input
          type="digits"
          placeholder="Max Price"
          onChange={(e) => setFilterPrice(Number(e.target.value))}
          value={filterPrice}
        />
      </div>

      {/* Gallery Items */}
      <div className="gallery-items">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="gallery-item">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Type: {product.type}</p>
              <p>Price: ₹{product.price}</p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p className="no-results">No products match your filters.</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
