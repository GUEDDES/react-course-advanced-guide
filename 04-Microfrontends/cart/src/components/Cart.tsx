import React from 'react';
import { useCartStore } from '../store/cartStore';
import CartItem from './CartItem';
import './Cart.css';

const Cart = () => {
  const { items, total, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Shopping Cart ({items.length} items)</h2>
        <button onClick={clearCart} className="clear-btn">
          Clear Cart
        </button>
      </div>

      <div className="cart-items">
        {items.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping:</span>
          <span className="free">FREE</span>
        </div>
        <div className="summary-row">
          <span>Tax (10%):</span>
          <span>${(total * 0.1).toFixed(2)}</span>
        </div>
        <div className="summary-total">
          <span>Total:</span>
          <span>${(total * 1.1).toFixed(2)}</span>
        </div>
        <button className="checkout-btn">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
