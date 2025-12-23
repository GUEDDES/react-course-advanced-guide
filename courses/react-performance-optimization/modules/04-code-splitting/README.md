# Module 4: Code Splitting & Lazy Loading

## 🎯 Objectives

- ✅ Split bundles effectively
- ✅ Lazy load components
- ✅ Route-based splitting
- ✅ Reduce initial load time

---

## 💻 React.lazy

### Basic Lazy Loading

```jsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Route-Based Code Splitting

```jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### Preloading

```jsx
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  // Preload on hover
  const handleMouseEnter = () => {
    import('./HeavyComponent');
  };

  return (
    <button onMouseEnter={handleMouseEnter}>
      Show Heavy Component
    </button>
  );
}
```

---

## 📊 Bundle Analysis

```bash
# Install
npm install --save-dev webpack-bundle-analyzer

# Analyze
npm run build
npx webpack-bundle-analyzer build/stats.json
```

---

## ➡️ Next: [Memoization](../05-memoization/README.md)
