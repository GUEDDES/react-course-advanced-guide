# Module 2 : Gestion d'État à Grande Échelle

## 🎯 Objectifs

Comprendre les limites de Context API et maîtriser les solutions modernes de state management.

## 🔍 Comparaison des Solutions

### Context API + useReducer

**✅ Avantages :**
- Natif React (pas de dépendance)
- Simple pour petits projets
- Bon pour données rarement mises à jour

**❌ Inconvénients :**
- Re-render de TOUS les consommateurs
- Pas de sélecteurs optimisés
- Difficulté à scaler

### Zustand (Recommandé)

**✅ Avantages :**
- Minimal (< 1KB)
- API simple comme `useState`
- Sélecteurs optimisés par défaut
- Pas de Provider

**❌ Inconvénients :**
- Écosystème plus petit que Redux
- Moins de middleware disponibles

### Redux Toolkit

**✅ Avantages :**
- Standard industrie
- DevTools puissants
- Écosystème immense
- Excellent pour grandes équipes

**❌ Inconvénients :**
- Plus verbeux
- Courbe d'apprentissage
- Overhead pour petits projets

## 🐻 Zustand - Guide Complet

### Installation

```bash
npm install zustand
```

### Store Basique

```javascript
// stores/cartStore.js
import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  // État
  items: [],
  total: 0,
  
  // Actions
  addItem: (product) => set((state) => {
    const existingItem = state.items.find(item => item.id === product.id);
    
    if (existingItem) {
      return {
        items: state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        total: state.total + product.price
      };
    }
    
    return {
      items: [...state.items, { ...product, quantity: 1 }],
      total: state.total + product.price
    };
  }),
  
  removeItem: (productId) => set((state) => {
    const item = state.items.find(i => i.id === productId);
    if (!item) return state;
    
    return {
      items: state.items.filter(i => i.id !== productId),
      total: state.total - (item.price * item.quantity)
    };
  }),
  
  clearCart: () => set({ items: [], total: 0 }),
  
  // Action utilisant get()
  getItemCount: () => {
    const state = get();
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}));
```

### Utilisation dans Composants

```jsx
import { useCartStore } from './stores/cartStore';

// Composant qui lit UNE valeur
function CartBadge() {
  // ✅ Sélecteur optimisé
  const itemCount = useCartStore((state) => 
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  
  return <span className="badge">{itemCount}</span>;
}

// Composant qui modifie l'état
function ProductCard({ product }) {
  // ✅ Récupère uniquement l'action (stable)
  const addItem = useCartStore((state) => state.addItem);
  
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.price}€</p>
      <button onClick={() => addItem(product)}>
        Add to Cart
      </button>
    </div>
  );
}

// Composant qui affiche le panier
function CartSummary() {
  // Récupère plusieurs valeurs
  const { items, total, removeItem, clearCart } = useCartStore((state) => ({
    items: state.items,
    total: state.total,
    removeItem: state.removeItem,
    clearCart: state.clearCart
  }));
  
  return (
    <div>
      <h2>Cart ({items.length} items)</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity} = {item.price * item.quantity}€
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p><strong>Total: {total}€</strong></p>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}
```

### Middleware de Persistance

```javascript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addItem: (product) => { /* ... */ },
      // ...
    }),
    {
      name: 'cart-storage', // Clé localStorage
      // Optionnel: Storage personnalisé
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name)
      }
    }
  )
);
```

### Slices Pattern (Organisation)

```javascript
// stores/slices/userSlice.js
export const createUserSlice = (set) => ({
  user: null,
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null })
});

// stores/slices/cartSlice.js
export const createCartSlice = (set, get) => ({
  items: [],
  addItem: (product) => { /* ... */ }
});

// stores/index.js
import { create } from 'zustand';
import { createUserSlice } from './slices/userSlice';
import { createCartSlice } from './slices/cartSlice';

export const useAppStore = create((...args) => ({
  ...createUserSlice(...args),
  ...createCartSlice(...args)
}));
```

## 🔴 Redux Toolkit - Alternative

### Installation

```bash
npm install @reduxjs/toolkit react-redux
```

### Slice Redux

```javascript
// store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0
  },
  reducers: {
    addItem: (state, action) => {
      const existing = state.items.find(i => i.id === action.payload.id);
      
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      state.total += action.payload.price;
    },
    removeItem: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        state.total -= item.price * item.quantity;
        state.items = state.items.filter(i => i.id !== action.payload);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    }
  }
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
```

### Store Configuration

```javascript
// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer
  }
});
```

### Provider Setup

```jsx
// main.jsx
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

### Utilisation

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from './store/cartSlice';

function CartBadge() {
  const itemCount = useSelector((state) => 
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  
  return <span>{itemCount}</span>;
}

function ProductCard({ product }) {
  const dispatch = useDispatch();
  
  return (
    <button onClick={() => dispatch(addItem(product))}>
      Add to Cart
    </button>
  );
}
```

## 📈 Tableau Comparatif

| Critère | Context API | Zustand | Redux Toolkit |
|---------|-------------|---------|---------------|
| **Taille** | 0 KB (natif) | ~1 KB | ~10 KB |
| **Setup** | Moyen | Facile | Complexe |
| **Performance** | ⚠️ Limite | ✅ Excellente | ✅ Excellente |
| **DevTools** | ❌ Non | 🟡 Basique | ✅ Avancé |
| **Provider** | Requis | Non | Requis |
| **Courbe** | Facile | Facile | Moyenne |
| **Cas d'usage** | Petit projet | Petit-Moyen | Moyen-Grand |

## 💡 Recommandations

**Utilisez Context API si :**
- Projet très simple
- Données rarement mises à jour (thème, locale)
- Vous voulez zéro dépendance

**Utilisez Zustand si :**
- Vous voulez de la simplicité
- Performances importantes
- Projet solo ou petite équipe

**Utilisez Redux Toolkit si :**
- Grande application entreprise
- Équipe nombreuse
- Besoin de conventions strictes
- Débogage avancé requis

## 📚 Ressources

- [Zustand Documentation](https://docs.pmnd.rs/zustand)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [React Context](https://react.dev/learn/passing-data-deeply-with-context)

---

[← Précédent : React Hooks](../01-React-Hooks/README.md) | [Suivant : Routing →](../03-Routing-API/README.md)
