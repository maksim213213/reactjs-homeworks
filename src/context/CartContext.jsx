import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'cart_total';

export const CartProvider = ({ children }) => {
  const [cartTotal, setCartTotal] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseFloat(saved) : 0;
  });

  const addToCart = (price) => {
    setCartTotal((prev) => {
      const next = prev + price;
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  };

  const clearCart = () => {
    setCartTotal(0);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <CartContext.Provider value={{ cartTotal, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
