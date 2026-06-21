// src/pages/MenuPage.jsx
import { useState } from 'react';
import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";
import Footer from "../components/Footer/Footer";

const MenuPage = () => {
  const [cartTotal, setCartTotal] = useState(0);
  
  const handleAddToCart = (price) => {
    console.log('MenuPage handleAddToCart called with price:', price);
    setCartTotal(prev => prev + price);
    console.log('New cart total:', cartTotal + price);
  };

  return (
    <>
      <Header cartTotal={cartTotal} />
      <Menu onAddToCart={handleAddToCart} />
      <Footer />
    </>
  );
};

export default MenuPage;