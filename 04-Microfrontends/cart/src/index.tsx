import React from 'react';
import ReactDOM from 'react-dom/client';
import Cart from './components/Cart';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <div style={{ padding: '2rem' }}>
      <h1>Cart Standalone</h1>
      <Cart />
    </div>
  </React.StrictMode>
);
