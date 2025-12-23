import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItemCount } from '../../features/cart/cartSlice';

function Header() {
  const itemCount = useSelector(selectCartItemCount);

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <h1>ShopHub</h1>
        </Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart" className="cart-link">
            🛒 Cart {itemCount > 0 && <span className="badge">{itemCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
