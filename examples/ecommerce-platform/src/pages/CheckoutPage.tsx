import { useSelector } from 'react-redux';
import { selectCartTotal } from '../features/cart/cartSlice';
import { useState } from 'react';
import toast from 'react-hot-toast';

function CheckoutPage() {
  const { total } = useSelector(selectCartTotal);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Order placed successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <form onSubmit={handleSubmit} className="checkout-form">
        <section>
          <h2>Shipping Information</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <div className="form-row">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="zipCode"
              placeholder="ZIP Code"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
          </div>
        </section>

        <section>
          <h2>Payment</h2>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />
          <p className="payment-note">💳 Secure payment powered by Stripe</p>
        </section>

        <div className="order-total">
          <h3>Total: ${total.toFixed(2)}</h3>
          <button type="submit" className="btn btn-primary btn-block">
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutPage;
