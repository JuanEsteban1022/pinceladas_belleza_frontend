import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem('cart');
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const addToCart = (product, cantidad = 1) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);

      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, cantidad: (item.cantidad || 1) + cantidad }
            : item
        );
      } else {
        return [...prevCart, { ...product, cantidad }];
      }
    });
  };

  const updateQty = (id, cantidad) => {
    setCart((prev) => prev.map((it) => it.id === id ? { ...it, cantidad: Math.max(1, Number(cantidad) || 1) } : it));
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((it) => it.id !== id));
  };

  const clearCart = () => setCart([]);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch {/* ignore quota errors */ }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
