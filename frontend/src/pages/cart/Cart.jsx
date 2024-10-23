import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../../context/shop-context';
import { CartItem } from '../../component/cart-item';
import { useNavigate } from 'react-router-dom';
import './cart.css';

export const Cart = () => {
  const { cartItems, getTotalCartAmount, products, clearCart } =
    useContext(ShopContext); // clearCart to empty cart after successful checkout
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products only once when the shop page loads, not in the cart page
    // This useEffect in cart page should not fetch data
  }, []);

  // Handle checkout: send cart items to API
  const handleCheckout = async () => {
    const cartData = products
      .filter((product) => cartItems[product._id] !== 0)
      .map((product) => ({
        productId: product._id,
        quantity: cartItems[product._id],
      }));

    try {
      const response = await fetch('http://localhost:5000/api/v1/users/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartData, cartTotal: totalAmount }),
      });

      if (response.ok) {
        // Checkout success
        alert('Checkout successful!');
        clearCart(); // Clear the cart after successful checkout
        navigate('/'); // Redirect to homepage
      } else {
        alert('Checkout failed.');
        console.error('Checkout failed:', response.status);
      }
    } catch (error) {
      alert('Error during checkout.');
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div className="cart">
      <div className="cartTitle">
        <h1>Your Cart Items</h1>
      </div>

      <div className="cartItems">
        {products.length > 0 &&
          products.map((product) => {
            if (cartItems[product._id] !== 0) {
              return <CartItem key={product._id} data={product} />;
            }
            return null;
          })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p>SubTotal: ${totalAmount}</p>
          <button onClick={() => navigate('/')}>Continue Shopping</button>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      ) : (
        <h1>Your Cart is Empty</h1>
      )}
    </div>
  );
};
