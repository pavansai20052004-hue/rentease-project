import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const readStoredCart = () => {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
};

const getProductKey = (item) => item.productId || item.id || item._id || item.name;

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(readStoredCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      const itemKey = getProductKey(item);
      const existingItem = prev.find((cartItem) => getProductKey(cartItem) === itemKey);

      if (existingItem) {
        return prev.map((cartItem) =>
          getProductKey(cartItem) === itemKey
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        );
      }

      return [...prev, { ...item, productId: itemKey, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => getProductKey(item) !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    const nextQuantity = Math.max(1, Number(quantity) || 1);

    setCart((prev) =>
      prev.map((item) =>
        getProductKey(item) === productId ? { ...item, quantity: nextQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalRent = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );
  const totalDeposit = cart.reduce(
    (sum, item) => sum + (item.deposit || 0) * (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        totalRent,
        totalDeposit,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
