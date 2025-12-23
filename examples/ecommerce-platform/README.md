# E-Commerce Platform - Projet Full-Stack

## 🛍️ Description

Plateforme e-commerce complète avec catalogue de produits, panier, paiement, et tableau de bord administrateur.

## ✨ Fonctionnalités

### 🏪 Pour les Clients
- Catalogue de produits avec filtres avancés
- Recherche intelligente avec suggestions
- Panier d'achat persistant
- Système de favoris/wishlist
- Checkout multi-étapes
- Historique des commandes
- Avis et notes produits

### 👨‍💼 Pour les Administrateurs
- Dashboard avec analytics
- Gestion des produits (CRUD)
- Gestion des commandes
- Gestion des stocks
- Rapports de ventes
- Gestion des utilisateurs

### 🔐 Authentification
- Inscription/Connexion
- OAuth (Google, GitHub)
- Réinitialisation mot de passe
- Profil utilisateur

### 💳 Paiement
- Intégration Stripe (mode test)
- Multiple méthodes de paiement
- Codes promo et réductions
- Calcul automatique des taxes

## 🛠️ Stack Technique

### Frontend
- **React 18** avec TypeScript
- **Redux Toolkit** + RTK Query
- **React Router v6**
- **Tailwind CSS**
- **Framer Motion** pour animations
- **React Hook Form** pour formulaires
- **Zod** pour validation

### Backend (Mock API)
- **JSON Server** pour développement
- **MSW** (Mock Service Worker) pour tests

### Paiement
- **Stripe Elements** (React)

## 🏗️ Architecture

```
src/
├── features/
│   ├── products/
│   │   ├── components/
│   │   ├── api/
│   │   ├── slices/
│   │   └── types/
│   ├── cart/
│   ├── auth/
│   ├── checkout/
│   └── admin/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── types/
├── store/
│   └── store.ts
├── routes/
│   └── AppRoutes.tsx
└── App.tsx
```

## 🚀 Installation

```bash
cd examples/ecommerce-platform
npm install

# Lancer le mock backend
npm run server

# Dans un autre terminal, lancer le frontend
npm run dev
```

## 🧪 Tests

```bash
npm test              # Tests unitaires
npm run test:e2e      # Tests E2E avec Playwright
npm run test:coverage # Couverture
```

## 📚 Concepts Avancés

### Redux Toolkit
- Slices modulaires par feature
- RTK Query pour API calls
- Thunks pour logique asynchrone
- Redux DevTools

### Optimisation
- Code splitting par route
- Image lazy loading
- Infinite scroll pour produits
- Caching intelligent avec RTK Query

### Formulaires
- Validation avec Zod schemas
- Error handling
- Formulaires multi-étapes
- Auto-save

### Patterns
- Feature-based architecture
- Container/Presentational components
- Custom hooks pour logique réutilisable
- Error boundaries

## 🎓 Points d'Apprentissage

1. **Redux Toolkit** - State management entreprise
2. **RTK Query** - Data fetching et caching
3. **TypeScript** - Type safety
4. **Stripe Integration** - Paiements sécurisés
5. **Form Validation** - avec Zod
6. **Route Protection** - Authentication guards
7. **Optimistic Updates** - Meilleure UX
8. **Error Handling** - Gestion d'erreurs robuste

## 🔑 Variables d'Environnement

```env
VITE_API_URL=http://localhost:3001
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

## 📸 Captures d'Écran

![Product Catalog](screenshots/catalog.png)
![Cart](screenshots/cart.png)
![Checkout](screenshots/checkout.png)
![Admin Dashboard](screenshots/admin.png)

## 🔗 Documentation

- [Redux Toolkit](https://redux-toolkit.js.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [React Hook Form](https://react-hook-form.com/)
- [Stripe React](https://stripe.com/docs/stripe-js/react)
