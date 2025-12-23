import React from 'react';
import ReactDOM from 'react-dom/client';
import ProductList from './components/ProductList';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <div style={{ padding: '2rem' }}>
      <h1>Products Standalone</h1>
      <ProductList />
    </div>
  </React.StrictMode>
);
