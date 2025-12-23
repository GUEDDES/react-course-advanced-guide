import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { useCartStore } from './store/cartStore';

// @ts-ignore
const ProductList = React.lazy(() => import('products/ProductList'));
// @ts-ignore
const Cart = React.lazy(() => import('cart/Cart'));

function App() {
  const itemCount = useCartStore((state) => 
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <BrowserRouter>
      <div className="app">
        <header className="header">
          <div className="container">
            <h1 className="logo">🛍️ Micro E-Commerce</h1>
            <nav className="nav">
              <Link to="/">Products</Link>
              <Link to="/cart" className="cart-link">
                🛒 Cart {itemCount > 0 && <span className="badge">{itemCount}</span>}
              </Link>
            </nav>
          </div>
        </header>

        <main className="main">
          <div className="container">
            <Suspense fallback={<div className="loading">Loading...</div>}>
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </Suspense>
          </div>
        </main>

        <footer className="footer">
          <div className="container">
            <p>Microfrontend Architecture Demo with Module Federation</p>
            <div className="mf-info">
              <span className="mf-badge shell">Shell:3000</span>
              <span className="mf-badge products">Products:3001</span>
              <span className="mf-badge cart">Cart:3002</span>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
