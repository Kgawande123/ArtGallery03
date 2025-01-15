import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setCart }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    console.log("Before logout:", Object.keys(localStorage));

    console.log('Before ----->');
    localStorage.clear();
    console.log('After ------>');
    localStorage.removeItem("cart");
    localStorage.removeItem("token"); 
    localStorage.removeItem("currentUser"); 
    
    
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      localStorage.removeItem(`cart_${user.id}`); 
    }

  
    

    
    if (setCart) {
      setCart([]);
    }

    
    console.log("After logout:", Object.keys(localStorage));

  
    navigate("/login");
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
