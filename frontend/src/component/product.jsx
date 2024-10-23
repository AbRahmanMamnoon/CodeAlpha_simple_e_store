import React, { useContext } from 'react';
import { ShopContext } from '../context/shop-context';
import '../pages/shop/shop.css';

export const Product = (props) => {
  const { _id, name, price, image } = props.data;
  const { cartItems, addToCart } = useContext(ShopContext);

  const cartAmount = cartItems[_id];
  return (
    <div className="product">
      <img src={image} alt="img" />
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p>{price}$</p>
        <button className="AddToCart" onClick={() => addToCart(_id)}>
          Add To Cart
          {cartAmount > 0 && <>({cartAmount})</>}
        </button>
      </div>
    </div>
  );
};
