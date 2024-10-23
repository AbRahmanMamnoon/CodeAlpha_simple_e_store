import React, { useContext } from 'react';
import { ShopContext } from '../context/shop-context';

export const CartItem = (props) => {
  const { cartItems, addToCart, removeFromCart, updateCartItem } =
    useContext(ShopContext);
  const { _id, name, price, image } = props.data;

  return (
    <div className="cartItem">
      <img src={image} alt="IMG" />
      <div className="description">
        <div>
          <p>
            <b>{name}</b>
          </p>
          <p>${price}</p>
        </div>
        <div className="countHandler">
          <button className="removeBtn" onClick={() => removeFromCart(_id)}>
            {' '}
            -{' '}
          </button>
          <input
            value={cartItems[_id]}
            onChange={(e) => updateCartItem(Number(e.target.value), _id)}
          />
          <button className="addBtn" onClick={() => addToCart(_id)}>
            {' '}
            +{' '}
          </button>
        </div>
      </div>
    </div>
  );
};
