# 🏗️ Microfrontends avec Module Federation

## 📋 Table des Matières

1. [Introduction](#introduction)
2. [Architecture](#architecture)
3. [Installation](#installation)
4. [Démarrage Rapide](#démarrage-rapide)
5. [Explication Détaillée](#explication-détaillée)
6. [Structure du Projet](#structure-du-projet)
7. [Communication Entre Microfrontends](#communication)
8. [Gestion d'État Partagé](#gestion-détat)
9. [Déploiement](#déploiement)
10. [Avantages & Inconvénients](#avantages-inconvénients)
11. [Troubleshooting](#troubleshooting)

---

## 📖 Introduction

### Qu'est-ce qu'un Microfrontend ?

Un **microfrontend** est une architecture qui divise une application frontend en **modules indépendants**, chacun pouvant être développé, testé et déployé séparément.

### Module Federation (Webpack 5)

**Module Federation** permet de charger du code JavaScript dynamiquement à partir d'autres applications à l'exécution, sans avoir besoin de tout bundler ensemble.

### Notre Application E-Commerce

Nous avons divisé une application e-commerce en 3 microfrontends :

```
┌─────────────────────────────────────┐
│         Shell (Host)                │
│         Port: 3000                  │
│  - Navigation                       │
│  - Routing                          │
│  - Layout                           │
└───────────┬─────────────────────────┘
            │
            ├─────────────────┬─────────────────┐
            ▼                 ▼                 ▼
    ┌───────────────┐  ┌───────────────┐  ┌───────────────┐
    │   Products    │  │     Cart      │  │    Shared     │
    │   Port: 3001  │  │   Port: 3002  │  │   (Store)     │
    │               │  │               │  │               │
    │ - Liste       │  │ - Panier      │  │ - Zustand     │
    │ - Filtres     │  │ - Checkout    │  │ - Types       │
    │ - Cards       │  │ - Summary     │  │ - Utils       │
    └───────────────┘  └───────────────┘  └───────────────┘
```

---

## 🏗️ Architecture

### Composants de l'Architecture

#### 1. **Shell (Host Application)** - Port 3000

**Responsabilités :**
- Navigation globale
- Routing (React Router)
- Layout de l'application
- Chargement des microfrontends
- Store partagé (Zustand)

**Expose :**
- `cartStore` - Store Zustand pour le panier

**Consomme :**
- `products/ProductList` depuis Products MFE
- `cart/Cart` depuis Cart MFE

#### 2. **Products Microfrontend** - Port 3001

**Responsabilités :**
- Affichage de la liste des produits
- Filtrage par catégorie
- Recherche de produits
- Ajout au panier

**Expose :**
- `./ProductList` - Composant de liste de produits

**Consomme :**
- `shell/cartStore` - Pour ajouter des produits

#### 3. **Cart Microfrontend** - Port 3002

**Responsabilités :**
- Affichage du panier
- Gestion des quantités
- Calcul du total
- Checkout

**Expose :**
- `./Cart` - Composant du panier

**Consomme :**
- `shell/cartStore` - Pour lire et modifier le panier

---

## 💻 Installation

### Prérequis

- Node.js >= 16
- npm ou yarn

### Installation des dépendances

```bash
# Installer les dépendances pour chaque microfrontend

# Shell
cd shell
npm install

# Products
cd ../products
npm install

# Cart
cd ../cart
npm install
```

---

## 🚀 Démarrage Rapide

### Lancer les 3 applications

Vous devez lancer les **3 serveurs en même temps** dans des terminaux séparés :

```bash
# Terminal 1 - Shell (Host)
cd shell
npm run dev
# ➜ http://localhost:3000

# Terminal 2 - Products
cd products
npm run dev
# ➜ http://localhost:3001

# Terminal 3 - Cart
cd cart
npm run dev
# ➜ http://localhost:3002
```

### Accéder à l'application

Ouvrez votre navigateur sur **http://localhost:3000**

L'application Shell chargera automatiquement les composants de Products et Cart.

---

## 📚 Explication Détaillée

### 1. Configuration Module Federation

#### Shell (webpack.config.js)

```javascript
new ModuleFederationPlugin({
  name: 'shell',                    // Nom de cette application
  remotes: {                        // Applications distantes à consommer
    products: 'products@http://localhost:3001/remoteEntry.js',
    cart: 'cart@http://localhost:3002/remoteEntry.js',
  },
  shared: {                         // Dépendances partagées
    react: { singleton: true },
    'react-dom': { singleton: true },
    zustand: { singleton: true },
  },
})
```

**Explication :**
- `name` : Identifiant unique de l'application
- `remotes` : Définit les microfrontends distants à charger
- `shared` : Dépendances partagées entre tous les MFE
  - `singleton: true` garantit une seule instance de React

#### Products (webpack.config.js)

```javascript
new ModuleFederationPlugin({
  name: 'products',                 // Nom de cette application
  filename: 'remoteEntry.js',       // Fichier exposé
  exposes: {                        // Composants exposés
    './ProductList': './src/components/ProductList',
  },
  shared: {                         // Mêmes dépendances que Shell
    react: { singleton: true },
    'react-dom': { singleton: true },
    zustand: { singleton: true },
  },
})
```

**Explication :**
- `exposes` : Définit les composants accessibles depuis l'extérieur
- `filename` : Nom du fichier qui contient les exports

### 2. Chargement Dynamique

#### Dans Shell/App.tsx

```typescript
// Lazy loading des microfrontends
const ProductList = React.lazy(() => import('products/ProductList'));
const Cart = React.lazy(() => import('cart/Cart'));

// Utilisation avec Suspense
<Suspense fallback={<div>Loading...</div>}>
  <Routes>
    <Route path="/" element={<ProductList />} />
    <Route path="/cart" element={<Cart />} />
  </Routes>
</Suspense>
```

**Explication :**
- `React.lazy()` charge le composant uniquement quand nécessaire
- `import('products/ProductList')` référence le remote configuré
- `Suspense` gère l'état de chargement

### 3. Gestion d'État Partagé avec Zustand

#### Shell définit le store

```typescript
// shell/src/store/cartStore.ts
export const useCartStore = create<CartState>()()
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => { /* ... */ },
      removeItem: (id) => { /* ... */ },
      // ...
    }),
    { name: 'cart-storage' }
  )
);
```

#### Products et Cart importent le store

```typescript
// products/src/store/cartStore.ts
// @ts-ignore
import { useCartStore } from 'shell/cartStore';
export { useCartStore };
```

**Explication :**
- Le Shell expose le store via Module Federation
- Products et Cart le réutilisent
- Un seul store partagé = synchronisation automatique

---

## 📁 Structure du Projet

```
04-Microfrontends/
│
├── shell/                          # Application hôte (Port 3000)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.tsx                 # App principale avec routing
│   │   ├── App.css                 # Styles globaux
│   │   ├── index.tsx               # Entry point
│   │   └── store/
│   │       └── cartStore.ts        # ✨ Store Zustand partagé
│   ├── package.json
│   ├── tsconfig.json
│   └── webpack.config.js           # ⚙️ Config Module Federation
│
├── products/                       # Microfrontend Products (Port 3001)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductList.tsx     # ✨ Exposé au Shell
│   │   │   ├── ProductCard.tsx
│   │   │   └── *.css
│   │   ├── data/
│   │   │   └── products.ts         # Mock data
│   │   ├── store/
│   │   │   └── cartStore.ts        # Import depuis Shell
│   │   └── index.tsx
│   ├── package.json
│   └── webpack.config.js           # ⚙️ Expose ProductList
│
└── cart/                           # Microfrontend Cart (Port 3002)
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Cart.tsx            # ✨ Exposé au Shell
    │   │   ├── CartItem.tsx
    │   │   └── *.css
    │   ├── store/
    │   │   └── cartStore.ts        # Import depuis Shell
    │   └── index.tsx
    ├── package.json
    └── webpack.config.js           # ⚙️ Expose Cart
```

---

## 🔄 Communication Entre Microfrontends

### 1. Via Store Partagé (Zustand) ✅ Recommandé

```typescript
// Products ajoute un produit
const addItem = useCartStore(state => state.addItem);
addItem(product);

// Cart affiche les items
const items = useCartStore(state => state.items);
```

**Avantages :**
- Simple et performant
- Synchronisation automatique
- Type-safe avec TypeScript

### 2. Via Custom Events (Alternative)

```typescript
// Products émet un événement
window.dispatchEvent(new CustomEvent('cart:add', { 
  detail: product 
}));

// Cart écoute l'événement
window.addEventListener('cart:add', (e) => {
  addItem(e.detail);
});
```

### 3. Via Props (Simple)

```typescript
// Shell passe des callbacks
<ProductList onAddToCart={handleAdd} />
```

---

## 🗄️ Gestion d'État

### Store Zustand Centralisé

```typescript
interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}
```

**Fonctionnalités :**
- ✅ Persistance dans localStorage
- ✅ Calcul automatique du total
- ✅ Actions typées (TypeScript)
- ✅ Partagé entre tous les MFE

---

## 🚢 Déploiement

### Build Production

```bash
# Build chaque microfrontend
cd shell && npm run build
cd ../products && npm run build
cd ../cart && npm run build
```

### Déploiement Séparé

Chaque microfrontend peut être déployé **indépendamment** :

```
Shell     → https://myapp.com
Products  → https://products.myapp.com
Cart      → https://cart.myapp.com
```

### Configuration Production

```javascript
// Shell webpack.config.js (production)
remotes: {
  products: 'products@https://products.myapp.com/remoteEntry.js',
  cart: 'cart@https://cart.myapp.com/remoteEntry.js',
}
```

---

## ✅ Avantages & ❌ Inconvénients

### ✅ Avantages

| Avantage | Description |
|----------|-------------|
| **Déploiement Indépendant** | Chaque équipe peut déployer sans toucher aux autres |
| **Scalabilité** | Ajout facile de nouveaux microfrontends |
| **Équipes Autonomes** | Chaque équipe possède son MFE |
| **Technologies Différentes** | Possibilité de mélanger React/Vue/Angular |
| **Chargement à la demande** | Les MFE se chargent uniquement quand nécessaires |
| **Isolation des bugs** | Un bug dans Products n'affecte pas Cart |

### ❌ Inconvénients

| Inconvénient | Solution |
|--------------|----------|
| **Complexité initiale** | Templates et documentation |
| **Duplication de dépendances** | Configuration `shared` dans Webpack |
| **Problèmes de versioning** | Semantic versioning strict |
| **Tests plus complexes** | Tests d'intégration end-to-end |
| **Performance initiale** | Lazy loading et code splitting |
| **DevOps complexe** | CI/CD automatisé |

---

## 🐛 Troubleshooting

### Problème: MFE ne se charge pas

```
Uncaught Error: Shared module is not available for eager consumption
```

**Solution :** Vérifier que tous les MFE sont démarrés

### Problème: Version React différente

```
Error: Multiple instances of React detected
```

**Solution :** Ajouter `singleton: true` dans la config shared

```javascript
shared: {
  react: { singleton: true, requiredVersion: '^18.2.0' },
}
```

### Problème: CORS errors

```
Access to fetch at 'http://localhost:3001/remoteEntry.js' has been blocked
```

**Solution :** Ajouter headers CORS dans devServer

```javascript
devServer: {
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
}
```

### Problème: Hot reload ne fonctionne pas

**Solution :** Redémarrer tous les serveurs de développement

---

## 📖 Ressources

- [Module Federation Documentation](https://webpack.js.org/concepts/module-federation/)
- [Micro Frontends Pattern](https://martinfowler.com/articles/micro-frontends.html)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)

---

## 🎯 Exercices Pratiques

### Exercice 1: Ajouter un nouveau MFE

Créez un microfrontend **User Profile** :
- Port 3003
- Affiche les informations utilisateur
- Partage le store Zustand

### Exercice 2: Ajouter une fonctionnalité

Ajoutez un système de **favoris** dans Products :
- Nouveau store `favoritesStore`
- Bouton cœur sur chaque produit
- Liste des favoris dans Cart

### Exercice 3: Optimisation

Améliorer les performances :
- Préchargement des MFE au hover
- Cache des données produits
- Optimistic updates

---

## 📝 Conclusion

Ce projet démontre une **architecture microfrontend complète** avec :

- ✅ **Module Federation** (Webpack 5)
- ✅ **Routing** (React Router)
- ✅ **État partagé** (Zustand)
- ✅ **TypeScript**
- ✅ **CSS Modules**
- ✅ **Lazy Loading**

**Prêt pour la production !** 🚀

---

## 👨‍💻 Auteur

Cours React Advanced - ISITCOM Master SWM

---

**Happy Coding! 🎉**
