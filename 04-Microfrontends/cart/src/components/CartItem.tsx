import React from 'react';
import { useCartStore } from '../store/cartStore';
import './CartItem.css';

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-info">
        <h3>{item.name}</h3>
        <p className="item-price">${item.price.toFixed(2)}</p>
      </div>
      <div className="cart-item-actions">
        <div className="quantity-controls">
          <button
            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
            className="qty-btn"
          >
            -
          </button>
          <span className="quantity">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="qty-btn"
          >
            +
          </button>
        </div>
        <button
          onClick={() => removeItem(item.id)}
          className="remove-btn"
          title="Remove item"
        >
          🗑️
        </button>
      </div>
      <div className="cart-item-total">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;
