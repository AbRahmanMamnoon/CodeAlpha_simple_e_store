import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext(null);

export const ShopcontextProvider = (props) => {
  const [cartItems, setCartItems] = useState({}); // Store cart items by product ID
  const [products, setProducts] = useState([]); // Products fetched from API

  // Fetch products from API in Shop page instead of hardcoding them
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/products');
        const data = await response.json();
        setProducts(data.products);

        // Initialize the cart with fetched products
        let initialCart = {};
        data.products.forEach((product) => {
          initialCart[product._id] = 0;
        });
        setCartItems(initialCart);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((total, productId) => {
      const product = products.find((p) => p._id === productId);
      return product ? total + cartItems[productId] * product.price : total;
    }, 0);
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : 0,
    }));
  };

  const updateCartItem = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  // Function to clear the cart after successful checkout
  const clearCart = () => {
    setCartItems((prevCartItems) => {
      // Clear only the counts, but maintain the product structure
      const clearedCart = {};
      Object.keys(prevCartItems).forEach((itemId) => {
        clearedCart[itemId] = 0; // Set all counts to 0
      });
      return clearedCart;
    });
  };

  const contextValue = {
    cartItems,
    products,
    clearCart,
    addToCart,
    removeFromCart,
    updateCartItem,
    getTotalCartAmount,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
