import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import toast from 'react-hot-toast';

const MOCK_PRODUCTS = [
  { id: '1', name: 'Wireless Headphones', price: 79.99, image: '🎧', maxStock: 10 },
  { id: '2', name: 'Smart Watch', price: 199.99, image: '⌚', maxStock: 5 },
  { id: '3', name: 'Laptop Stand', price: 49.99, image: '💻', maxStock: 15 },
  { id: '4', name: 'Mechanical Keyboard', price: 129.99, image: '⌨️', maxStock: 8 },
  { id: '5', name: 'USB-C Hub', price: 39.99, image: '🔌', maxStock: 20 },
  { id: '6', name: 'Webcam HD', price: 89.99, image: '📹', maxStock: 12 }
];

function ProductsPage() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const filteredProducts = MOCK_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = (product: typeof MOCK_PRODUCTS[0]) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="products-page">
      <h1>Our Products</h1>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">{product.image}</div>
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="btn btn-primary"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
