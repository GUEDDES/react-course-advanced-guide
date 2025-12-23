# Module 4 : Architecture Micro-Frontends avec React

## 🎯 Objectifs

Comprendre et implémenter une architecture micro-frontends moderne avec Module Federation.

## 🧩 Concepts Fondamentaux

### Qu'est-ce qu'un Micro-Frontend ?

Une approche architecturale qui décompose une application frontend en **applications indépendantes** qui peuvent :
- Être développées par des équipes différentes
- Utiliser des technologies différentes
- Être déployées indépendamment
- Communiquer entre elles

### Avantages

✅ **Scalabilité d'équipe** : Plusieurs équipes en parallèle
✅ **Déploiements indépendants** : Réduit les risques
✅ **Isolation technologique** : Chaque app peut évoluer
✅ **Réutilisabilité** : Partage de composants

### Inconvénients

❌ **Complexité accrue** : Plus de tooling
❌ **Performance** : Possibles duplications
❌ **Coordination** : Gestion des versions

## 🔧 Module Federation (Webpack 5)

### Architecture Exemple : E-commerce

```
┌──────────────────────────┐
│   Shell App (Host)        │
│   - Navigation            │
│   - Layout                │
│   - Auth                  │
└─────────┬────────────────┘
         │
    ┌────┼───────────────┐
    │    │               │
┌───┴───┐ ┌──┴───┐   ┌───┴───┐
│ Products│ │ Cart  │   │Checkout│
│ (Remote)│ │(Remote)│   │ (Remote)│
└─────────┘ └───────┘   └─────────┘
```

### Configuration Webpack (Shell App)

```javascript
// webpack.config.js (Shell)
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  // ...
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        products: 'products@http://localhost:3001/remoteEntry.js',
        cart: 'cart@http://localhost:3002/remoteEntry.js'
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
        'react-router-dom': { singleton: true }
      }
    })
  ]
};
```

### Configuration Webpack (Remote - Products)

```javascript
// webpack.config.js (Products)
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  // ...
  plugins: [
    new ModuleFederationPlugin({
      name: 'products',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductList': './src/components/ProductList',
        './ProductCard': './src/components/ProductCard'
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true }
      }
    })
  ]
};
```

### Utilisation dans Shell

```jsx
// Shell App
import React, { lazy, Suspense } from 'react';

// Chargement dynamique du remote
const ProductList = lazy(() => import('products/ProductList'));
const Cart = lazy(() => import('cart/CartWidget'));

function App() {
  return (
    <div>
      <header>
        <h1>My E-Commerce</h1>
        <Suspense fallback={<div>Loading cart...</div>}>
          <Cart />
        </Suspense>
      </header>
      
      <main>
        <Suspense fallback={<div>Loading products...</div>}>
          <ProductList />
        </Suspense>
      </main>
    </div>
  );
}
```

## 🔗 Communication Inter-Apps

### 1. Shared State avec Zustand

```javascript
// shared/stores/cartStore.js (partagé via npm ou Module Federation)
import { create } from 'zustand';

export const useCartStore = create((set) => ({
  items: [],
  addItem: (product) => set((state) => ({
    items: [...state.items, product]
  })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  }))
}));
```

```jsx
// Products App
import { useCartStore } from '@shared/stores/cartStore';

function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  
  return (
    <button onClick={() => addItem(product)}>
      Add to Cart
    </button>
  );
}

// Cart App
import { useCartStore } from '@shared/stores/cartStore';

function CartWidget() {
  const items = useCartStore((state) => state.items);
  
  return <div>Cart ({items.length})</div>;
}
```

### 2. Custom Events

```javascript
// shared/events.js
export const EventBus = {
  emit(event, data) {
    window.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  
  on(event, callback) {
    window.addEventListener(event, (e) => callback(e.detail));
  },
  
  off(event, callback) {
    window.removeEventListener(event, callback);
  }
};

// Products App
import { EventBus } from '@shared/events';

function ProductCard({ product }) {
  const handleAddToCart = () => {
    EventBus.emit('cart:add', product);
  };
  
  return <button onClick={handleAddToCart}>Add</button>;
}

// Cart App
import { useEffect, useState } from 'react';
import { EventBus } from '@shared/events';

function CartWidget() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const handleAdd = () => setCount(c => c + 1);
    EventBus.on('cart:add', handleAdd);
    
    return () => EventBus.off('cart:add', handleAdd);
  }, []);
  
  return <div>Cart ({count})</div>;
}
```

## 🛡️ Error Boundaries

```jsx
// components/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Micro-frontend error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>This module failed to load</h2>
          <details>
            <summary>Error details</summary>
            <pre>{this.state.error?.message}</pre>
          </details>
          <button onClick={() => this.setState({ hasError: false })}>
            Retry
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Utilisation
function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <RemoteComponent />
      </Suspense>
    </ErrorBoundary>
  );
}
```

## 💡 Bonnes Pratiques

### 1. Versioning des Contracts

```typescript
// shared/types/product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  version: '1.0'; // Contract version
}

// Migration lors de breaking changes
export function migrateProduct(data: any): Product {
  if (data.version === '1.0') return data;
  
  // Migration logic
  return {
    ...data,
    version: '1.0'
  };
}
```

### 2. Feature Flags

```javascript
// Shell App
const FEATURES = {
  useNewCart: true,
  useNewCheckout: false
};

function App() {
  const Cart = FEATURES.useNewCart 
    ? lazy(() => import('cart_v2/Cart'))
    : lazy(() => import('cart/Cart'));
  
  return <Cart />;
}
```

### 3. Performance Monitoring

```javascript
// utils/performance.js
export function measureRemoteLoad(remoteName) {
  return {
    start() {
      performance.mark(`${remoteName}-start`);
    },
    end() {
      performance.mark(`${remoteName}-end`);
      performance.measure(
        `${remoteName}-load`,
        `${remoteName}-start`,
        `${remoteName}-end`
      );
      
      const measure = performance.getEntriesByName(`${remoteName}-load`)[0];
      console.log(`${remoteName} loaded in ${measure.duration}ms`);
    }
  };
}

// Utilisation
const perf = measureRemoteLoad('products');
perf.start();
import('products/ProductList').then(() => perf.end());
```

## 📈 Architecture Complète

### Structure de Projet

```
microfrontends/
├── shell/
│   ├── src/
│   ├── webpack.config.js
│   └── package.json
├── products/
│   ├── src/
│   ├── webpack.config.js
│   └── package.json
├── cart/
│   ├── src/
│   ├── webpack.config.js
│   └── package.json
└── shared/
    ├── stores/
    ├── types/
    └── package.json
```

## 📈 Points Clés

✅ **Isolation** : Chaque micro-frontend est indépendant
✅ **Shared Dependencies** : Éviter les duplications
✅ **Error Boundaries** : Isoler les erreurs
✅ **Lazy Loading** : Charger à la demande
✅ **Communication** : Événements ou store partagé

## 📚 Ressources

- [Module Federation](https://webpack.js.org/concepts/module-federation/)
- [Micro-Frontends.org](https://micro-frontends.org/)
- [Single-SPA](https://single-spa.js.org/)

---

[← Précédent : Routing & API](../03-Routing-API/README.md)
