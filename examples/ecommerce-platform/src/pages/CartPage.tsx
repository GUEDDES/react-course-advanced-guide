import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, selectCartTotal, removeFromCart, updateQuantity } from '../features/cart/cartSlice';

function CartPage() {
  const items = useSelector(selectCartItems);
  const { subtotal, discount, total } = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <Link to="/products" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-image">{item.image}</div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="item-price">${item.price}</p>
            </div>
            <div className="item-quantity">
              <button
                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
              >
                +
              </button>
            </div>
            <div className="item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="btn-remove"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Order Summary</h2>
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="summary-row discount">
            <span>Discount:</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="summary-row total">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <Link to="/checkout" className="btn btn-primary btn-block">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default CartPage;
