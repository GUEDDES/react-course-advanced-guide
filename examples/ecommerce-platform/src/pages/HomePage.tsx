import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to ShopHub</h1>
        <p>Your one-stop shop for everything you need</p>
        <Link to="/products" className="btn btn-primary">
          Shop Now
        </Link>
      </section>

      <section className="features">
        <div className="feature">
          <h3>🚚 Free Shipping</h3>
          <p>On orders over $50</p>
        </div>
        <div className="feature">
          <h3>💳 Secure Payment</h3>
          <p>100% secure transactions</p>
        </div>
        <div className="feature">
          <h3>↩️ Easy Returns</h3>
          <p>30-day return policy</p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
